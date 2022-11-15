// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

/* Spin up the server*/
const server = app.listen(port, listening);
function listening(){
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
}

app.get('/all', sendData);
function sendData (request, response) {
    response.send(projectData);
}

// POST Route
app.post('/add', add);
function add(req, res) {
    const newEntry = {
        date: req.body.date,
        city: req.body.city,
        country: req.body.country,
        temp: req.body.temp,
        feel: req.body.feel
    }
    projectData = newEntry;
    console.log(projectData);
    res.send(projectData);
}
/*
app.post('/add', async (req, res) => {
    projectData = await req.body;
    res.status(200).send(projectData);
});
*/