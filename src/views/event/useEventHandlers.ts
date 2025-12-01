import { useCallback } from 'react';
import { Player, Event, Choice, LogEntry } from '../../types';
import { eventService } from '../../services/eventService';
import { applyEventEffects } from '../../utils/attributeUtils';
import { checkEventConditions, getAvailableChoices } from '../../utils/eventUtils';

export interface EventHandlerProps {
  player: Player;
  setPlayer: (player: Player | ((prev: Player) => Player)) => void;
  addLog: (type: LogEntry['type'], message: string, data?: unknown) => void;
}

export function useEventHandlers({
  player,
  setPlayer,
  addLog,
}: EventHandlerProps) {
  /**
   * 触发事件
   */
  const handleTriggerEvent = useCallback(async () => {
    try {
      const event = await eventService.generateEvent(player);
      
      // 检查事件条件
      if (!checkEventConditions(event, player)) {
        addLog('system', '当前条件不满足该事件');
        return null;
      }

      addLog('event', `遇到了事件：${event.title}`);
      return event;
    } catch (error) {
      console.error('生成事件失败:', error);
      addLog('system', '生成事件失败，请重试');
      return null;
    }
  }, [player, addLog]);

  /**
   * 处理选择
   */
  const handleChoice = useCallback(
    (event: Event, choice: Choice) => {
      // 应用选择效果
      setPlayer((prevPlayer) => {
        const updatedPlayer = applyEventEffects(prevPlayer, choice.effects);

        // 更新事件历史
        updatedPlayer.eventHistory = [...updatedPlayer.eventHistory, event];
        updatedPlayer.choices = [...updatedPlayer.choices, choice];
        updatedPlayer.currentEvent = null;

        return updatedPlayer;
      });

      addLog('choice', `选择了：${choice.text}`);
    },
    [setPlayer, addLog]
  );

  /**
   * 获取可用选择
   */
  const getAvailableChoicesForEvent = useCallback(
    (event: Event) => {
      return getAvailableChoices(event, player);
    },
    [player]
  );

  return {
    handleTriggerEvent,
    handleChoice,
    getAvailableChoicesForEvent,
  };
}

