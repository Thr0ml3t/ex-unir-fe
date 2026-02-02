import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import Stats from './components/Stats';

// La URL del API - usa /api que será proxy al backend
const API_URL = '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dbStatus, setDbStatus] = useState({ status: 'connecting' });

  const loadDbStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/db-status`);
      const data = await response.json();
      setDbStatus(data);
    } catch (err) {
      setDbStatus({ status: 'disconnected', host: 'unknown', port: 27017 });
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      if (data.success) {
        setTasks(data.data || []);
      } else {
        setError(data.error || 'Error al cargar tareas');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDbStatus();
    loadTasks();
    const interval = setInterval(loadDbStatus, 30000);
    return () => clearInterval(interval);
  }, [loadDbStatus, loadTasks]);

  const addTask = async (newTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      const data = await response.json();
      if (data.success) {
        setTasks(prev => [data.data, ...prev]);
        return true;
      } else {
        setError(data.error || 'Error al agregar tarea');
        return false;
      }
    } catch (err) {
      setError('Error de conexión al servidor');
      return false;
    }
  };

  const toggleTask = async (taskId, currentCompleted) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentCompleted })
      });
      const data = await response.json();
      if (data.success) {
        setTasks(prev => prev.map(t => 
          t._id === taskId ? { ...t, completed: data.data.completed } : t
        ));
      } else {
        setError(data.error || 'Error al actualizar tarea');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setTasks(prev => prev.filter(t => t._id !== taskId));
      } else {
        setError(data.error || 'Error al eliminar tarea');
      }
    } catch (err) {
      setError('Error de conexión al servidor');
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  };

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="container">
      <header>
        <h1>📋 Gestión de Tareas</h1>
        <p>MEAN Stack - MongoDB, Express, React, Node.js</p>
      </header>

      <div className="status-bar">
        <div className="status-indicator">
          <div className={`status-dot ${dbStatus.status}`}></div>
          <span>MongoDB: {dbStatus.status || 'verificando...'}</span>
        </div>
        <span>{dbStatus.host}:{dbStatus.port}</span>
      </div>

      <div className="card">
        <TaskForm onAddTask={addTask} />
        
        <TaskFilters 
          filter={filter} 
          setFilter={setFilter}
          totalCount={tasks.length}
          pendingCount={pendingCount}
          completedCount={completedCount}
        />

        {error && (
          <div className="error-message">
            {error}
            <button 
              onClick={() => setError(null)} 
              style={{background:'none',border:'none',cursor:'pointer',fontSize:'18px'}}
            >
              ×
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando tareas...</div>
        ) : (
          <TaskList 
            tasks={getFilteredTasks()} 
            onToggle={toggleTask} 
            onDelete={deleteTask}
            filter={filter}
          />
        )}

        {tasks.length > 0 && (
          <Stats 
            total={tasks.length} 
            pending={pendingCount} 
            completed={completedCount} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
