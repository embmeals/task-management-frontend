// Mock backend — no API server needed. All data lives in memory.

let tasks = [
  {
    id: "1",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions to build, test, and deploy the API to Azure App Service on every push to master.",
    priority: "HIGH",
    status: "IN PROGRESS",
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
  },
  {
    id: "2",
    title: "Add user authentication",
    description: "Implement JWT-based authentication with login and registration endpoints.",
    priority: "HIGH",
    status: "TO DO",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
  },
  {
    id: "3",
    title: "Write unit tests for TaskController",
    description: "Increase test coverage for all CRUD endpoints including edge cases and validation.",
    priority: "MEDIUM",
    status: "IN PROGRESS",
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
  },
  {
    id: "4",
    title: "Design database schema",
    description: "Create an Entity Framework Core model and migrations for SQL Server to replace in-memory storage.",
    priority: "HIGH",
    status: "TO DO",
    dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
  },
  {
    id: "5",
    title: "Update API documentation",
    description: "Review and update Swagger annotations to ensure all endpoints are fully documented with examples.",
    priority: "LOW",
    status: "TO DO",
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
  },
  {
    id: "6",
    title: "Fix CORS policy for production",
    description: "Update CORS configuration to allow requests from the deployed Vercel frontend domain.",
    priority: "MEDIUM",
    status: "DONE",
    dueDate: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

let nextId = 7;

const mock = (data) => Promise.resolve({ data });

export const getAllTasks = () =>
  mock({ message: "Tasks retrieved successfully", data: [...tasks] });

export const getTaskById = (id) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return Promise.reject({ response: { data: { message: "Task not found" } } });
  return mock({ message: "Task retrieved successfully", data: task });
};

export const createTask = (task) => {
  const newTask = { ...task, id: String(nextId++) };
  tasks.push(newTask);
  return mock({ message: "Task created successfully", data: newTask });
};

export const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  return mock({ message: "Task deleted successfully" });
};

export const updateTask = (id, taskData) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return Promise.reject({ response: { data: { message: "Task not found" } } });
  tasks[index] = { ...tasks[index], ...taskData };
  return mock({ message: "Task updated successfully", data: tasks[index] });
};
