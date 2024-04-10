const fs = require('fs');
const path = require('path');

const utilsDir = path.join(__dirname, '..');

const logDir = path.join(utilsDir, 'logs');
const logFilePath = path.join(logDir, 'app.log');

// if log file doesnt exist
function createDirIfNotExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

createDirIfNotExists(logDir);


function logEvent(event, isSuccess = true) {
    const timestamp = new Date().toISOString();
    let logPrefix = isSuccess ? '[OK]' : '[ERROR]';
    const logMessage = `${logPrefix} [${timestamp}] ${event}\n`;

    if (isSuccess) {
        console.log('\x1b[32m%s\x1b[0m', logMessage); // green text
    } else {
        console.error('\x1b[31m%s\x1b[0m', logMessage); // red text
    }

    // file write
    fs.appendFile(logFilePath, logMessage, (error) => {
        if (error) {
            console.error('Chyba při záznamu události:', error);
        }
    });
}

module.exports = { logEvent };
