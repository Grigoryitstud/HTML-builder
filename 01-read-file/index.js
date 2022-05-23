const fs = require('fs');
const path = require('path');

const pathToText = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(pathToText);
readStream.on('data', (chunk) => {
    console.log(chunk.toString());
})

// fs.readFile(pathToText, 'utf-8', (err, content) => {
//     if(err) {
//         throw err
//     }
//     console.log(content)
    // const data = Buffer.from(content)
    // console.log(data.toString());
// })
// https://www.youtube.com/watch?v=xJvAfWinaow&list=PLNkWIWHIRwMFtsaJ4b_wwkJDHKJeuAkP0