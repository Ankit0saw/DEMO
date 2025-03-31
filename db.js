//responsible for establishing connection
const mongoose=require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
//const mongoURL=process.env.MONGODB_URL_LOCAL; // MongoDB connection URL
const mongoURL=process.env.MONGODB_URL; // MongoDB connection URL

mongoose.connect(mongoURL)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err));
 
const db=mongoose.connection;
// Listen for connection events
db.on('connected', () => {
    console.log('MongoDB connected!');
});
db.on('disconnected', () => { 
    console.log('MongoDB disconnected!');
});
// Handle connection errors
db.on('error',() =>{
     console.log('MongoDB connection error:')
});
db.on('open', () => {   
    console.log('MongoDB connection opened!');
});
//exports the connection to be used in other files
module.exports = db;