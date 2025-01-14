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
            } else resetForm();
        },
        [existingTask]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('LOW');
        setStatus('TO DO');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            dueDate: dueDate || null,
            priority,
            status
        };

        if (existingTask) await updateTask(existingTask.id, taskData);
        else await createTask(taskData);

        onTaskCreated();
        resetForm();
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backdropFilter: 'blur(5px)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">{existingTask
                            ? 'Edit Task'
                            : 'Add New Task'}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => {
                                onTaskCreated();
                                resetForm();
                            }} />
                    </div>
                    <div className="modal-body overflow-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
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

                                <div className="col-md-6">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input
                                        id="dueDate"
                                        type="date"
                                        className="form-control"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        placeholder="Enter task description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3" />
                                </div>

                                <div className="col-md-6">
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

                                <div className="col-md-6">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        id="status"
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="TO DO">To Do</option>
                                        <option value="IN PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-grid mt-4">
                                <button type="submit" className="btn btn-success btn-lg">
                                    {existingTask
                                        ? 'Update Task'
                                        : 'Add Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;