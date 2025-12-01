import { Player, Person, PersonType, MaritalStatus } from '../types';
import { generateId } from '../utils/gameUtils';

class RelationshipService {
  /**
   * 添加朋友
   */
  addFriend(player: Player, friend: Omit<Person, 'id'>): Player {
    const newFriend: Person = {
      ...friend,
      id: generateId(),
      type: PersonType.FRIEND,
    };

    return {
      ...player,
      friends: [...player.friends, newFriend],
    };
  }

  /**
   * 移除朋友
   */
  removeFriend(player: Player, friendId: string): Player {
    return {
      ...player,
      friends: player.friends.filter((f) => f.id !== friendId),
    };
  }

  /**
   * 添加伴侣
   */
  addPartner(player: Player, partner: Omit<Person, 'id' | 'type'>): Player {
    const newPartner: Person = {
      ...partner,
      id: generateId(),
      type: PersonType.PARTNER,
    };

    return {
      ...player,
      partner: newPartner,
      maritalStatus: MaritalStatus.DATING,
    };
  }

  /**
   * 结婚
   */
  marry(player: Player): Player {
    if (!player.partner) return player;

    return {
      ...player,
      maritalStatus: MaritalStatus.MARRIED,
    };
  }

  /**
   * 离婚
   */
  divorce(player: Player): Player {
    return {
      ...player,
      partner: null,
      maritalStatus: MaritalStatus.DIVORCED,
    };
  }

  /**
   * 添加子女
   */
  addChild(player: Player, child: Omit<Person, 'id' | 'type'>): Player {
    const newChild: Person = {
      ...child,
      id: generateId(),
      type: PersonType.CHILD,
    };

    return {
      ...player,
      children: [...player.children, newChild],
    };
  }

  /**
   * 添加父母
   */
  addParent(player: Player, parent: Omit<Person, 'id' | 'type'>): Player {
    const newParent: Person = {
      ...parent,
      id: generateId(),
      type: PersonType.PARENT,
    };

    return {
      ...player,
      parents: [...player.parents, newParent],
    };
  }

  /**
   * 生成随机人物
   */
  generateRandomPerson(
    type: PersonType,
    baseAttributes?: Partial<Person['attributes']>
  ): Omit<Person, 'id'> {
    const base = {
      intelligence: Math.floor(Math.random() * 50) + 50,
      charm: Math.floor(Math.random() * 50) + 50,
      wealth: Math.floor(Math.random() * 100000) + 50000,
      ...baseAttributes,
    };

    const names = this.getRandomNames(type);

    return {
      name: names[Math.floor(Math.random() * names.length)],
      type,
      relationship: this.getDefaultRelationship(type),
      attributes: base,
    };
  }

  /**
   * 获取随机名字
   */
  private getRandomNames(type: PersonType): string[] {
    const allNames = [
      '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
      '郑一', '王二', '冯三', '陈四', '褚五', '卫六', '蒋七', '沈八',
      '韩九', '杨十', '朱一', '秦二', '尤三', '许四', '何五', '吕六',
      '施七', '张八', '孔九', '曹十', '严一', '华二', '金三', '魏四',
    ];

    return allNames;
  }

  /**
   * 获取默认关系
   */
  private getDefaultRelationship(type: PersonType): string {
    const relationships: Record<PersonType, string> = {
      [PersonType.PARENT]: '父母',
      [PersonType.SIBLING]: '兄弟姐妹',
      [PersonType.FRIEND]: '朋友',
      [PersonType.PARTNER]: '伴侣',
      [PersonType.CHILD]: '子女',
      [PersonType.COLLEAGUE]: '同事',
    };

    return relationships[type] || '未知';
  }
}

export const relationshipService = new RelationshipService();

