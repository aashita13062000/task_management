const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

const addTask = async (req, res) => {
    const { title, description, priority, duedate, labels } =
        req.body;
    const tasks = new Task({
        user: req.user._id,
        title,
        description,
        priority,
        dueDate,
        labels
    });
    const createdTask = await tasks.save();
    res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, dueDate, labels } = req.body;
    const task = await Task.findById(id);
    if (task) {
        task.title = title || task.title;
        task.description = title || task.description;
        task.title = priority || task.priority;
        task.title = status || task.status;
        task.title = dueDate || task.dueDate;
        task.title = labels || task.labels;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (task) {
        await task.remove();
        res.json({ message: 'Task removed' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };