import React, { useState } from 'react';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskCreated = () => {
        setShowModal(false);
        setRefreshTasks(prev => !prev);
    };

    const handleSelectTask = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-dark fw-bold">Task Management</h1>
                <button className="btn btn-success btn-lg" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Create Task
                </button>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backdropFilter: 'blur(5px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">{selectedTask ? 'Edit Task' : 'Create Task'}</h5>
                                <button type="button" className="btn-close" onClick={() => { setShowModal(false); setSelectedTask(null); }}></button>
                            </div>
                            <div className="modal-body">
                                <TaskForm onTaskCreated={handleTaskCreated} existingTask={selectedTask} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <TaskList onSelectTask={handleSelectTask} refreshTasks={refreshTasks} />
        </div>
    );
};

export default App;