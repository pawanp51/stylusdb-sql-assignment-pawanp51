const fs = require('fs');
const csv = require('csv-parser');
const { parse } = require('json2csv');

function readCSV(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function writeCSV(filename, data) {
    const csvData = parse(data);

    return new Promise((resolve, reject) => {
        fs.writeFile(filename, csvData, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { readCSV, writeCSV };