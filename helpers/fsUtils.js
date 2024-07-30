const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

// @param {string} destination
// @param {object} content
// @returns {void}

const writeToFile = (destination,content)=>{
    fs.writeFile(destination,JSON.stringify(content,null,4),(err)=> err ? console.error(err):console.info(`\nData written to ${destination}`));
}

const readAndAppend = (content,file) =>{
    readFromFile(file,'utf-8',(err,data)=>{
        if(err){
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file,parsedData);
        }
    });
};

module.exports ={readFromFile,writeToFile,readAndAppend};