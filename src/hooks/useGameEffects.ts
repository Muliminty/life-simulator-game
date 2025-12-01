import { useEffect } from 'react';
import { Player } from '../types';
import { applyAgeEffects } from '../utils/attributeUtils';

/**
 * 游戏副作用处理 Hook
 */
export function useGameEffects(
  player: Player | null,
  onPlayerUpdate: (updates: Partial<Player>) => void
) {
  // 处理年龄相关的自然变化
  useEffect(() => {
    if (!player) return;

    // 每年自动应用年龄效果
    const updatedAttributes = applyAgeEffects(player.attributes, player.age);
    
    if (JSON.stringify(updatedAttributes) !== JSON.stringify(player.attributes)) {
      onPlayerUpdate({ attributes: updatedAttributes });
    }
  }, [player?.age, player, onPlayerUpdate]);
}

