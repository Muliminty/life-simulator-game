import { useState, useEffect } from 'react';
import { AIModel, AI_MODELS, getModelById, getModelDisplayName } from '../config/aiModels';
import { getAIConfig, switchAIModel, resetAIConfig } from '../config/aiConfig';

interface AIModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onModelChange?: (model: AIModel) => void;
}

export default function AIModelSelector({
  isOpen,
  onClose,
  onModelChange,
}: AIModelSelectorProps) {
  const [selectedModelId, setSelectedModelId] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [groupedModels, setGroupedModels] = useState<Record<string, AIModel[]>>({});

  useEffect(() => {
    if (isOpen) {
      // 获取当前配置
      const currentConfig = getAIConfig();
      setSelectedModelId(currentConfig.modelId || '');
      
      // 按提供商分组模型
      const grouped: Record<string, AIModel[]> = {};
      AI_MODELS.forEach((model) => {
        if (!grouped[model.provider]) {
          grouped[model.provider] = [];
        }
        grouped[model.provider].push(model);
      });
      setGroupedModels(grouped);
    }
  }, [isOpen]);

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
  };

  const handleApply = () => {
    if (!selectedModelId) {
      alert('请选择一个模型');
      return;
    }

    const model = getModelById(selectedModelId);
    if (!model) {
      alert('模型不存在');
      return;
    }

    // 切换模型
    const success = switchAIModel(selectedModelId, apiKey || undefined);
    if (success) {
      onModelChange?.(model);
      onClose();
      // 刷新页面以应用新配置
      window.location.reload();
    }
  };

  const handleReset = () => {
    if (confirm('确定要重置为环境变量配置吗？')) {
      resetAIConfig();
      onClose();
      window.location.reload();
    }
  };

  const getProviderName = (provider: string) => {
    const names: Record<string, string> = {
      siliconflow: 'SiliconFlow',
      openai: 'OpenAI',
      custom: '自定义',
    };
    return names[provider] || provider;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>切换 AI 模型</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="model-selector-section">
            <h3>选择模型</h3>
            <p className="section-description">
              选择不同的大模型可以获得不同的游戏体验。模型配置会保存到本地，重启后仍然有效。
            </p>

            {Object.entries(groupedModels).map(([provider, models]) => (
              <div key={provider} className="provider-group">
                <h4 className="provider-name">{getProviderName(provider)}</h4>
                <div className="models-grid">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className={`model-card ${
                        selectedModelId === model.id ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectModel(model.id)}
                    >
                      <div className="model-header">
                        <h5>{model.name}</h5>
                        {selectedModelId === model.id && (
                          <span className="selected-badge">✓</span>
                        )}
                      </div>
                      <p className="model-description">{model.description}</p>
                      <div className="model-meta">
                        <span className="model-id">{model.model}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="model-selector-section">
            <h3>API Key（可选）</h3>
            <p className="section-description">
              如果当前模型需要不同的 API Key，可以在这里输入。留空则使用环境变量中的 API Key。
            </p>
            <input
              type="password"
              className="api-key-input"
              placeholder="输入 API Key（可选）"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="model-selector-actions">
            <button className="btn-secondary" onClick={handleReset}>
              重置为环境变量配置
            </button>
            <button className="btn-primary" onClick={handleApply}>
              应用并切换
            </button>
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
          max-width: 900px;
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

        .model-selector-section {
          margin-bottom: 32px;
        }

        .model-selector-section h3 {
          margin: 0 0 8px 0;
          font-size: 1.2em;
          color: #333;
        }

        .section-description {
          margin: 0 0 16px 0;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }

        .provider-group {
          margin-bottom: 24px;
        }

        .provider-name {
          margin: 0 0 12px 0;
          font-size: 1.1em;
          color: #667eea;
          font-weight: 600;
        }

        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 12px;
        }

        .model-card {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }

        .model-card:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
        }

        .model-card.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .model-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .model-header h5 {
          margin: 0;
          font-size: 1.1em;
          color: #333;
        }

        .selected-badge {
          background: #667eea;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
        }

        .model-description {
          margin: 0 0 8px 0;
          color: #666;
          font-size: 13px;
          line-height: 1.5;
        }

        .model-meta {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #f0f0f0;
        }

        .model-id {
          font-size: 11px;
          color: #999;
          font-family: monospace;
        }

        .api-key-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .api-key-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .model-selector-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #f0f0f0;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }
      `}</style>
    </div>
  );
}

