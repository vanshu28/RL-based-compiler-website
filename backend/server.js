const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const compilerRoutes = require('./routes/compiler');
const demoRoutes = require('./routes/demo');
const userRoutes = require('./routes/user');
const algorithmRoutes = require('./routes/algorithm');

// Initialize Express app
const app = express();

// Middleware
// Allow CORS from any origin to support local file:// and localhost usage
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve frontend static files
const frontendRoot = path.join(__dirname, '..');
app.use(express.static(frontendRoot));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendRoot, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// API Routes
app.use('/api/compiler', compilerRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/algorithm', algorithmRoutes);

// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: 'The requested endpoint does not exist',
        path: req.path 
    });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        error: err.name || 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║  RL Compiler Server Started           ║
    ║  Port: ${PORT}                          ║
    ║  Environment: ${process.env.NODE_ENV}         ║
    ╚═══════════════════════════════════════╝
    `);
    console.log('✓ Server is ready to handle requests');
    console.log(`✓ API URL: http://localhost:${PORT}/api`);
});

module.exports = app;
