const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    priority: {
        type: String, enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    status: {
        type: String, enum: ["in progress", "completed"],
        default: 'in progress'
    },
    dueDate: { type: Date },
    labels: [String],
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;