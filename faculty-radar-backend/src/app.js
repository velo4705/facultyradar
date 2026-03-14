const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root route - ADD THIS
app.get('/', (req, res) => {
    res.json({
        message: 'Faculty Radar Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            faculty_search: '/api/faculty/search?name=example',
            presence_update: '/api/presence/update'
        }
    });
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler - FIXED
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

module.exports = app;