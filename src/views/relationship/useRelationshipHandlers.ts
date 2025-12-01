import { useCallback } from 'react';
import { Player, Person, PersonType, LogEntry } from '../../types';
import { relationshipService } from '../../services/relationshipService';

export interface RelationshipHandlerProps {
  player: Player;
  setPlayer: (player: Player | ((prev: Player) => Player)) => void;
  addLog: (type: LogEntry['type'], message: string, data?: unknown) => void;
}

export function useRelationshipHandlers({
  player,
  setPlayer,
  addLog,
}: RelationshipHandlerProps) {
  /**
   * 添加朋友
   */
  const handleAddFriend = useCallback(
    (friend: Omit<Person, 'id'>) => {
      const updated = relationshipService.addFriend(player, friend);
      setPlayer(updated);
      addLog('system', `添加了朋友：${friend.name}`);
    },
    [player, setPlayer, addLog]
  );

  /**
   * 移除朋友
   */
  const handleRemoveFriend = useCallback(
    (friendId: string) => {
      const friend = player.friends.find((f) => f.id === friendId);
      const updated = relationshipService.removeFriend(player, friendId);
      setPlayer(updated);
      if (friend) {
        addLog('system', `移除了朋友：${friend.name}`);
      }
    },
    [player, setPlayer, addLog]
  );

  /**
   * 添加伴侣
   */
  const handleAddPartner = useCallback(
    (partner: Omit<Person, 'id' | 'type'>) => {
      const updated = relationshipService.addPartner(player, partner);
      setPlayer(updated);
      addLog('system', `遇到了伴侣：${partner.name}`);
    },
    [player, setPlayer, addLog]
  );

  /**
   * 结婚
   */
  const handleMarry = useCallback(() => {
    if (!player.partner) {
      addLog('system', '没有伴侣，无法结婚');
      return;
    }

    const updated = relationshipService.marry(player);
    setPlayer(updated);
    addLog('system', `与 ${player.partner.name} 结婚了！`);
  }, [player, setPlayer, addLog]);

  /**
   * 离婚
   */
  const handleDivorce = useCallback(() => {
    if (!player.partner) {
      addLog('system', '没有伴侣，无法离婚');
      return;
    }

    const partnerName = player.partner.name;
    const updated = relationshipService.divorce(player);
    setPlayer(updated);
    addLog('system', `与 ${partnerName} 离婚了`);
  }, [player, setPlayer, addLog]);

  /**
   * 添加子女
   */
  const handleAddChild = useCallback(
    (child: Omit<Person, 'id' | 'type'>) => {
      const updated = relationshipService.addChild(player, child);
      setPlayer(updated);
      addLog('system', `有了孩子：${child.name}`);
    },
    [player, setPlayer, addLog]
  );

  /**
   * 生成随机人物
   */
  const generateRandomPerson = useCallback(
    (type: PersonType) => {
      return relationshipService.generateRandomPerson(type);
    },
    []
  );

  return {
    handleAddFriend,
    handleRemoveFriend,
    handleAddPartner,
    handleMarry,
    handleDivorce,
    handleAddChild,
    generateRandomPerson,
  };
}

