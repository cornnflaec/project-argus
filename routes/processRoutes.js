const express = require("express");

const router = express.Router();

const processController =
    require("../controllers/processController");

const googleDriveService =
    require("../services/googleDriveService");

router.post("/process", processController.process);

router.get("/test-drive", async (req, res) => {

    try {

        const buffer =
            await googleDriveService.getTemplate({

                folder: "template",

                fileName: "birthday.docx"

            });

        res.json({

            success: true,

            size: buffer.length

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

module.exports = router;