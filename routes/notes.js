const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const {readFromFile,readAndAppend} = require('../helpers/fsUtils');

notes.get('/',(req,res)=>{
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)));
});

notes.post('/',(req,res)=>{
    console.info(`${req.method} request recived for notes`);
    const {title,text}= req.body;
    if(req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),

        };
        readAndAppend(newNote,'./db/db.json');
        res.json(`note added successfully`);
    } else{
        res.errored('Error with adding note');
    }
});

module.export = notes;