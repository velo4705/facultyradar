const Joi = require('joi');

class ValidationMiddleware {
    validateFacultySearch() {
        return (req, res, next) => {
            const schema = Joi.object({
                name: Joi.string().min(1).max(100).required()
            }).unknown(true); // Allow other query params

            const { error } = schema.validate(req.query);

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    details: error.details[0].message
                });
            }

            next();
        };
    }

    validateStatusUpdate() {
        return (req, res, next) => {
            const schema = Joi.object({
                facultyId: Joi.string().uuid().required(),
                status: Joi.string().valid('PRESENT', 'ABSENT').required()
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    details: error.details[0].message
                });
            }

            next();
        };
    }
}

module.exports = new ValidationMiddleware();