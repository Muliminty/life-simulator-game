import { Player } from '../types';
import { STAGE_NAMES } from '../constants';
import { formatNumber } from '../utils/gameUtils';

interface StatsPanelProps {
  player: Player;
}

export default function StatsPanel({ player }: StatsPanelProps) {
  return (
    <div className="stats-panel">
      <div className="stats-header">
        <h2>{player.name}</h2>
        <span className="age">{player.age} 岁</span>
        <span className="stage">{STAGE_NAMES[player.stage]}</span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">健康</div>
          <div className="stat-bar">
            <div
              className="stat-fill health"
              style={{ width: `${player.attributes.health}%` }}
            />
          </div>
          <div className="stat-value">{player.attributes.health}/100</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">智力</div>
          <div className="stat-bar">
            <div
              className="stat-fill intelligence"
              style={{ width: `${player.attributes.intelligence}%` }}
            />
          </div>
          <div className="stat-value">{player.attributes.intelligence}/100</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">魅力</div>
          <div className="stat-bar">
            <div
              className="stat-fill charm"
              style={{ width: `${player.attributes.charm}%` }}
            />
          </div>
          <div className="stat-value">{player.attributes.charm}/100</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">财富</div>
          <div className="stat-value wealth">{formatNumber(player.attributes.wealth)}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">幸福度</div>
          <div className="stat-bar">
            <div
              className="stat-fill happiness"
              style={{ width: `${player.attributes.happiness}%` }}
            />
          </div>
          <div className="stat-value">{player.attributes.happiness}/100</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">压力</div>
          <div className="stat-bar">
            <div
              className="stat-fill stress"
              style={{ width: `${player.attributes.stress}%` }}
            />
          </div>
          <div className="stat-value">{player.attributes.stress}/100</div>
        </div>
      </div>

      <div className="stats-info">
        <div className="info-item">
          <span className="info-label">教育:</span>
          <span className="info-value">{player.education || '无'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">职业:</span>
          <span className="info-value">{player.career?.name || '无'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">婚姻:</span>
          <span className="info-value">{player.maritalStatus || '单身'}</span>
        </div>
      </div>

      <style>{`
        .stats-panel {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .stats-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .stats-header h2 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }

        .age {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        .stage {
          background: #f0f0f0;
          color: #666;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 14px;
        }

        .stats-grid {
          display: grid;
          gap: 16px;
          margin-bottom: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-label {
          min-width: 60px;
          font-weight: 600;
          color: #555;
          font-size: 14px;
        }

        .stat-bar {
          flex: 1;
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
        }

        .stat-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.3s;
        }

        .stat-fill.health {
          background: #4caf50;
        }

        .stat-fill.intelligence {
          background: #2196f3;
        }

        .stat-fill.charm {
          background: #e91e63;
        }

        .stat-fill.happiness {
          background: #ff9800;
        }

        .stat-fill.stress {
          background: #f44336;
        }

        .stat-value {
          min-width: 60px;
          text-align: right;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .stat-value.wealth {
          color: #4caf50;
        }

        .stats-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 15px;
          border-top: 2px solid #f0f0f0;
        }

        .info-item {
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
      `}</style>
    </div>
  );
}

