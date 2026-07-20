const birthdayRule = require("./rules/birthdayRule");
const anniversaryRule = require("./rules/anniversaryRule");
const premiumDueRule = require("./rules/premiumDueRule");

const rules = [
    birthdayRule,
    anniversaryRule,
    premiumDueRule
];

exports.createEmailJobs = (client) => {

    const jobs = [];

    for (const rule of rules) {

        const job = rule.check(client);

        if (job) {
            console.log(`Matched rule: ${job.type}`);
            jobs.push(job);
        }

    }

    return jobs;

};