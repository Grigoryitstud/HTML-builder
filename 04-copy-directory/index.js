const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathToText = path.join(__dirname, 'files-copy');
  
fsPromises.mkdir(pathToText, recursive).then(function() {
    console.log('Directory created successfully');
}).catch(function() {
    console.log('failed to create directory');
});
