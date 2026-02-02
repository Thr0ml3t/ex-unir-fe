import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks = [], onToggle, onDelete, filter }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
          />
        </svg>
        <p>
          {filter === 'all' && 'No hay tareas. ¡Agrega una nueva!'}
          {filter === 'pending' && 'No hay tareas pendientes. ¡Buen trabajo!'}
          {filter === 'completed' && 'No hay tareas completadas aún.'}
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
