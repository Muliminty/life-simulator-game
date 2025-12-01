import { Player, PlayerAttributes, EventEffect } from '../types';
import { EducationLevel, CareerLevel } from '../types';
import { CAREER_LEVEL_MULTIPLIERS } from '../constants';

/**
 * 计算教育加成
 */
function getEducationBonus(education: EducationLevel): Partial<PlayerAttributes> {
  const bonuses: Record<EducationLevel, Partial<PlayerAttributes>> = {
    [EducationLevel.PRIMARY]: { intelligence: 0 },
    [EducationLevel.MIDDLE]: { intelligence: 5 },
    [EducationLevel.HIGH]: { intelligence: 10 },
    [EducationLevel.BACHELOR]: { intelligence: 20 },
    [EducationLevel.MASTER]: { intelligence: 30 },
    [EducationLevel.DOCTOR]: { intelligence: 40 },
  };

  return bonuses[education] || {};
}

/**
 * 计算职业加成
 */
function getCareerBonus(
  career: { baseSalary: number } | null,
  level: CareerLevel
): Partial<PlayerAttributes> {
  if (!career) return {};

  const multiplier = CAREER_LEVEL_MULTIPLIERS[level] || 1;
  const incomeBonus = career.baseSalary * multiplier * 0.1; // 收入对幸福度的轻微影响

  return {
    happiness: Math.min(10, incomeBonus / 1000),
  };
}

/**
 * 计算属性（包含所有加成）
 */
export function calculateAttributes(player: Player): PlayerAttributes {
  const base = { ...player.attributes };

  // 教育加成
  const educationBonus = getEducationBonus(player.education);
  base.intelligence = Math.min(100, base.intelligence + (educationBonus.intelligence || 0));

  // 职业加成
  const careerBonus = getCareerBonus(player.career, player.careerLevel);
  base.happiness = Math.min(100, base.happiness + (careerBonus.happiness || 0));

  // 关系加成（伴侣和子女增加幸福度）
  if (player.partner) {
    base.happiness = Math.min(100, base.happiness + 5);
  }
  if (player.children.length > 0) {
    base.happiness = Math.min(100, base.happiness + player.children.length * 3);
  }

  return base;
}

/**
 * 应用事件效果
 */
export function applyEventEffects(
  player: Player,
  effects: EventEffect[]
): Player {
  const updated = { ...player };
  updated.attributes = { ...updated.attributes };

  effects.forEach((effect) => {
    if (effect.type === 'attribute' && effect.attribute) {
      const currentValue = updated.attributes[effect.attribute];
      updated.attributes[effect.attribute] = currentValue + effect.value;
    } else if (effect.type === 'wealth') {
      updated.attributes.wealth += effect.value;
    }
  });

  // 限制属性范围
  updated.attributes.health = Math.max(0, Math.min(100, updated.attributes.health));
  updated.attributes.intelligence = Math.max(0, Math.min(100, updated.attributes.intelligence));
  updated.attributes.charm = Math.max(0, Math.min(100, updated.attributes.charm));
  updated.attributes.happiness = Math.max(0, Math.min(100, updated.attributes.happiness));
  updated.attributes.stress = Math.max(0, Math.min(100, updated.attributes.stress));
  // 财富没有上限

  return updated;
}

/**
 * 应用年龄效果（自然变化）
 */
export function applyAgeEffects(attributes: PlayerAttributes, age: number): PlayerAttributes {
  const updated = { ...attributes };

  // 随着年龄增长，健康可能下降
  if (age > 40) {
    updated.health = Math.max(0, updated.health - 0.5);
  }
  if (age > 60) {
    updated.health = Math.max(0, updated.health - 1);
  }

  // 压力自然增加（工作压力）
  if (age > 18 && age < 60) {
    updated.stress = Math.min(100, updated.stress + 0.5);
  }

  return updated;
}

import { INITIAL_ATTRIBUTE_RANGE } from '../constants';

/**
 * 随机生成初始属性
 */
export function generateRandomAttributes(): PlayerAttributes {
  const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    health: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.health.min,
      INITIAL_ATTRIBUTE_RANGE.health.max
    ),
    intelligence: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.intelligence.min,
      INITIAL_ATTRIBUTE_RANGE.intelligence.max
    ),
    charm: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.charm.min,
      INITIAL_ATTRIBUTE_RANGE.charm.max
    ),
    wealth: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.wealth.min,
      INITIAL_ATTRIBUTE_RANGE.wealth.max
    ),
    happiness: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.happiness.min,
      INITIAL_ATTRIBUTE_RANGE.happiness.max
    ),
    stress: randomInRange(
      INITIAL_ATTRIBUTE_RANGE.stress.min,
      INITIAL_ATTRIBUTE_RANGE.stress.max
    ),
  };
}

