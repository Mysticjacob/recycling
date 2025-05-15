const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "..", "logs", "app.log");

export const logInfo = (message) => {
  const log = `[INFO] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, log);
};

export const logError = (message) => {
  const log = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, log);
};
