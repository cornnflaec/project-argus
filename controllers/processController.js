const emailService = require("../services/emailService");

exports.process = async (req, res) => {

    try {

        const result = await emailService.process(req.body);

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};