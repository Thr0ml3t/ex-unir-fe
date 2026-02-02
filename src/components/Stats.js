import React from 'react';

function Stats({ total = 0, pending = 0, completed = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-number pending">{pending}</span>
        <span className="stat-label">Pendientes</span>
      </div>
      <div className="stat-item">
        <span className="stat-number completed">{completed}</span>
        <span className="stat-label">Completadas</span>
      </div>
      <div className="stat-item">
        <div className="progress-ring">
          <svg viewBox="0 0 36 36">
            <path
              className="progress-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="progress-fill"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.5" className="progress-text">{percentage}%</text>
          </svg>
        </div>
        <span className="stat-label">Progreso</span>
      </div>
    </div>
  );
}

export default Stats;
