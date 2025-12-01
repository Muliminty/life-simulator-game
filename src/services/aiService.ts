import { getAIConfig, validateAIConfig } from '../config/aiConfig';
import { getPromptConfig } from '../config/aiConfigLoader';
import { Player, Event, EventType } from '../types';

/**
 * AI 服务
 * 用于生成人生事件
 * 支持动态切换模型配置
 */
export class AIService {
  /**
   * 获取当前配置（每次调用时重新读取，支持动态切换）
   */
  private getConfig() {
    return getAIConfig();
  }

  /**
   * 生成 AI 事件
   */
  async generateEvent(
    player: Player,
    eventType?: EventType
  ): Promise<Event> {
    if (!validateAIConfig()) {
      throw new Error('AI 配置无效，请检查环境变量');
    }

    const prompt = this.buildEventPrompt(player, eventType);
    const response = await this.callAI(prompt);
    return this.parseAIResponse(response, player, eventType);
  }

  /**
   * 获取当前使用的模型信息
   */
  getCurrentModelInfo() {
    const config = this.getConfig();
    return {
      model: config.model,
      provider: config.provider,
      modelId: config.modelId,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    };
  }

  /**
   * 构建事件提示词
   */
  private buildEventPrompt(player: Player, eventType?: EventType): string {
    const stageNames: Record<string, string> = {
      childhood: '童年期（0-6岁）',
      student: '学生期（7-18岁）',
      young_adult: '青年期（19-25岁）',
      adult: '成年期（26-40岁）',
      middle_age: '中年期（41-60岁）',
      elderly: '老年期（61+岁）',
    };

    return `你是一个人生模拟游戏的AI助手，需要生成一个适合当前玩家状态的人生事件。

玩家信息：
- 姓名: ${player.name}
- 年龄: ${player.age}岁
- 阶段: ${stageNames[player.stage] || player.stage}
- 健康: ${player.attributes.health}/100
- 智力: ${player.attributes.intelligence}/100
- 魅力: ${player.attributes.charm}/100
- 财富: ${player.attributes.wealth}
- 幸福度: ${player.attributes.happiness}/100
- 压力: ${player.attributes.stress}/100
- 教育: ${player.education}
- 职业: ${player.career?.name || '无'}
- 婚姻: ${player.maritalStatus}
${player.partner ? `- 伴侣: ${player.partner.name}` : ''}
${player.children.length > 0 ? `- 子女: ${player.children.length}个` : ''}

事件类型: ${eventType || '随机'}

要求：
1. 事件要符合当前年龄和阶段，真实、有趣、有代入感
2. 提供2-4个选择，每个选择要有明确的影响
3. 事件描述要生动，有故事性
4. 选择的影响要合理，符合逻辑

请返回 JSON 格式（只返回 JSON，不要其他内容）：
{
  "title": "事件标题",
  "description": "详细的事件描述，至少100字",
  "type": "${eventType || 'daily'}",
  "choices": [
    {
      "text": "选择1的文本",
      "effects": {
        "health": 0,
        "intelligence": 0,
        "charm": 0,
        "wealth": 0,
        "happiness": 0,
        "stress": 0
      }
    },
    {
      "text": "选择2的文本",
      "effects": {
        "health": 0,
        "intelligence": 0,
        "charm": 0,
        "wealth": 0,
        "happiness": 0,
        "stress": 0
      }
    }
  ]
}`;
  }

  /**
   * 调用 AI API
   */
  private async callAI(prompt: string): Promise<string> {
    const config = this.getConfig();
    
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: getPromptConfig().systemMessage,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: config.temperature ?? getPromptConfig().temperature,
        max_tokens: config.maxTokens ?? getPromptConfig().maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI API 请求失败: ${response.status} ${error}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * 解析 AI 响应
   */
  private parseAIResponse(
    response: string,
    player: Player,
    eventType?: EventType
  ): Event {
    try {
      // 尝试提取 JSON（AI 可能返回带 markdown 代码块的 JSON）
      let jsonStr = response.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '');
      }

      const parsed = JSON.parse(jsonStr);

      // 转换为 Event 格式
      const event: Event = {
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: (eventType || parsed.type || 'daily') as EventType,
        title: parsed.title || '未知事件',
        description: parsed.description || '',
        choices: (parsed.choices || []).map((choice: any, index: number) => ({
          id: `choice-${index}`,
          text: choice.text || `选择 ${index + 1}`,
          effects: Object.entries(choice.effects || {}).map(([key, value]) => ({
            type: 'attribute' as const,
            attribute: key as keyof typeof player.attributes,
            value: Number(value) || 0,
          })),
        })),
        aiGenerated: true,
      };

      return event;
    } catch (error) {
      console.error('解析 AI 响应失败:', error);
      console.error('原始响应:', response);
      // 返回默认事件
      return this.getFallbackEvent(player, eventType);
    }
  }

  /**
   * 获取降级事件（当 AI 生成失败时）
   */
  private getFallbackEvent(player: Player, eventType?: EventType): Event {
    const fallbackEvents: Record<string, Event> = {
      opportunity: {
        id: `event-fallback-${Date.now()}`,
        type: EventType.OPPORTUNITY,
        title: '意外的机会',
        description: '你遇到了一个不错的机会，虽然不确定结果如何，但值得尝试。',
        choices: [
          {
            id: 'choice-1',
            text: '抓住这个机会',
            effects: [
              { type: 'attribute', attribute: 'happiness', value: 5 },
              { type: 'attribute', attribute: 'stress', value: 3 },
            ],
          },
          {
            id: 'choice-2',
            text: '谨慎考虑',
            effects: [
              { type: 'attribute', attribute: 'stress', value: -2 },
            ],
          },
        ],
        aiGenerated: false,
      },
    };

    return (
      fallbackEvents[eventType || 'opportunity'] ||
      fallbackEvents.opportunity
    );
  }
}

// 导出单例
export const aiService = new AIService();

