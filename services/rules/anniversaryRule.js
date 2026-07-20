const templates = require("../../config/templates.json");
const { createPlaceholders } = require("../helpers/createPlaceholders");

exports.check = (client) => {

    if (!client["Issue Date"]) {
        return null;
    }

    const issueDate = new Date(client["Issue Date"]);
    const today = new Date();

    if (
        issueDate.getMonth() !== today.getMonth() ||
        issueDate.getDate() !== today.getDate()
    ) {
        return null;
    }

    return {

        type: "anniversary",

        template: templates.anniversary,

        email: client["Email Address"],

        placeholders: createPlaceholders(client)

    };

};