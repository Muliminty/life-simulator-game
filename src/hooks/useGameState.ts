import { useState, useEffect, useCallback } from 'react';
import { Player, LogEntry } from '../types';
import { LifeStage, MaritalStatus, EducationLevel, CareerLevel } from '../types';
import { loadGame, saveGame, generateId } from '../utils/gameUtils';
import { generateRandomAttributes } from '../utils/attributeUtils';
import { getCurrentStage } from '../utils/stageUtils';
import { DEFAULT_SETTINGS } from '../constants';

/**
 * 游戏状态管理 Hook
 */
export function useGameState() {
  const [player, setPlayer] = useState<Player | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // 加载存档
  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      setPlayer(saved.player);
      setLogs(saved.logs || []);
      setGameStarted(true);
    }
  }, []);

  // 自动保存
  useEffect(() => {
    if (player && gameStarted && settings.autoSave) {
      saveGame(player, logs);
    }
  }, [player, logs, gameStarted, settings.autoSave]);

  /**
   * 创建新游戏
   */
  const createNewGame = useCallback(
    (name: string, attributes?: Player['attributes']) => {
      const newPlayer: Player = {
        name,
        age: 0,
        stage: LifeStage.CHILDHOOD,
        attributes: attributes || generateRandomAttributes(),
        education: EducationLevel.PRIMARY,
        career: null,
        careerLevel: CareerLevel.ENTRY,
        maritalStatus: MaritalStatus.SINGLE,
        partner: null,
        children: [],
        parents: [],
        friends: [],
        properties: [],
        vehicles: [],
        investments: [],
        achievements: [],
        currentEvent: null,
        eventHistory: [],
        choices: [],
        startDate: Date.now(),
        lastSaveDate: Date.now(),
      };

      setPlayer(newPlayer);
      setGameStarted(true);
      setLogs([]);
      addLog('system', `欢迎来到人生模拟器，${name}！`);
    },
    []
  );

  /**
   * 添加日志
   */
  const addLog = useCallback(
    (type: LogEntry['type'], message: string, data?: unknown) => {
      const log: LogEntry = {
        id: generateId('log'),
        timestamp: Date.now(),
        type,
        message,
        data,
      };
      setLogs((prev) => [...prev, log]);
    },
    []
  );

  /**
   * 更新玩家
   */
  const updatePlayer = useCallback((updates: Partial<Player>) => {
    setPlayer((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      updated.lastSaveDate = Date.now();
      return updated;
    });
  }, []);

  /**
   * 年龄增长
   */
  const ageUp = useCallback(() => {
    if (!player) return;

    const newAge = player.age + 1;
    const newStage = getCurrentStage(newAge);

    updatePlayer({
      age: newAge,
      stage: newStage,
    });

    addLog('system', `你迎来了 ${newAge} 岁生日！`);
  }, [player, updatePlayer, addLog]);

  /**
   * 重置游戏
   */
  const resetGame = useCallback(() => {
    setPlayer(null);
    setGameStarted(false);
    setLogs([]);
  }, []);

  return {
    player,
    setPlayer: updatePlayer,
    gameStarted,
    setGameStarted,
    logs,
    addLog,
    settings,
    setSettings,
    createNewGame,
    ageUp,
    resetGame,
  };
}

