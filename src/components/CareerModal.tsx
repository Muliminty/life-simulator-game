import { Player, Career, CareerLevel } from '../types';
import { CAREER_LEVEL_NAMES } from '../constants';

interface CareerModalProps {
  player: Player;
  availableCareers: Career[];
  isOpen: boolean;
  onSelect: (career: Career) => void;
  onClose: () => void;
}

export default function CareerModal({
  player,
  availableCareers,
  isOpen,
  onSelect,
  onClose,
}: CareerModalProps) {
  if (!isOpen) return null;

  const handleSelect = (career: Career) => {
    onSelect(career);
    onClose();
  };

  const getCategoryName = (category: Career['category']) => {
    const names: Record<Career['category'], string> = {
      blue_collar: '蓝领',
      white_collar: '白领',
      entrepreneur: '创业',
      freelance: '自由职业',
    };
    return names[category] || category;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>选择职业</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {availableCareers.length === 0 ? (
            <p className="empty-message">暂无可用职业</p>
          ) : (
            <div className="careers-list">
              {availableCareers.map((career) => (
                <div key={career.id} className="career-item">
                  <div className="career-header">
                    <h3>{career.name}</h3>
                    <span className="career-category">
                      {getCategoryName(career.category)}
                    </span>
                  </div>
                  <p className="career-description">{career.description}</p>
                  <div className="career-info">
                    <div className="info-row">
                      <span className="info-label">基础薪资:</span>
                      <span className="info-value">
                        {career.baseSalary.toLocaleString()} 元/月
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">最高等级:</span>
                      <span className="info-value">
                        {CAREER_LEVEL_NAMES[Object.values(CareerLevel)[career.maxLevel - 1] as CareerLevel]}
                      </span>
                    </div>
                    {player.career?.id === career.id && (
                      <div className="current-career-badge">当前职业</div>
                    )}
                  </div>
                  <button
                    className="select-button"
                    onClick={() => handleSelect(career)}
                    disabled={player.career?.id === career.id}
                  >
                    {player.career?.id === career.id ? '当前职业' : '选择此职业'}
                  </button>
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
          max-width: 700px;
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

        .careers-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .career-item {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
        }

        .career-item:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .career-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .career-header h3 {
          margin: 0;
          font-size: 1.3em;
          color: #333;
        }

        .career-category {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .career-description {
          margin: 0 0 16px 0;
          color: #666;
          line-height: 1.6;
        }

        .career-info {
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 14px;
        }

        .info-label {
          color: #666;
        }

        .info-value {
          color: #333;
          font-weight: 600;
        }

        .current-career-badge {
          display: inline-block;
          background: #4caf50;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 8px;
        }

        .select-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .select-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .select-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

