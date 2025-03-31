//responsible for establishing connection
const mongoose=require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const mongoURL=process.env.MONGODB_URL_LOCAL; // Get the MongoDB URL from environment variables
mongoose.connect(mongoURL)

const db=mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected!');
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
});
// Handle connection errors
db.on('error',
     console.error.bind(console, 'MongoDB connection error:')
);
db.once('open', () => {
    console.log('Connected to MongoDB!');
}); 

//exports the connection to be used in other files
module.exports = db;
