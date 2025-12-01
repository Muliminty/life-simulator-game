import { Player, Property } from '../types';
import { formatNumber } from '../utils/gameUtils';

interface PropertyModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyModal({
  player,
  isOpen,
  onClose,
}: PropertyModalProps) {
  if (!isOpen) return null;

  const totalValue = player.properties.reduce((sum, prop) => sum + prop.value, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>房产资产</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="summary-section">
            <div className="summary-item">
              <span className="summary-label">房产数量:</span>
              <span className="summary-value">{player.properties.length} 套</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">总价值:</span>
              <span className="summary-value wealth">
                {formatNumber(totalValue)}
              </span>
            </div>
          </div>

          {player.properties.length === 0 ? (
            <p className="empty-message">暂无房产</p>
          ) : (
            <div className="properties-list">
              {player.properties.map((property) => (
                <div key={property.id} className="property-item">
                  <div className="property-header">
                    <h3>{property.name}</h3>
                  </div>
                  <div className="property-info">
                    <div className="info-row">
                      <span className="info-label">购买价格:</span>
                      <span className="info-value">
                        {formatNumber(property.price)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">当前价值:</span>
                      <span className="info-value wealth">
                        {formatNumber(property.value)}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">购买日期:</span>
                      <span className="info-value">
                        {new Date(property.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">增值:</span>
                      <span
                        className={`info-value ${
                          property.value >= property.price ? 'profit' : 'loss'
                        }`}
                      >
                        {property.value >= property.price ? '+' : ''}
                        {formatNumber(property.value - property.price)}
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
          justify-content: space-around;
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

        .summary-value.wealth {
          color: #4caf50;
        }

        .empty-message {
          text-align: center;
          color: #999;
          padding: 40px 20px;
        }

        .properties-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .property-item {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
        }

        .property-item:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }

        .property-header {
          margin-bottom: 12px;
        }

        .property-header h3 {
          margin: 0;
          font-size: 1.3em;
          color: #333;
        }

        .property-info {
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

        .info-value.wealth {
          color: #4caf50;
        }

        .info-value.profit {
          color: #4caf50;
        }

        .info-value.loss {
          color: #f44336;
        }
      `}</style>
    </div>
  );
}

