import { Player, Achievement } from '../types';

interface AchievementModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({
  player,
  isOpen,
  onClose,
}: AchievementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>成就系统</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="summary-section">
            <div className="summary-item">
              <span className="summary-label">已解锁成就:</span>
              <span className="summary-value">
                {player.achievements.length} 个
              </span>
            </div>
          </div>

          {player.achievements.length === 0 ? (
            <p className="empty-message">暂无成就</p>
          ) : (
            <div className="achievements-list">
              {player.achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h3>{achievement.name}</h3>
                    <p className="achievement-description">
                      {achievement.description}
                    </p>
                    <div className="achievement-meta">
                      <span className="achievement-category">
                        {achievement.category}
                      </span>
                      <span className="achievement-date">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
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

        .summary-section {
          display: flex;
          justify-content: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .summary-label {
          font-size: 14px;
          color: #666;
        }

        .summary-value {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .empty-message {
          text-align: center;
          color: #999;
          padding: 40px 20px;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .achievement-item {
          display: flex;
          gap: 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
        }

        .achievement-item:hover {
          border-color: #ff9800;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.2);
        }

        .achievement-icon {
          font-size: 48px;
          line-height: 1;
        }

        .achievement-content {
          flex: 1;
        }

        .achievement-content h3 {
          margin: 0 0 8px 0;
          font-size: 1.3em;
          color: #333;
        }

        .achievement-description {
          margin: 0 0 12px 0;
          color: #666;
          line-height: 1.6;
        }

        .achievement-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
        }

        .achievement-category {
          background: #ff9800;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: 600;
        }

        .achievement-date {
          color: #999;
        }
      `}</style>
    </div>
  );
}

