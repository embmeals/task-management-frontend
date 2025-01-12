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
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">{existingTask ? 'Edit Task' : 'Add New Task'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => onTaskCreated()}
                        />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter task title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    id="description"
                                    className="form-control"
                                    placeholder="Enter task description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                <input
                                    id="dueDate"
                                    type="date"
                                    className="form-control"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)} />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    id="priority"
                                    className="form-control"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}>
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    id="status"
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}>
                                    <option value="TO DO">To Do</option>
                                    <option value="IN PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                {existingTask ? 'Update Task' : 'Add Task'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;