const router = require('express').Router(); //sets up router for modularization so the server can use it


const notesRouter = require('./notes.js'); // lets index.js know about code in the notes.js


router.use('/notes', notesRouter); //tells the router to refer requests containing /notes to the notes.js code


module.exports = router; // exports code for server.js to use