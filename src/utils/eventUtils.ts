import { Event, EventType, Player, Choice } from '../types';
import { generateId } from './gameUtils';

/**
 * 检查事件条件是否满足
 */
export function checkEventConditions(
  event: Event,
  player: Player
): boolean {
  if (!event.conditions || event.conditions.length === 0) {
    return true;
  }

  return event.conditions.every((condition) => {
    // 检查年龄
    if (condition.age) {
      if (condition.age.min !== undefined && player.age < condition.age.min) {
        return false;
      }
      if (condition.age.max !== undefined && player.age > condition.age.max) {
        return false;
      }
    }

    // 检查阶段
    if (condition.stage && !condition.stage.includes(player.stage)) {
      return false;
    }

    // 检查属性
    if (condition.attribute) {
      const value = player.attributes[condition.attribute.key];
      if (
        condition.attribute.min !== undefined &&
        value < condition.attribute.min
      ) {
        return false;
      }
      if (
        condition.attribute.max !== undefined &&
        value > condition.attribute.max
      ) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 检查选择要求是否满足
 */
export function checkChoiceRequirements(
  choice: Choice,
  player: Player
): boolean {
  if (!choice.requirements || choice.requirements.length === 0) {
    return true;
  }

  return choice.requirements.every((req) => {
    if (req.attribute) {
      const value = player.attributes[req.attribute];
      if (req.minValue !== undefined && value < req.minValue) {
        return false;
      }
      if (req.maxValue !== undefined && value > req.maxValue) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 过滤可用选择
 */
export function getAvailableChoices(
  event: Event,
  player: Player
): Choice[] {
  return event.choices.filter((choice) =>
    checkChoiceRequirements(choice, player)
  );
}

/**
 * 创建事件
 */
export function createEvent(
  title: string,
  description: string,
  type: EventType,
  choices: Omit<Choice, 'id'>[]
): Event {
  return {
    id: generateId(),
    title,
    description,
    type,
    choices: choices.map((choice) => ({
      ...choice,
      id: generateId(),
    })),
    aiGenerated: false,
  };
}

/**
 * 创建选择
 */
export function createChoice(
  text: string,
  effects: Event['choices'][0]['effects']
): Choice {
  return {
    id: generateId(),
    text,
    effects,
  };
}

/**
 * 验证事件数据
 */
export function validateEvent(event: Event): boolean {
  if (!event.title || !event.description) {
    return false;
  }

  if (!event.choices || event.choices.length < 2) {
    return false;
  }

  return true;
}

