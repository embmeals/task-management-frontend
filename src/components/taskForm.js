import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onTaskCreated, existingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [status, setStatus] = useState('TO DO');

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description);
            setDueDate(existingTask.dueDate ? existingTask.dueDate.split('T')[0] : '');
            setPriority(existingTask.priority);
            setStatus(existingTask.status);
        } else {
            resetForm();
        }
    }, [existingTask]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('LOW');
        setStatus('TO DO');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            priority,
            status
        };

        if (existingTask) {
            updateTask(existingTask.id, taskData)
                .then((response) => {
                    toast.success(response.data.message || 'Task updated successfully!');
                    onTaskCreated(); 
                    resetForm();
                })
                .catch(() => {
                    toast.error('Failed to update the task.');
                });
        }
        else {
            createTask(taskData)
                .then((response) => {
                    toast.success(response.data.message || 'Task created successfully!');
                    onTaskCreated();
                    resetForm();
                })
                .catch(() => {
                    toast.error('Failed to create the task.');
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3" />
            </div>

            <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">Due Date</label>
                <input
                    id="dueDate"
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select
                    id="priority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="TO DO">To Do</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-success btn-lg">
                    {existingTask ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;