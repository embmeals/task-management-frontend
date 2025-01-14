import React from 'react';

const TaskItem = ({ task, onSelectTask, onDelete }) => {
    const collapseId = `collapse-${task.id}`;

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                <h5 className="mb-2 text-capitalize text-black flex-grow-1">{task.title}</h5>
                <button
                    className="btn btn-details btn-sm w-100 w-md-auto mt-2 mt-md-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}>
                    Details
                </button>
            </div>

            <div id={collapseId} className="collapse">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <p className="fw-semibold text-uppercase mb-1">Description:</p>
                            <p>{task.description || 'No description provided.'}</p>
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <p>
                                <span className="fw-semibold text-uppercase">Priority:</span>
                                <span className={`badge ms-2 ${task.priority === 'High'
                                    ? 'bg-danger'
                                    : task.priority === 'Medium'
                                        ? 'bg-warning text-dark'
                                        : 'bg-success'}`}>
                                    {task.priority}
                                </span>
                            </p>
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <p>
                                <span className="fw-semibold text-uppercase">Status:</span>
                                <span className={`badge ms-2 ${task.status === 'Done' ? 'bg-success' : 'bg-secondary'}`}>
                                    {task.status}
                                </span>
                            </p>
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <p>
                                <span className="fw-semibold text-uppercase">Due Date:</span>
                                <span className="ms-2">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                        <button
                            onClick={() => onSelectTask(task)}
                            className="btn btn-primary w-100 w-md-auto">
                            Edit Task
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="btn btn-danger w-100 w-md-auto">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;