import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../services/taskService';
import TaskItem from './taskItem';

const TaskList = ({ onSelectTask, refreshTasks }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        getAllTasks().then(response => {
            setTasks(response.data.data);
        });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [refreshTasks]);

    const handleDelete = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        });
    };

    return (
        <div className="d-flex flex-column gap-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onSelectTask={onSelectTask}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;