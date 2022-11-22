const fs = require('fs')
const process = require('process')
const axios = require('axios')

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

// Read the content of a URL from a given URL passed from command line
async function webCat (url) {
    try {
        let response = await axios.get(url)
        console.log(response.data)
    } catch (err) {
        console.log('ERROR:', err)
        process.exit(1)
    }

}

for (let i = 0; i < process.argv.length; i++) {
    console.log(i, process.argv[i])
}

process.argv[2].slice(0, 4) === 'http' 
    ? webCat(process.argv[2])
    : cat(process.argv[2])


