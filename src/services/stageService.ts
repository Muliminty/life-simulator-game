import { LifeStage, Player, Event, EventType } from '../types';
import { getCurrentStage, checkStageTransition } from '../utils/stageUtils';
import { aiService } from './aiService';

/**
 * 阶段服务
 */
export class StageService {
  /**
   * 检查并处理阶段转换
   */
  async handleStageTransition(
    player: Player,
    newAge: number
  ): Promise<{ newStage: LifeStage | null; stageEvent: Event | null }> {
    const newStage = checkStageTransition(player, newAge);

    if (!newStage) {
      return { newStage: null, stageEvent: null };
    }

    // 生成阶段转换事件
    const stageEvent = await this.generateStageEvent(newStage, player);

    return { newStage, stageEvent };
  }

  /**
   * 生成阶段事件
   */
  private async generateStageEvent(
    stage: LifeStage,
    player: Player
  ): Promise<Event> {
    try {
      // 使用 AI 生成阶段事件
      return await aiService.generateEvent(player, EventType.STAGE);
    } catch (error) {
      console.error('生成阶段事件失败:', error);
      // 返回默认阶段事件
      return this.getDefaultStageEvent(stage);
    }
  }

  /**
   * 获取默认阶段事件
   */
  private getDefaultStageEvent(stage: LifeStage): Event {
    const stageEvents: Record<LifeStage, Event> = {
      [LifeStage.CHILDHOOD]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入童年期',
        description: '你开始了人生的第一个阶段，童年时光总是充满好奇和探索。',
        choices: [
          {
            id: 'choice-1',
            text: '享受童年',
            effects: [{ type: 'attribute', attribute: 'happiness', value: 10 }],
          },
        ],
        aiGenerated: false,
      },
      [LifeStage.STUDENT]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入学生期',
        description: '你开始上学了，学习将成为你生活的重要组成部分。',
        choices: [
          {
            id: 'choice-1',
            text: '努力学习',
            effects: [{ type: 'attribute', attribute: 'intelligence', value: 5 }],
          },
        ],
        aiGenerated: false,
      },
      [LifeStage.YOUNG_ADULT]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入青年期',
        description: '你成年了，开始面临更多的人生选择，包括职业和感情。',
        choices: [
          {
            id: 'choice-1',
            text: '规划未来',
            effects: [{ type: 'attribute', attribute: 'happiness', value: 5 }],
          },
        ],
        aiGenerated: false,
      },
      [LifeStage.ADULT]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入成年期',
        description: '你进入了人生的黄金时期，事业和家庭都需要你的关注。',
        choices: [
          {
            id: 'choice-1',
            text: '平衡生活',
            effects: [{ type: 'attribute', attribute: 'happiness', value: 5 }],
          },
        ],
        aiGenerated: false,
      },
      [LifeStage.MIDDLE_AGE]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入中年期',
        description: '你进入了中年，经验和智慧都在增长，但也需要关注健康。',
        choices: [
          {
            id: 'choice-1',
            text: '关注健康',
            effects: [{ type: 'attribute', attribute: 'health', value: 5 }],
          },
        ],
        aiGenerated: false,
      },
      [LifeStage.ELDERLY]: {
        id: `stage-event-${Date.now()}`,
        type: EventType.STAGE,
        title: '进入老年期',
        description: '你进入了老年，可以回顾一生，享受天伦之乐。',
        choices: [
          {
            id: 'choice-1',
            text: '享受晚年',
            effects: [{ type: 'attribute', attribute: 'happiness', value: 10 }],
          },
        ],
        aiGenerated: false,
      },
    };

    return stageEvents[stage] || stageEvents[LifeStage.CHILDHOOD];
  }
}

// 导出单例
export const stageService = new StageService();

