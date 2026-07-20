exports.createPlaceholders = (client) => ({

    CLIENT_NAME: client["Client Name"] ?? "",

    POLICY_NAME: client["Policy Name"] ?? "",

    POLICY_NUMBER: client["Policy Number"] ?? "",

    POLICY_TYPE: client["Policy Type"] ?? "",

    ISSUE_DATE: client["Issue Date"] ?? "",

    PREMIUM_AMOUNT: client["Premium Amount"] ?? "",

    PREMIUM_DUE_DATE: client["Premium Due Date"] ?? "",

    PREMIUM_MODE: client["Premium Mode"] ?? "",

    CONTACT_NUMBER: client["Contact Number"] ?? "",

    EMAIL_ADDRESS: client["Email Address"] ?? ""

});