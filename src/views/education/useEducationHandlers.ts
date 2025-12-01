import { useCallback } from 'react';
import { Player, EducationLevel, LogEntry } from '../../types';

export interface EducationHandlerProps {
  player: Player;
  setPlayer: (player: Player | ((prev: Player) => Player)) => void;
  addLog: (type: LogEntry['type'], message: string, data?: unknown) => void;
}

export function useEducationHandlers({
  player,
  setPlayer,
  addLog,
}: EducationHandlerProps) {
  /**
   * 获取可用教育水平
   */
  const getAvailableEducationLevels = useCallback((): EducationLevel[] => {
    const educationOrder = [
      EducationLevel.PRIMARY,
      EducationLevel.MIDDLE,
      EducationLevel.HIGH,
      EducationLevel.BACHELOR,
      EducationLevel.MASTER,
      EducationLevel.DOCTOR,
    ];

    const currentIndex = educationOrder.indexOf(player.education);
    
    // 返回当前及更高等级
    return educationOrder.slice(currentIndex + 1);
  }, [player]);

  /**
   * 选择教育水平
   */
  const handleSelectEducation = useCallback(
    (level: EducationLevel) => {
      const educationOrder = [
        EducationLevel.PRIMARY,
        EducationLevel.MIDDLE,
        EducationLevel.HIGH,
        EducationLevel.BACHELOR,
        EducationLevel.MASTER,
        EducationLevel.DOCTOR,
      ];

      const currentIndex = educationOrder.indexOf(player.education);
      const newIndex = educationOrder.indexOf(level);

      if (newIndex <= currentIndex) {
        addLog('system', '不能选择更低的教育水平');
        return;
      }

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        education: level,
      }));

      addLog('system', `教育水平提升：${level}`);
    },
    [player, setPlayer, addLog]
  );

  return {
    getAvailableEducationLevels,
    handleSelectEducation,
  };
}

