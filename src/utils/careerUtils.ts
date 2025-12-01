import { Player, Career, CareerLevel } from '../types';
import { CAREER_LEVEL_NAMES } from '../constants';

/**
 * 获取职业等级名称
 */
export function getCareerLevelName(level: CareerLevel): string {
  return CAREER_LEVEL_NAMES[level] || level;
}

/**
 * 检查是否可以更换职业
 */
export function canChangeCareer(player: Player, newCareer: Career): boolean {
  // 检查教育要求
  const educationOrder = [
    'primary',
    'middle',
    'high',
    'bachelor',
    'master',
    'doctor',
  ];

  const playerLevel = educationOrder.indexOf(player.education);
  const requiredLevel = educationOrder.indexOf(newCareer.educationRequired);

  return playerLevel >= requiredLevel;
}

/**
 * 计算职业经验
 */
export function calculateCareerExperience(player: Player): number {
  if (!player.career) return 0;

  // 假设18岁开始工作
  const careerYears = Math.max(0, player.age - 18);
  return careerYears;
}

/**
 * 检查是否可以升级职业
 */
export function canAdvanceCareer(player: Player): boolean {
  if (!player.career) return false;

  const levelOrder = [
    CareerLevel.ENTRY,
    CareerLevel.JUNIOR,
    CareerLevel.MIDDLE,
    CareerLevel.SENIOR,
    CareerLevel.EXPERT,
    CareerLevel.MASTER,
  ];

  const currentIndex = levelOrder.indexOf(player.careerLevel);
  const maxIndex = player.career.maxLevel - 1;

  return currentIndex < maxIndex;
}

/**
 * 获取职业收入范围
 */
export function getCareerIncomeRange(
  career: Career,
  level: CareerLevel
): { min: number; max: number } {
  const multipliers: Record<CareerLevel, number> = {
    [CareerLevel.ENTRY]: 1.0,
    [CareerLevel.JUNIOR]: 1.5,
    [CareerLevel.MIDDLE]: 2.0,
    [CareerLevel.SENIOR]: 3.0,
    [CareerLevel.EXPERT]: 4.5,
    [CareerLevel.MASTER]: 6.0,
  };

  const multiplier = multipliers[level] || 1.0;
  const base = career.baseSalary * multiplier;

  return {
    min: base * 0.9,
    max: base * 1.1,
  };
}

