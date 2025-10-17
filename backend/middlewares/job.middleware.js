import joi from "joi";

export const createJobMiddleware = async (req, res, next) => {

    if (req.body && typeof req.body.qualification === "string") {
        try {
            req.body.qualification = JSON.parse(req.body.qualification);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format in 'qualification' field"
            });
        };
    };

    try {
        const schema = joi.object({
            title: joi.string().min(5).max(100).trim().required(),
            description: joi.string().min(15).max(255).trim().required(),
            salary: joi.number().invalid(0).positive().required(),
            companyName: joi.string().min(3).max(50).trim().required(),
            location: joi.string().min(5).max(100).trim().required(),
            jobType: joi.string().valid("Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)").required(),
            qualification: joi.array().items(joi.string().min(10).max(200).trim()).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};