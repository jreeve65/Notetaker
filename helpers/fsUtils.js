const fs = require('fs'); // imports fs module
const util = require('util');// imports uitl library for making read asyncronous
//sets up read file as asyncronis
const readFromFile = util.promisify(fs.readFile);

// @param {string} destination
// @param {object} content
// @returns {void}
//helper function to write to the selected database
const writeToFile = (destination,content)=>{
    fs.writeFile(destination,JSON.stringify(content,null,4),(err)=> err ? console.error(err):console.info(`\nData written to ${destination}`)); 
}
// appends database by re creating data base with new items and overwrites the old one effectively "appending it"
const readAndAppend = (content,file) =>{
    readFromFile(file,'utf-8',(err,data)=>{
        if(err){
            console.error(err);
        } else {
            const parsedData = JSON.parse(data); // parses data
            parsedData.push(content);// pushes new object to parsed json array
            writeToFile(file,parsedData);// overwrites existing json file with new data
        }
    });
};

module.exports ={readFromFile,writeToFile,readAndAppend}; //exports functions for use where needed