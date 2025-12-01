import { Player, Career, CareerLevel, EducationLevel } from '../types';
import { CAREERS, CAREER_LEVEL_MULTIPLIERS } from '../constants';

class CareerService {
  /**
   * 获取可用职业列表
   */
  getAvailableCareers(player: Player): Career[] {
    return CAREERS.filter((career) => {
      // 检查教育要求
      if (!this.meetsEducationRequirement(player, career)) {
        return false;
      }

      // 检查其他要求（如果有）
      if (career.requirements) {
        return this.checkRequirements(player, career.requirements);
      }

      return true;
    });
  }

  /**
   * 检查是否满足教育要求
   */
  private meetsEducationRequirement(
    player: Player,
    career: Career
  ): boolean {
    const educationOrder = [
      EducationLevel.PRIMARY,
      EducationLevel.MIDDLE,
      EducationLevel.HIGH,
      EducationLevel.BACHELOR,
      EducationLevel.MASTER,
      EducationLevel.DOCTOR,
    ];

    const playerLevel = educationOrder.indexOf(player.education);
    const requiredLevel = educationOrder.indexOf(career.educationRequired);

    return playerLevel >= requiredLevel;
  }

  /**
   * 检查其他要求
   */
  private checkRequirements(
    player: Player,
    requirements: unknown
  ): boolean {
    // 这里可以添加更多要求检查逻辑
    return true;
  }

  /**
   * 职业发展（升级）
   */
  advanceCareer(player: Player): Player {
    if (!player.career) return player;

    const updated = { ...player };
    const career = player.career;
    const currentLevel = player.careerLevel;

    // 检查是否可以升级
    if (this.canAdvance(player, career, currentLevel)) {
      const nextLevel = this.getNextLevel(currentLevel);
      if (nextLevel) {
        updated.careerLevel = nextLevel;
      }
    }

    return updated;
  }

  /**
   * 检查是否可以升级
   */
  canAdvance(
    player: Player,
    career: Career,
    currentLevel: CareerLevel
  ): boolean {
    const levelOrder = [
      CareerLevel.ENTRY,
      CareerLevel.JUNIOR,
      CareerLevel.MIDDLE,
      CareerLevel.SENIOR,
      CareerLevel.EXPERT,
      CareerLevel.MASTER,
    ];

    const currentIndex = levelOrder.indexOf(currentLevel);
    const maxIndex = career.maxLevel - 1;

    return currentIndex < maxIndex;
  }

  /**
   * 获取下一等级
   */
  getNextLevel(currentLevel: CareerLevel): CareerLevel | null {
    const levelOrder = [
      CareerLevel.ENTRY,
      CareerLevel.JUNIOR,
      CareerLevel.MIDDLE,
      CareerLevel.SENIOR,
      CareerLevel.EXPERT,
      CareerLevel.MASTER,
    ];

    const currentIndex = levelOrder.indexOf(currentLevel);
    if (currentIndex < levelOrder.length - 1) {
      return levelOrder[currentIndex + 1];
    }

    return null;
  }

  /**
   * 计算收入
   */
  calculateIncome(player: Player): number {
    if (!player.career) return 0;

    const baseSalary = player.career.baseSalary;
    const levelMultiplier =
      CAREER_LEVEL_MULTIPLIERS[player.careerLevel] || 1.0;
    const experienceBonus = this.getExperienceBonus(player);

    return baseSalary * levelMultiplier + experienceBonus;
  }

  /**
   * 获取经验加成
   */
  private getExperienceBonus(player: Player): number {
    // 根据年龄和职业年限计算经验加成
    const careerYears = player.age - 18; // 假设18岁开始工作
    if (careerYears <= 0) return 0;

    // 每年增加基础薪资的2%
    return player.career?.baseSalary * 0.02 * Math.min(careerYears, 20) || 0;
  }

  /**
   * 获取等级倍数
   */
  getLevelMultiplier(level: CareerLevel): number {
    return CAREER_LEVEL_MULTIPLIERS[level] || 1.0;
  }
}

export const careerService = new CareerService();

