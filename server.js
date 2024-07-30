const express = require('express'); // imports the express library
const path = require('path');//importing path library
const api = require('./routes/index.js');// lets server know about index.js contained in routes file
const PORT = process.env.PORT|| 3001;//declares port to be used
const app = express(); // initialized the server

app.use(express.json());// tells the server to use a json format
app.use(express.urlencoded({extended: true})); // lets server use encoded urls
app.use(express.static('public'));// sets the default route ie http://localhost:3001/public/index.html
app.use('/api',api);// tells server to append api to route

app.get('/',(req,res)=>
res.sendFile(path.join(__dirname,'/public/index.html'))); // sets the landing page route

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))// sets path /notes to direct to the notes html page
});
app.get('*',(req,res)=>
res.sendFile(path.join(__dirname,'/public/index.html'))); // wild card route redirects back to index.html if note taker title is clicked

app.listen(PORT)