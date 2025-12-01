import { GameSettings } from '../types';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdate: (settings: Partial<GameSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({
  settings,
  onUpdate,
  isOpen,
  onClose,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const handleToggle = (key: keyof GameSettings) => {
    onUpdate({ [key]: !settings[key] } as Partial<GameSettings>);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>游戏设置</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="settings-section">
            <h3>音效设置</h3>
            <div className="setting-item">
              <label className="setting-label">音效</label>
              <button
                className={`toggle-button ${settings.soundEnabled ? 'active' : ''}`}
                onClick={() => handleToggle('soundEnabled')}
              >
                {settings.soundEnabled ? '开启' : '关闭'}
              </button>
            </div>
            <div className="setting-item">
              <label className="setting-label">音乐</label>
              <button
                className={`toggle-button ${settings.musicEnabled ? 'active' : ''}`}
                onClick={() => handleToggle('musicEnabled')}
              >
                {settings.musicEnabled ? '开启' : '关闭'}
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>游戏设置</h3>
            <div className="setting-item">
              <label className="setting-label">自动保存</label>
              <button
                className={`toggle-button ${settings.autoSave ? 'active' : ''}`}
                onClick={() => handleToggle('autoSave')}
              >
                {settings.autoSave ? '开启' : '关闭'}
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>AI 模型设置</h3>
            <p className="setting-hint">
              AI 模型配置由运维人员通过配置文件管理（config/ai.json）。
              <br />
              修改配置文件后重新部署即可切换模型，无需修改代码。
            </p>
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
          max-width: 500px;
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

        .settings-section {
          margin-bottom: 24px;
        }

        .settings-section:last-child {
          margin-bottom: 0;
        }

        .settings-section h3 {
          margin: 0 0 16px 0;
          font-size: 1.2em;
          color: #333;
          padding-bottom: 8px;
          border-bottom: 2px solid #f0f0f0;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .setting-label {
          font-weight: 600;
          color: #333;
        }

        .toggle-button {
          padding: 8px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          color: #666;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 600;
        }

        .toggle-button.active {
          background: #667eea;
          color: white;
          border-color: #667eea;
        }

        .toggle-button:hover {
          border-color: #667eea;
        }

        .select-input {
          padding: 8px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          color: #333;
          cursor: pointer;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .select-input:hover {
          border-color: #667eea;
        }

        .select-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .setting-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #999;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

