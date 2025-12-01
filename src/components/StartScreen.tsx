import { useState } from 'react';
import { Player } from '../types';
import { generateRandomAttributes } from '../utils/attributeUtils';
import { INITIAL_ATTRIBUTE_RANGE } from '../constants';

interface StartScreenProps {
  onCreateGame: (name: string, attributes: Player['attributes']) => void;
}

export default function StartScreen({ onCreateGame }: StartScreenProps) {
  const [name, setName] = useState('');
  const [attributes, setAttributes] = useState(generateRandomAttributes());

  const handleRandomize = () => {
    setAttributes(generateRandomAttributes());
  };

  const handleStart = () => {
    if (!name.trim()) {
      alert('请输入角色名称');
      return;
    }
    onCreateGame(name.trim(), attributes);
  };

  return (
    <div className="start-screen">
      <div className="start-container">
        <h1>🌟 人生模拟器 🌟</h1>
        <p className="subtitle">体验从出生到老去的完整人生历程</p>

        <div className="form-group">
          <label htmlFor="name">角色名称</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入你的名字"
            maxLength={20}
          />
        </div>

        <div className="attributes-section">
          <div className="attributes-header">
            <h2>初始属性</h2>
            <button onClick={handleRandomize} className="btn-randomize">
              重新随机
            </button>
          </div>

          <div className="attributes-grid">
            <div className="attribute-item">
              <label>健康</label>
              <div className="attribute-value">
                <span>{attributes.health}</span>
                <div className="attribute-bar">
                  <div
                    className="attribute-fill"
                    style={{ width: `${attributes.health}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="attribute-item">
              <label>智力</label>
              <div className="attribute-value">
                <span>{attributes.intelligence}</span>
                <div className="attribute-bar">
                  <div
                    className="attribute-fill"
                    style={{ width: `${attributes.intelligence}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="attribute-item">
              <label>魅力</label>
              <div className="attribute-value">
                <span>{attributes.charm}</span>
                <div className="attribute-bar">
                  <div
                    className="attribute-fill"
                    style={{ width: `${attributes.charm}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="attribute-item">
              <label>财富</label>
              <div className="attribute-value">
                <span>{attributes.wealth.toLocaleString()}</span>
              </div>
            </div>

            <div className="attribute-item">
              <label>幸福度</label>
              <div className="attribute-value">
                <span>{attributes.happiness}</span>
                <div className="attribute-bar">
                  <div
                    className="attribute-fill"
                    style={{ width: `${attributes.happiness}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="attribute-item">
              <label>压力</label>
              <div className="attribute-value">
                <span>{attributes.stress}</span>
                <div className="attribute-bar">
                  <div
                    className="attribute-fill"
                    style={{ width: `${attributes.stress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleStart} className="btn-start" disabled={!name.trim()}>
          开始游戏
        </button>
      </div>

      <style>{`
        .start-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .start-container {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        h1 {
          text-align: center;
          margin: 0 0 10px 0;
          font-size: 2.5em;
          color: #333;
        }

        .subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 30px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .attributes-section {
          margin-bottom: 30px;
        }

        .attributes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .attributes-header h2 {
          margin: 0;
          font-size: 1.5em;
          color: #333;
        }

        .btn-randomize {
          padding: 8px 16px;
          background: #f0f0f0;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }

        .btn-randomize:hover {
          background: #e0e0e0;
        }

        .attributes-grid {
          display: grid;
          gap: 16px;
        }

        .attribute-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .attribute-item label {
          font-weight: 600;
          color: #555;
          font-size: 14px;
        }

        .attribute-value {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .attribute-value span {
          min-width: 50px;
          font-weight: 600;
          color: #333;
        }

        .attribute-bar {
          flex: 1;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .attribute-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s;
        }

        .btn-start {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-start:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-start:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

