//responsible for establishing connection
const mongoose=require('mongoose');

const mongoURL=('mongodb://localhost:27017/myDatabase');
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
