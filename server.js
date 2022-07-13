const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

/*listening port*/
const port = 8080 ;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port , () => {
    console.log(`Server running on port: ${port}`);
});

//get route
app.get('/all',(req , res ) => {
	res.send(projectData);
	console.log(projectData);
});

//post route
app.post('/addData',(req , res) =>{
	projectData = {
		temp:req.body.temp,
		date:req.body.date,
		content:req.body.content
	};
	res.send(projectData);
	res.console.log(projectData);
});
