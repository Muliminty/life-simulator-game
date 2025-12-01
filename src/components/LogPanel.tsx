import { LogEntry } from '../types';
import { formatDate } from '../utils/gameUtils';

interface LogPanelProps {
  logs: LogEntry[];
}

export default function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="log-panel">
      <h3>游戏日志</h3>
      <div className="log-list">
        {logs.length === 0 ? (
          <div className="log-empty">暂无日志</div>
        ) : (
          logs.slice(-10).reverse().map((log) => (
            <div key={log.id} className={`log-item log-${log.type}`}>
              <div className="log-time">
                {new Date(log.timestamp).toLocaleTimeString('zh-CN')}
              </div>
              <div className="log-message">{log.message}</div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .log-panel {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          display: flex;
          flex-direction: column;
        }

        .log-panel h3 {
          margin: 0 0 16px 0;
          font-size: 1.2em;
          color: #333;
        }

        .log-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .log-empty {
          text-align: center;
          color: #999;
          padding: 40px;
        }

        .log-item {
          padding: 12px;
          border-radius: 8px;
          background: #f8f9fa;
          display: flex;
          gap: 12px;
          font-size: 14px;
        }

        .log-item.log-event {
          border-left: 4px solid #2196f3;
        }

        .log-item.log-choice {
          border-left: 4px solid #4caf50;
        }

        .log-item.log-stage {
          border-left: 4px solid #9c27b0;
        }

        .log-item.log-achievement {
          border-left: 4px solid #ff9800;
        }

        .log-item.log-system {
          border-left: 4px solid #999;
        }

        .log-time {
          color: #999;
          font-size: 12px;
          min-width: 80px;
        }

        .log-message {
          flex: 1;
          color: #333;
        }
      `}</style>
    </div>
  );
}

