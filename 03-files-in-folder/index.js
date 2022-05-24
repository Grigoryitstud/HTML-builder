const fs = require('fs');
const path = require('path');

const pathToSecret = path.join(__dirname, 'secret-folder');
fs.readdir(pathToSecret, (err, data) => {
    if(err) {
        throw err
    }
    // console.log(data);
    data.forEach(file => {
        // console.log(
            fs.stat(__dirname + '/secret-folder/' + file, (err, stats) => {
            if(err) {
                throw err
            }
            if(stats.isFile()) {
                console.log(path.parse(file).name + ' - ' + path.extname(file).split('.').pop() + ' - ' + stats.size + 'b')
            }
        }
        )
    // )
})
})