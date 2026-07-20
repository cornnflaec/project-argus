const eventService = require("./eventService");
const googleDriveService = require("./googleDriveService");
const templateService = require("./templateService");

exports.process = async (clients) => {

    // Accept either a single client object or an array
    if (!Array.isArray(clients)) {
        clients = [clients];
    }

    const emails = [];

    // Loop through each client
    for (const client of clients) {

        console.log("emailService ==================================");
        console.log("Processing:", client["Client Name"]);
        // Generate all email jobs for this client
        const emailJobs = eventService.createEmailJobs(client);
        console.log("Matched:", emailJobs.map(job => job.type));
        
        // Loop through all jobs
        for (const emailJob of emailJobs) {

            try {

                const buffer = await googleDriveService.getTemplate(
                    emailJob.template
                );

                const subject = templateService.renderText(
                    emailJob.template.subject,
                    emailJob.placeholders
                );

                const html = await templateService.render(
                    buffer,
                    emailJob.placeholders
                );

                emails.push({
                    type: emailJob.type,
                    policyNumber: client["Policy Number"],
                    clientName: client["Client Name"],
                    email: emailJob.email,
                    subject,
                    html
                });
                
            } catch (err) {

                console.error(
                    `Failed to process ${emailJob.type}:`,
                    err.message
                );

            }

        }

    }

    return emails;

};