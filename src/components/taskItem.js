import React from 'react';

const TaskItem = ({ task, onSelectTask, onDelete }) => {
  const collapseId = `collapse-${task.id}`;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 text-capitalize">{task.title}</h5>
        <button
          className="btn btn-details me-2"
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
            <div className="col-md-6">
              <p className="fw-semibold text-uppercase mb-2">Description:</p>
              <p>{task.description || 'No description provided.'}</p>
            </div>

            <div className="col-md-6">
              <p>
                <span className="fw-semibold text-uppercase">Priority: </span>
                <span className="badge bg-warning text-dark ms-2">{task.priority}</span>
              </p>
              <hr />

              <p>
                <span className="fw-semibold text-uppercase">Status: </span>
                <span className="badge bg-success ms-2">{task.status}</span>
              </p>
              <hr />

              <p>
                <span className="fw-semibold text-uppercase">Due Date: </span>
                <span className="ms-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</span>
              </p>
            </div>
          </div>

          <div className="d-flex gap-3 mt-3">
            <button onClick={() => onSelectTask(task)} className="btn btn-primary">Edit Task</button>
            <button onClick={() => onDelete(task.id)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;