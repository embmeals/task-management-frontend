import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../services/taskService';

const TaskList = ({ onSelectTask }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then(response => setTasks(response.data.data));
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} onClick={() => onSelectTask(task.id)}>
                        {task.title} - {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
