const speedTest = require("speedtest-net");

const options = {
    acceptLicense: true,
    acceptGdpr: true
};

async function execute() {
    const result = await speedTest(options);
    return result;
}

module.exports = {
    execute
}
