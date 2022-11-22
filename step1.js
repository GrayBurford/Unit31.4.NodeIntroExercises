const fs = require('fs')
const process = require('process')

// Read a file from a given path and print to console/terminal
function cat (path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('ERROR:', err)
            process.exit(1)
        } else {
            console.log(data)
        }
    })
}

for (let i = 0; i < process.argv.length; i++) {
    console.log(i, process.argv[i])
}

// for (let arg in process.argv) {
//     console.log(arg)
// }

cat(process.argv[2])