const templates = require("../../config/templates.json");
const { createPlaceholders } = require("../helpers/createPlaceholders");

exports.check = (client) => {

    if (!client["Premium Due Date"]) {
        return null;
    }

    const dueDate = new Date(client["Premium Due Date"]);
    const today = new Date();

    // Ignore time portion
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
        (dueDate - today) / (1000 * 60 * 60 * 24)
    );

    const reminderDays = [30, 14, 7, 0];

    if (!reminderDays.includes(diffDays)) {
        return null;
    }

    return {

        type: "premiumDue",

        template: templates.premiumDue,

        email: client["Email Address"],

        placeholders: {

            ...createPlaceholders(client),

            DAYS_UNTIL_DUE: diffDays

        }

    };

};