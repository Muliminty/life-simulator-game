import { Player } from '../types';
import { STAGE_NAMES, EDUCATION_NAMES } from '../constants';
import { formatNumber } from '../utils/gameUtils';

interface CharacterModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export default function CharacterModal({
  player,
  isOpen,
  onClose,
}: CharacterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>角色信息</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="character-section">
            <h3>基本信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">姓名:</span>
                <span className="info-value">{player.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">年龄:</span>
                <span className="info-value">{player.age} 岁</span>
              </div>
              <div className="info-item">
                <span className="info-label">阶段:</span>
                <span className="info-value">{STAGE_NAMES[player.stage]}</span>
              </div>
              <div className="info-item">
                <span className="info-label">教育:</span>
                <span className="info-value">
                  {EDUCATION_NAMES[player.education] || '无'}
                </span>
              </div>
            </div>
          </div>

          <div className="character-section">
            <h3>属性</h3>
            <div className="attributes-list">
              <div className="attribute-item">
                <span className="attr-label">健康:</span>
                <div className="attr-bar">
                  <div
                    className="attr-fill health"
                    style={{ width: `${player.attributes.health}%` }}
                  />
                </div>
                <span className="attr-value">{player.attributes.health}/100</span>
              </div>
              <div className="attribute-item">
                <span className="attr-label">智力:</span>
                <div className="attr-bar">
                  <div
                    className="attr-fill intelligence"
                    style={{ width: `${player.attributes.intelligence}%` }}
                  />
                </div>
                <span className="attr-value">{player.attributes.intelligence}/100</span>
              </div>
              <div className="attribute-item">
                <span className="attr-label">魅力:</span>
                <div className="attr-bar">
                  <div
                    className="attr-fill charm"
                    style={{ width: `${player.attributes.charm}%` }}
                  />
                </div>
                <span className="attr-value">{player.attributes.charm}/100</span>
              </div>
              <div className="attribute-item">
                <span className="attr-label">财富:</span>
                <span className="attr-value wealth">
                  {formatNumber(player.attributes.wealth)}
                </span>
              </div>
              <div className="attribute-item">
                <span className="attr-label">幸福度:</span>
                <div className="attr-bar">
                  <div
                    className="attr-fill happiness"
                    style={{ width: `${player.attributes.happiness}%` }}
                  />
                </div>
                <span className="attr-value">{player.attributes.happiness}/100</span>
              </div>
              <div className="attribute-item">
                <span className="attr-label">压力:</span>
                <div className="attr-bar">
                  <div
                    className="attr-fill stress"
                    style={{ width: `${player.attributes.stress}%` }}
                  />
                </div>
                <span className="attr-value">{player.attributes.stress}/100</span>
              </div>
            </div>
          </div>

          <div className="character-section">
            <h3>状态信息</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">职业:</span>
                <span className="info-value">{player.career?.name || '无'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">婚姻:</span>
                <span className="info-value">{player.maritalStatus || '单身'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">伴侣:</span>
                <span className="info-value">
                  {player.partner?.name || '无'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">子女:</span>
                <span className="info-value">{player.children.length} 个</span>
              </div>
            </div>
          </div>
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

        .character-section {
          margin-bottom: 24px;
        }

        .character-section:last-child {
          margin-bottom: 0;
        }

        .character-section h3 {
          margin: 0 0 16px 0;
          font-size: 1.2em;
          color: #333;
          padding-bottom: 8px;
          border-bottom: 2px solid #f0f0f0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
        }

        .info-label {
          color: #666;
          font-weight: 500;
        }

        .info-value {
          color: #333;
          font-weight: 600;
        }

        .attributes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .attribute-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .attr-label {
          min-width: 60px;
          font-weight: 600;
          color: #555;
          font-size: 14px;
        }

        .attr-bar {
          flex: 1;
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
        }

        .attr-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s;
        }

        .attr-fill.health {
          background: #4caf50;
        }

        .attr-fill.intelligence {
          background: #2196f3;
        }

        .attr-fill.charm {
          background: #e91e63;
        }

        .attr-fill.happiness {
          background: #ff9800;
        }

        .attr-fill.stress {
          background: #f44336;
        }

        .attr-value {
          min-width: 60px;
          text-align: right;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .attr-value.wealth {
          color: #4caf50;
        }
      `}</style>
    </div>
  );
}

