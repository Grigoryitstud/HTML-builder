const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const pathToSecret = path.join(__dirname, 'assets');
fs.readdir(pathToSecret, (err, data) => {
    if(err) {
        throw err
    }
    fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets')).then(function() {
        console.log('Directory created successfully');
    }).catch(function() {
        console.log('failed to create directory');
    });
     console.log(data);
        data.forEach(file => {
            fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets', file)).then(function() {
                console.log('Directory created successfully');
            }).catch(function() {
                console.log('failed to create directory');
            })
                console.log(data);
                data.forEach(file => {
                    fs.copyFile(__dirname + 'project-dist' + '/assets/' + file, __dirname + 'project-dist' + '/assets/' + file, err => {
                        if(err) throw err; // не удалось скопировать файл
                        console.log('Файл успешно скопирован' + path.parse(file).name);
                    });
            })
        })  
})