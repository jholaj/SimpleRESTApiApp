const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'app.log');

function logEvent(event) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${event}\n`;

    fs.appendFile(logFilePath, logMessage, (error) => {
        if (error) {
            console.error('Chyba při záznamu události:', error);
        }
    });
}

module.exports = { logEvent };
