const express = require('express');
const router = express.Router();
const presenceController = require('../controllers/presenceController');
const validationMiddleware = require('../middleware/validationMiddleware');

// POST /api/presence/update
router.post('/update',
    validationMiddleware.validateStatusUpdate(),
    presenceController.updateStatus
);

// GET /api/presence/:facultyId
router.get('/:facultyId', presenceController.getStatus);

module.exports = router;