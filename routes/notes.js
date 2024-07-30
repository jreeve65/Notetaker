const notes = require('express').Router();
const {readFromFile,readAndAppend,readAndDelete} = require('../helpers/fsUtils');
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

notes.delete('/:id',(req,res)=> {
    console.info(`${req.method} request recivied for notes`);

    readAndDelete('./db/db.json',req.params.id);
 



});

module.exports = notes;