const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled'
    },
    description: {
        type: String,
        default: ''
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'javascript'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    algorithm: {
        type: String,
        enum: ['qlearning', 'sarsa', 'policy-gradient', 'actor-critic', 'dqn', 'other'],
        default: 'other'
    },
    tags: [String],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
