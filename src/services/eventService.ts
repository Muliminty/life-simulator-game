import { Player, Event, EventType } from '../types';
import { aiService } from './aiService';
import { generateId } from '../utils/gameUtils';

/**
 * 事件服务
 */
export class EventService {
  private eventCache = new Map<string, Event>();

  /**
   * 生成事件
   */
  async generateEvent(
    player: Player,
    eventType?: EventType
  ): Promise<Event> {
    // 检查是否有预设事件
    const presetEvent = this.checkPresetEvents(player, eventType);
    if (presetEvent) {
      return presetEvent;
    }

    // 调用 AI 生成事件
    try {
      return await aiService.generateEvent(player, eventType);
    } catch (error) {
      console.error('AI 生成事件失败:', error);
      // 返回降级事件
      return this.getFallbackEvent(player, eventType);
    }
  }

  /**
   * 检查预设事件
   */
  private checkPresetEvents(
    player: Player,
    eventType?: EventType
  ): Event | null {
    // 这里可以添加预设事件的逻辑
    // 例如：特定年龄、特定阶段的关键事件
    return null;
  }

  /**
   * 获取降级事件
   */
  private getFallbackEvent(
    player: Player,
    eventType?: EventType
  ): Event {
    const fallbackEvents: Record<string, Event> = {
      [EventType.OPPORTUNITY]: {
        id: generateId('event'),
        type: EventType.OPPORTUNITY,
        title: '意外的机会',
        description: '你遇到了一个不错的机会，虽然不确定结果如何，但值得尝试。',
        choices: [
          {
            id: generateId('choice'),
            text: '抓住这个机会',
            effects: [
              { type: 'attribute', attribute: 'happiness', value: 5 },
              { type: 'attribute', attribute: 'stress', value: 3 },
            ],
          },
          {
            id: generateId('choice'),
            text: '谨慎考虑',
            effects: [
              { type: 'attribute', attribute: 'stress', value: -2 },
            ],
          },
        ],
        aiGenerated: false,
      },
      [EventType.CHALLENGE]: {
        id: generateId('event'),
        type: EventType.CHALLENGE,
        title: '面临的挑战',
        description: '你遇到了一个挑战，需要做出选择来应对。',
        choices: [
          {
            id: generateId('choice'),
            text: '勇敢面对',
            effects: [
              { type: 'attribute', attribute: 'happiness', value: 3 },
              { type: 'attribute', attribute: 'stress', value: 5 },
            ],
          },
          {
            id: generateId('choice'),
            text: '寻求帮助',
            effects: [
              { type: 'attribute', attribute: 'stress', value: -3 },
            ],
          },
        ],
        aiGenerated: false,
      },
      [EventType.DAILY]: {
        id: generateId('event'),
        type: EventType.DAILY,
        title: '日常生活',
        description: '这是普通的一天，你过着平静的生活。',
        choices: [
          {
            id: generateId('choice'),
            text: '享受当下',
            effects: [
              { type: 'attribute', attribute: 'happiness', value: 2 },
            ],
          },
        ],
        aiGenerated: false,
      },
    };

    return (
      fallbackEvents[eventType || EventType.DAILY] ||
      fallbackEvents[EventType.DAILY]
    );
  }
}

// 导出单例
export const eventService = new EventService();

