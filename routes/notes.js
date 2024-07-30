const notes = require('express').Router();  // sets up the notes router for modulariztion
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');// imports fs helper funcions
const uuid = require('../helpers/uuid');// imports unique id generating function
//  const test = require('../db/db.json')
// get request to connect the get fetch request to the front end
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// connects post route to the post request in the db
notes.post('/', (req, res) => { //forward slash connects notes to localhost 3001/api
  const { title, text } = req.body;// gets the request body
  if (req.body) {
    const newNote = {  // creates new note object and assigns values from the body to the attributes below and creates an ad on creation
      title,
      text,
      id: uuid(),

    };
    readAndAppend(newNote, './db/db.json'); // reads the current json pushes new note to the json and rewrites the data to db.json to contain the new note
    res.json(`note added successfully`); // log showing the route was hit successfully
  } else {
    res.errored('Error with adding note');  //catches error if there is a problem
  }
});
// delete request removes data from db.json 
notes.delete("/:id", (req, res) => { // :id selects the id of the note object in the url
  const id = req.params.id; // assigns id to the id matching the number in the request
  readFromFile("./db/db.json") // retrieves the data base
    .then((data) => JSON.parse(data)) // parses the data
    .then((json) => {
      const result = json.filter((notes) => notes.id !== id); // stores all the data excluding data that contains the id matching our id variable to results

      writeToFile("./db/db.json", result); //overwrites the new array that excludeds the note containing the fetched id to db.json effectively deleting it from the database.

      res.json(`Note ${id} has been deleted`); // console confirmation letting one know that the route was hit successfuly
    });
});

module.exports = notes; //exports the file to be used in index.js