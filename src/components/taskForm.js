import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';

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
        }
    }, [existingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            priority,
            status
        };

        if (existingTask)
            await updateTask(existingTask.id, taskData);
        else
            await createTask(taskData);

        onTaskCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} required/>
            <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            <input
                type="date"
                className="form-control mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}/>

            <select
                className="form-select mb-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <select
                className="form-select mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="TO DO">To Do</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>

            <button type="submit" className="btn btn-success w-100">
                {existingTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;