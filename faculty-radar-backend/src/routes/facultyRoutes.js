const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const validationMiddleware = require('../middleware/validationMiddleware');

// GET /api/faculty/search?name=searchTerm
router.get('/search',
    validationMiddleware.validateFacultySearch(),
    facultyController.searchFaculty
);

module.exports = router;