import React, { useEffect, useState } from 'react';
import { getTaskById } from '../services/taskService';

const TaskDetail = ({ taskId }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
        if (taskId) {
            getTaskById(taskId).then(response => setTask(response.data.data));
        }
    }, [taskId]);

    if (!task) return <div>Select a task to view details</div>;

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</p>
        </div>
    );
};

export default TaskDetail;