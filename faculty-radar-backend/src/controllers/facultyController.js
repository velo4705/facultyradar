const supabaseService = require('../services/supabaseService');

class FacultyController {
    async searchFaculty(req, res) {
        try {
            const { name } = req.query;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Faculty name is required'
                });
            }

            const facultyList = await supabaseService.getFacultyByName(name);

            res.json({
                success: true,
                data: facultyList,
                count: facultyList.length
            });
        } catch (error) {
            console.error('Error searching faculty:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new FacultyController();