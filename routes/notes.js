const notes = require('express').Router();
const {readFromFile,readAndAppend,writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
//  const test = require('../db/db.json')

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  

notes.post('/',(req,res)=>{
    console.info(`${req.method} request recived for notes`);
    const {title,text}= req.body;
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),

        };
        readAndAppend(newNote,'./db/db.json');
        res.json(`note added successfully`);
    } else{
        res.errored('Error with adding note');
    }
});

notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((notes) => notes.id !== id);
  
        writeToFile("./db/db.json", result);
  
        res.json(`Note ${id} has been deleted`);
      });
  });

module.exports = notes;