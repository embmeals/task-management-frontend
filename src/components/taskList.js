import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../services/taskService';

const TaskList = ({ onSelectTask, refreshTasks }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = () => {
    getAllTasks().then(response => {
      setTasks(response.data.data);
    });
  };

  // Fetch tasks on initial load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Refresh tasks when refreshTasks state changes
  useEffect(() => {
    fetchTasks();
  }, [refreshTasks]);

  // Handle task deletion
  const handleDelete = (id) => {
    deleteTask(id).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  // Display priority with Bootstrap badge
  const getPriorityBadge = (priority) => {
    const colors = {
      HIGH: 'danger',
      MEDIUM: 'warning',
      LOW: 'success'
    };
    return <span className={`badge bg-${colors[priority]}`}>{priority}</span>;
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {tasks.map((task) => (
        <div key={task.id} className="card shadow-sm" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <p>Priority: {getPriorityBadge(task.priority)}</p>
            <p>Status: <span className="badge bg-secondary">{task.status}</span></p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</p>
            <button onClick={() => onSelectTask(task)} className="btn btn-primary me-2">Edit Task</button>
            <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
