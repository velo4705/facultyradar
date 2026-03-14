const express = require('express');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple route handlers to avoid complex routing
app.get('/', (req, res) => {
    res.json({ message: 'Faculty Radar Backend API' });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Faculty Radar Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// Placeholder for faculty search
app.get('/api/faculty/search', (req, res) => {
    res.json({
        success: true,
        facultyList: [],
        count: 0
    });
});

// Placeholder for presence update
app.post('/api/presence/update', (req, res) => {
    res.json({
        success: true,
        message: 'Status update received'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

module.exports = app;