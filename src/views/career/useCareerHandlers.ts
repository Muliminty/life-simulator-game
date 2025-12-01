import { useCallback } from 'react';
import { Player, Career, LogEntry } from '../../types';
import { careerService } from '../../services/careerService';
import { canChangeCareer } from '../../utils/careerUtils';

export interface CareerHandlerProps {
  player: Player;
  setPlayer: (player: Player | ((prev: Player) => Player)) => void;
  addLog: (type: LogEntry['type'], message: string, data?: unknown) => void;
}

export function useCareerHandlers({
  player,
  setPlayer,
  addLog,
}: CareerHandlerProps) {
  /**
   * 获取可用职业
   */
  const getAvailableCareers = useCallback(() => {
    return careerService.getAvailableCareers(player);
  }, [player]);

  /**
   * 选择职业
   */
  const handleSelectCareer = useCallback(
    (career: Career) => {
      if (!canChangeCareer(player, career)) {
        addLog('system', '不满足该职业的教育要求');
        return;
      }

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        career,
        careerLevel: 'entry' as const,
      }));

      addLog('system', `选择了职业：${career.name}`);
    },
    [player, setPlayer, addLog]
  );

  /**
   * 职业升级
   */
  const handleAdvanceCareer = useCallback(() => {
    const updated = careerService.advanceCareer(player);
    
    if (updated.careerLevel !== player.careerLevel) {
      setPlayer(updated);
      addLog('system', `职业等级提升：${updated.careerLevel}`);
    } else {
      addLog('system', '当前无法升级职业');
    }
  }, [player, setPlayer, addLog]);

  /**
   * 计算收入
   */
  const calculateIncome = useCallback(() => {
    return careerService.calculateIncome(player);
  }, [player]);

  return {
    getAvailableCareers,
    handleSelectCareer,
    handleAdvanceCareer,
    calculateIncome,
  };
}

