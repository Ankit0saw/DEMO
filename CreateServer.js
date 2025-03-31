const express = require('express') // Import the express module
const app = express() // Create an instance of express

const db=require('./db'); // Import the database connection
require('dotenv').config(); // Load environment variables from .env file
const bodyParser = require('body-parser'); // Import body-parser to parse request bodies
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies

const person=require('./models/person'); // Import the person model 
const menuItem=require('./models/menuItems'); // Import the menuItems model

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/idli', function (req, res) {
    var idli="yes! available"; 
    var customized={
        type:"rava idli",
        shamber:true,
        chutney:false
    }
    // Combine the information into a single object or string
    var response = {
        message: 'Welcome to the hotel',
        idli: idli,
        customized: customized
    }
    res.send(response);
})

//import the router files
const personRoutes = require('./routes/personRoutes'); // Import the person routes
const menuRoutes = require('./routes/menuRoutes'); // Import the menu routes
// Use the imported routes for handling requests
app.use('/person', personRoutes);
app.use('/menu',menuRoutes); 

const PORT=process.env.PORT || 3000; // Set the port to listen on, defaulting to 3000

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });