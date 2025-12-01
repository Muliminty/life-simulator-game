import { Event, Choice } from '../types';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onChoice: (choice: Choice) => void;
  onClose: () => void;
}

export default function EventModal({
  event,
  isOpen,
  onChoice,
  onClose,
}: EventModalProps) {
  if (!isOpen || !event) return null;

  const handleChoice = (choice: Choice) => {
    onChoice(choice);
    onClose();
  };

  const getEventTypeColor = (type: Event['type']) => {
    const colors: Record<Event['type'], string> = {
      opportunity: '#4caf50',
      challenge: '#f44336',
      daily: '#2196f3',
      special: '#ff9800',
      stage: '#9c27b0',
    };
    return colors[type] || '#666';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="event-type-badge"
            style={{ background: getEventTypeColor(event.type) }}
          >
            {event.type === 'opportunity' && '✅ 机遇'}
            {event.type === 'challenge' && '⚠️ 挑战'}
            {event.type === 'daily' && '📅 日常'}
            {event.type === 'special' && '🎁 特殊'}
            {event.type === 'stage' && '🎯 阶段'}
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h2 className="event-title">{event.title}</h2>
          <p className="event-description">{event.description}</p>

          <div className="choices-list">
            {event.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-button"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </button>
            ))}
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

        .event-type-badge {
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
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

        .event-title {
          margin: 0 0 16px 0;
          font-size: 1.8em;
          color: #333;
        }

        .event-description {
          margin: 0 0 24px 0;
          line-height: 1.6;
          color: #666;
          font-size: 16px;
        }

        .choices-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .choice-button {
          padding: 16px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
        }

        .choice-button:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}

