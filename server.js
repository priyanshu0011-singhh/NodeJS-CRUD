var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(1);
});

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/note.routes.js')(app);
require('./app/routes/location.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
