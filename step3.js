const fs = require('fs')
const process = require('process')
const axios = require('axios')

// Read file from path and print to console
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

// Read file from path and print to file
function catWrite (outputFilename, path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log('ERROR:', err)
            process.exit(1)
        } else {
            fs.writeFile(outputFilename, data, { encoding: 'utf8', flag: 'a' }, function (err) {
                if (err) {
                    console.log("ERROR:", err)
                    process.kill(1)
                } else {
                    console.log(`Write to file: ${outputFilename} successful!`)
                }
            })
        }
    })
}
    

// Read content from URL and print to console
async function webCat (url) {
    try {
        let response = await axios.get(url)
        console.log(response.data)
    } catch (err) {
        console.log('ERROR:', err)
        process.exit(1)
    }

}

// Read content from URL and print to file
async function webCatWrite (outputFilename, url) {
    try {
        let response = await axios.get(url)
        fs.writeFile(outputFilename, response.data, { encoding: 'utf8', flag: 'a' }, function (err) {
            if (err) {
                console.log("fs.writeFile ERROR:", err)
                process.kill(1)
            } else {
                console.log(`Write to file: ${outputFilename} successful!`)
            }
        })
    } catch (err) {
        console.log('ERROR:', err)
        process.exit(1)
    }
}

for (let i = 0; i < process.argv.length; i++) {
    console.log(i, process.argv[i])
}

process.argv.some(val => {
    return val === '--out'
})  
    ? process.argv[4].slice(0,4) === 'http'
        ? webCatWrite(process.argv[3], process.argv[4])
        : catWrite(process.argv[3], process.argv[4])
    : process.argv[2].slice(0, 4) === 'http' 
        ? webCat(process.argv[2])
        : cat(process.argv[2])




