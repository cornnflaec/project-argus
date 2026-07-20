const templates = require("../../config/templates.json");
const { createPlaceholders } = require("../helpers/createPlaceholders");

exports.check = (client) => {

    const birthday = new Date(client["Date of Birth"]);
    const today = new Date();

    if (
        birthday.getMonth() !== today.getMonth() ||
        birthday.getDate() !== today.getDate()
    ) {
        return null;
    }

    return {

        type: "birthday",

        template: templates.birthday,

        email: client["Email Address"],

        placeholders: {

            CLIENT_NAME: client["Client Name"],

            POLICY_NAME: client["Policy Name"],

            POLICY_NUMBER: client["Policy Number"],

            PREMIUM_AMOUNT: client["Premium Amount"],

            PREMIUM_DUE_DATE: client["Premium Due Date"],

            CONTACT_NUMBER: client["Contact Number"]

        }

    };

};