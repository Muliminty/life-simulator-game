import { LifeStage, Player } from '../types';
import { STAGE_AGE_RANGES } from '../constants';

/**
 * 根据年龄获取当前阶段
 */
export function getCurrentStage(age: number): LifeStage {
  if (age <= STAGE_AGE_RANGES[LifeStage.CHILDHOOD].max) {
    return LifeStage.CHILDHOOD;
  }
  if (age <= STAGE_AGE_RANGES[LifeStage.STUDENT].max) {
    return LifeStage.STUDENT;
  }
  if (age <= STAGE_AGE_RANGES[LifeStage.YOUNG_ADULT].max) {
    return LifeStage.YOUNG_ADULT;
  }
  if (age <= STAGE_AGE_RANGES[LifeStage.ADULT].max) {
    return LifeStage.ADULT;
  }
  if (age <= STAGE_AGE_RANGES[LifeStage.MIDDLE_AGE].max) {
    return LifeStage.MIDDLE_AGE;
  }
  return LifeStage.ELDERLY;
}

/**
 * 检查阶段转换
 */
export function checkStageTransition(
  player: Player,
  newAge: number
): LifeStage | null {
  const currentStage = getCurrentStage(player.age);
  const newStage = getCurrentStage(newAge);

  if (currentStage !== newStage) {
    return newStage;
  }
  return null;
}

