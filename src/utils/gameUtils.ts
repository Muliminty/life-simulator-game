import { Player, GameSave, LogEntry } from '../types';
import { STORAGE_KEYS, GAME_VERSION } from '../constants';

/**
 * 保存游戏
 */
export function saveGame(player: Player, logs: LogEntry[] = []): void {
  const save: GameSave = {
    player,
    logs,
    timestamp: Date.now(),
    version: GAME_VERSION,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.SAVE, JSON.stringify(save));
  } catch (error) {
    console.error('保存游戏失败:', error);
  }
}

/**
 * 加载游戏
 */
export function loadGame(): GameSave | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVE);
    if (!data) return null;

    const parsed = JSON.parse(data) as GameSave;
    return parsed;
  } catch (error) {
    console.error('加载游戏失败:', error);
    return null;
  }
}

/**
 * 清除存档
 */
export function clearSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVE);
  } catch (error) {
    console.error('清除存档失败:', error);
  }
}

/**
 * 生成唯一 ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化数字
 */
export function formatNumber(num: number): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(2)}亿`;
  }
  if (num >= 10000) {
    return `${(num / 10000).toFixed(2)}万`;
  }
  return num.toLocaleString('zh-CN');
}

/**
 * 格式化日期
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

