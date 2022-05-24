const path = require('node:path');
const fs = require('fs');
const { readdir } = require('fs/promises');

const projectFolder = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'project-dist', 'style.css');
const pathToAssets = path.join(__dirname, 'assets');
const projectAssets = path.join(__dirname, 'project-dist', 'assets');
const pathToHtml = path.join(__dirname, 'project-dist', 'index.html');
const htmlStart = path.join(__dirname, 'template.html');
const startComponents = path.join(__dirname, 'components');
const pathToStartStyles = path.join(__dirname, 'styles');

//folder

fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
  console.log('projectFolderIsDone');
});

//index.html

fs.readFile(htmlStart, 'utf-8', (err, data) => {
  if (err) throw err;
  let tagsIndex = data;
  fs.readdir(startComponents, (err, files) => {
    if (err) throw err;
    for (const file of files) 
      fs.readFile(path.join(startComponents, file), 'utf-8', (err, data) => {
        if (err) throw err;
        tagsIndex = tagsIndex.replace(`{{${file.slice(0, file.lastIndexOf('.'))}}}`, data);
        fs.writeFile(pathToHtml, tagsIndex, () => {
          console.log(`${file} added`);
        });
      }
      );
  });
});

// styles
fs.readdir(pathToStartStyles, (err, data) => {
  if(err) {
      throw err
  }   
  data.forEach(file => {
      if(path.extname(file).split('.').pop() ===  'css') {
          const RS = fs.createReadStream(__dirname + '/styles/' + file, {encoding: 'utf-8'})
          // let WS = fs.createWriteStream(pathToStyles)

          RS.on('data', (chunk) => {
              fs.appendFile(pathToStyles, chunk, err => {
                  if (err) {
                      throw err
                  }
                  console.log('styles done');
              })
          })
      }
  
  })
})

// fs.open(pathToStyles
// , 'a', (err) => {
//   if(err) { throw err; } 
//   console.log('style.css created');
//   fs.truncate(pathToStyles
//   , (err) => {
//     if(err) throw err;
//   });

//   (async function(folderPath) {
//     try {
//       const files = await readdir(folderPath);
//       for (const file of files)
//         if (path.extname(`${file}`) == '.css') {
//           const rr = fs.createReadStream(path.join(folderPath, file));
//           rr.on('data', (chunk) => { 
//             fs.appendFile(pathToStyles
//             , chunk, (err) => {
//               if(err) throw err;
//             });
//           });
//           console.log(`${file} added to style.css`);
//           fs.appendFile(pathToStyles
//           , '\n\n', (err) => {if(err) throw err;});
//         }
//     } catch (error) {
//       console.error('there was an error:', error.message);
//     }
//   })(path.join(__dirname, 'styles'));
  
// });

//assets

function copyAssets(sourcePath, targetPath) {

  fs.mkdir(targetPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  (async function(sourcePath) {
    try {
      const files = await readdir(sourcePath, {withFileTypes: true});
      for (const file of files)
        if (file.isFile() == 1) {
          fs.copyFile(path.join(sourcePath, path.basename(`${file.name}`)), path.join(targetPath, path.basename(`${file.name}`)), err => {
            if(err) throw err;
            console.log(` ${file.name} copied`);
          });
        } else {
          fs.mkdir(path.join(targetPath, path.basename(`${file.name}`)), { recursive: true }, (err) => {
            if (err) throw err;
          });
          const folderFiles = await readdir(path.join(sourcePath, path.basename(`${file.name}`)), {withFileTypes: true});
          for (const folderFile of folderFiles) {
            if (folderFile.isFile() == 1) {
              fs.copyFile(path.join(sourcePath, path.basename(`${file.name}`), path.basename(`${folderFile.name}`)), path.join(targetPath, path.basename(`${file.name}`), path.basename(`${folderFile.name}`)), err => {
                if(err) throw err;
                console.log(` ${folderFile.name} copied`);
              });
            }
          }
        }
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  })(sourcePath);
}
copyAssets(pathToAssets, projectAssets);