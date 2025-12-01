import { Player, Person } from '../types';
import { PersonType } from '../types';

interface RelationshipModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export default function RelationshipModal({
  player,
  isOpen,
  onClose,
}: RelationshipModalProps) {
  if (!isOpen) return null;

  const getPersonTypeName = (type: PersonType) => {
    const names: Record<PersonType, string> = {
      parent: '父母',
      sibling: '兄弟姐妹',
      friend: '朋友',
      partner: '伴侣',
      child: '子女',
      colleague: '同事',
    };
    return names[type] || type;
  };

  const allPeople = [
    ...player.parents.map((p) => ({ ...p, category: '家人' })),
    ...player.friends.map((p) => ({ ...p, category: '朋友' })),
    ...(player.partner ? [{ ...player.partner, category: '伴侣' }] : []),
    ...player.children.map((p) => ({ ...p, category: '子女' })),
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>人际关系</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {allPeople.length === 0 ? (
            <p className="empty-message">暂无人际关系</p>
          ) : (
            <div className="relationships-list">
              {allPeople.map((person) => (
                <div key={person.id} className="person-item">
                  <div className="person-header">
                    <h3>{person.name}</h3>
                    <span className="person-category">{person.category}</span>
                  </div>
                  <div className="person-info">
                    <div className="info-row">
                      <span className="info-label">类型:</span>
                      <span className="info-value">
                        {getPersonTypeName(person.type)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">关系:</span>
                      <span className="info-value">{person.relationship}</span>
                    </div>
                    <div className="attributes-row">
                      <span className="attr-item">
                        智力: {person.attributes.intelligence}
                      </span>
                      <span className="attr-item">
                        魅力: {person.attributes.charm}
                      </span>
                      <span className="attr-item">
                        财富: {person.attributes.wealth.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: #999;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #333;
        }

        .modal-body {
          padding: 20px;
        }

        .empty-message {
          text-align: center;
          color: #999;
          padding: 40px 20px;
        }

        .relationships-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .person-item {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
        }

        .person-item:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .person-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .person-header h3 {
          margin: 0;
          font-size: 1.3em;
          color: #333;
        }

        .person-category {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .person-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .info-label {
          color: #666;
        }

        .info-value {
          color: #333;
          font-weight: 600;
        }

        .attributes-row {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #f0f0f0;
        }

        .attr-item {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </div>
  );
}

