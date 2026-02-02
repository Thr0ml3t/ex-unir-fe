import React from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const priorityLabels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          id={`task-${task._id}`}
          checked={task.completed}
          onChange={() => onToggle(task._id, task.completed)}
        />
        <label htmlFor={`task-${task._id}`}></label>
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`}>
            {priorityLabels[task.priority]}
          </span>
          <span className="task-date">
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>
      
      <button 
        className="delete-btn"
        onClick={() => onDelete(task._id)}
        title="Eliminar tarea"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}

export default TaskItem;
