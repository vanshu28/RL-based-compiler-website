const mongoose = require('mongoose');

const executionLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    code: String,
    algorithm: String,
    status: {
        type: String,
        enum: ['success', 'error', 'timeout'],
        default: 'success'
    },
    output: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    error: String,
    executionTime: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ExecutionLog', executionLogSchema);
