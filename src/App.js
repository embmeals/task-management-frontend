import React, { useState } from 'react';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';

const App = () => {
  const [showModal, setShowModal] = useState(false);

return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-center">Task Management</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Task</button>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <TaskForm onTaskCreated={() => setShowModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <TaskList />
    </div>
  );
};

export default App;