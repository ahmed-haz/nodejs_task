const fs = require('fs');
const path = require('path');

const directoryToWatch = 'D:/test'; 

const logChange = (message) => {
  const logFile = path.join(__dirname, 'changes.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `${timestamp} - ${message}\n`, 'utf8');
};

fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename) {
    const filePath = path.join(directoryToWatch, filename);
    
    if (eventType === 'rename') {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          logChange(`${filename}: File deleted`);
        } else {
          logChange(`${filename}: File created`);
        }
      });
    } else if (eventType === 'change') {
      logChange(`${filename}: File modified`);
    }
  }
});

console.log(`Watching for changes in ${directoryToWatch}...`);

