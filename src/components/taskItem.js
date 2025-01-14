import React from 'react';

const TaskItem = ({ task, onSelectTask, onDelete }) => {
    const collapseId = `collapse-${task.id}`;

    return (
        <div className="card shadow-sm mb-4 p-4">
            {/* Header with Title and View Details Button */}
            <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-0 p-0 mb-3">
                <h5 className="mb-0 text-capitalize flex-grow-1">{task.title}</h5>
                <button
                    className="btn btn-details d-flex align-items-center px-3 py-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}
                >
                    View Details
                    <span className="material-icons ms-2">arrow_forward</span>
                </button>
            </div>

            {/* Collapsible Content */}
            <div id={collapseId} className="collapse">
                <div className="card-body p-0">
                    {/* Description */}
                    <div className="mb-4">
                        <p className="fw-semibold text-uppercase mb-2">Description:</p>
                        <p className="text-muted">{task.description || 'No description provided.'}</p>
                    </div>

                    {/* Priority, Status, Due Date */}
                    <div className="row mb-4">
                        <div className="col-12 col-md-4 mb-3 mb-md-0">
                            <p className="mb-1">
                                <span className="fw-semibold text-uppercase">Priority:</span>
                                <span
                                    className={`badge ms-2 ${task.priority === 'High'
                                        ? 'bg-danger'
                                        : task.priority === 'Medium'
                                            ? 'bg-warning text-dark'
                                            : 'bg-success'
                                        }`}
                                >
                                    {task.priority}
                                </span>
                            </p>
                        </div>

                        <div className="col-12 col-md-4 mb-3 mb-md-0">
                            <p className="mb-1">
                                <span className="fw-semibold text-uppercase">Status:</span>
                                <span
                                    className={`badge ms-2 ${task.status === 'Done' ? 'bg-success' : 'bg-secondary'}`}
                                >
                                    {task.status}
                                </span>
                            </p>
                        </div>

                        <div className="col-12 col-md-4">
                            <p className="mb-1">
                                <span className="fw-semibold text-uppercase">Due Date:</span>
                                <span className="ms-2">
                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : 'No Due Date'}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-3 d-md-flex justify-content-md-start">
                        <button
                            onClick={() => onSelectTask(task)}
                            className="btn btn-primary w-100 w-md-auto px-4 py-2"
                        >
                            Edit Task
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="btn btn-danger w-100 w-md-auto px-4 py-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;