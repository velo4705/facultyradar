const express = require('express');
const router = express.Router();

const facultyRoutes = require('./facultyRoutes');
const presenceRoutes = require('./presenceRoutes');

router.use('/faculty', facultyRoutes);
router.use('/presence', presenceRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Faculty Radar Backend is running!',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;