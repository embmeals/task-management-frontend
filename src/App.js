import React, { useState } from 'react';
import TaskList from './components/taskList';
import TaskDetail from './components/taskDetails';
import TaskForm from './components/taskForm';

const App = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    return (
        <div>
            <h1>Task Management</h1>
            <TaskForm onTaskCreated={() => window.location.reload()} />
            <TaskList onSelectTask={setSelectedTaskId} />
            <TaskDetail taskId={selectedTaskId} />
        </div>
    );
};

export default App;