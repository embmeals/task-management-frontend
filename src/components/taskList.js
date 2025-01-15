import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../services/taskService';
import TaskItem from './taskItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ onSelectTask, refreshTasks }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = (showToast = true) => {
        getAllTasks()
            .then(response => {
                if (showToast) {
                    toast.dismiss();
                    toast.success(response.data.message || 'Tasks loaded successfully');
                }
                setTasks(response.data.data);
            })
            .catch(error => {
                toast.dismiss();
                toast.error(error.response?.data?.message || 'Failed to load tasks.');
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchTasks(false);
    }, [refreshTasks]);

    const handleDelete = (id) => {
        deleteTask(id)
            .then((response) => {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                toast.dismiss();
                toast.success(response.data.message || 'Task deleted successfully!');
            })
            .catch((error) => {
                toast.dismiss();
                toast.error(error.response?.data?.message || 'Failed to delete task.');
            });
    };

    return (
        <div className="d-flex flex-column gap-3">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable />
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onSelectTask={onSelectTask}
                    onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TaskList;