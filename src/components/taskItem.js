import React from 'react';

const TaskItem = ({ task, onSelectTask, onDelete }) => {
    const collapseId = `collapse-${task.id}`;

    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="card-header text-dark d-flex justify-content-between align-items-center">
                <h5>{task.title}</h5>
                <button
                    className="btn btn-details btn-sm"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false"
                    aria-controls={collapseId}>
                    Details
                </button>
            </div>

            <div id={collapseId} className="collapse">
                <div className="card-body-custom">
                    <p><strong>Description:</strong> {task.description || 'No description provided.'}</p>
                    <p><strong>Priority:</strong>
                        <span className={`mx-2 badge ${task?.priority === 'HIGH'
                            ? 'bg-danger text-white'
                                : task?.priority === 'MEDIUM'
                                    ? 'bg-warning text-dark'
                                    : 'bg-primary'
                            }`}>{task?.priority}</span>
                    </p>

                    <p><strong>Status:</strong>
                        <span className={`mx-2 badge ${task?.status === 'DONE'
                            ? 'bg-success text-white'
                            : task?.status === 'IN PROGRESS'
                                    ? 'bg-warning text-dark'
                                    : 'bg-secondary text-white'
                            }`}>{task?.status}</span>
                    </p>
                    <p><strong>Due Date:</strong> {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : 'No Due Date'}</p>

                    <div className="d-flex gap-4">
                        <button onClick={() => onSelectTask(task)} className="btn btn-edit w-100">
                            <i className="bi bi-pencil-square me-2"></i>Edit Task
                        </button>
                        <button onClick={() => onDelete(task.id)} className="btn btn-delete w-100">
                            <i className="bi bi-trash me-2"></i>Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;