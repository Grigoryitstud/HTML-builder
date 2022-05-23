const { FILE } = require('dns');
const fs = require('fs');
const path = require('path');

const pathToSecret = path.join(__dirname, 'styles');
fs.readdir(pathToSecret, (err, data) => {
    if(err) {
        throw err
    }   
    data.forEach(file => {
        if(path.extname(file).split('.').pop() ===  'css') {
            const RS = fs.createReadStream(__dirname + '/styles/' + file, {encoding: 'utf-8'})
            let WS = fs.createWriteStream(__dirname + '/project-dist/' + 'bundle.css')

            RS.on('data', (chunk) => {
                fs.appendFile(__dirname + '/project-dist/' + 'bundle.css', chunk, err => {
                    if (err) {
                        throw err
                    }
                })
            })
        }
    
    })
})