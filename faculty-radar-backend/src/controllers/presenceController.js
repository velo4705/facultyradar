const supabaseService = require('../services/supabaseService');

class PresenceController {
    async updateStatus(req, res) {
        try {
            const { facultyId, status } = req.body;

            if (!facultyId || !status) {
                return res.status(400).json({
                    success: false,
                    message: 'Faculty ID and status are required'
                });
            }

            if (!['PRESENT', 'ABSENT'].includes(status.toUpperCase())) {
                return res.status(400).json({
                    success: false,
                    message: 'Status must be PRESENT or ABSENT'
                });
            }

            await supabaseService.updateFacultyStatus(facultyId, status.toUpperCase());

            res.json({
                success: true,
                message: 'Status updated successfully'
            });
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    async getStatus(req, res) {
        try {
            const { facultyId } = req.params;

            const facultyList = await supabaseService.getFacultyById(facultyId);

            if (!facultyList.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Faculty not found'
                });
            }

            res.json({
                success: true,
                data: facultyList[0]
            });
        } catch (error) {
            console.error('Error getting status:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new PresenceController();