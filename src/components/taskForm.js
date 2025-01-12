import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('LOW');

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ title, description, dueDate, priority, status: 'TODO' })
      .then(() => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('LOW');
        onTaskCreated();
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} required />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}></textarea>
      <input
        type="date"
        className="form-control mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} />
      <select
        className="form-select mb-3"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button type="submit" className="btn btn-success w-100">Add Task</button>
    </form>
  );
};

export default TaskForm;