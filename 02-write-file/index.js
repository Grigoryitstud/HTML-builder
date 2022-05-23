var readline = require('readline');
const fs = require('fs');
const path = require('path');

const pathToText = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Введите текст')
rl.on('SIGINT', () => {
    console.log("Thank you for your text");
            rl.close();
            
})
rl.on('line', (input) => {
    
    // console.log(`Received: ${input}`);
let yourText = `${input}`
        if(yourText === 'exit'){
            console.log("Thank you for your text");
            rl.close();
        }else
fs.appendFile(pathToText, yourText, err => {
    if (err) {
        throw err
    }
    
})

})

// let addTexts = () => {
//     rl.question("You can write you massage here!" + " ", function(answer) {
//   // TODO: Log the answer in a database
//     let yourText = answer
//     if(yourText === 'exit'){
//         console.log("Thank you for your text");
//         rl.close();
//     } else
//     fs.appendFile(pathToText, ' ' + yourText, err => {
//         if (err) {
//             throw err
//         }
//     })
//     addTexts();
// //   console.log("Thank you for your text");

// //   rl.close();
//     })}



// const fs = require('fs');
// const path = require('path');
// const process = require('process');

// const pathToText = path.join(__dirname, 'text.txt');
// let yourText = ''
// fs.appendFile(pathToText, yourText, err => {
//     if (err) {
//         throw err
//     }
//     console.log('Введите текст');
// })


