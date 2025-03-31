const passport = require('passport'); // Import passport for authentication
const LocalStrategy = require('passport-local').Strategy; // Import the local strategy for authentication  (also called username & password strategy)
const person=require('./models/person'); // Import the person model for database operations

//autherntication logic
passport.use(new LocalStrategy(async function(USERNAME, PASSWORD, done) {
    try{
        console.log('Received credentials:',USERNAME,PASSWORD); // Log the received credentials
        const user=await person.findOne({username:USERNAME});
        if(!user){
            return done(null, false, {message: 'Incorrect username'}); // If user not found, return an error message
        }
        const isPasswordMatch=await user.comparePassword(PASSWORD); // Check if the provided password matches the stored password
        if(!isPasswordMatch){
            return done(null, false, {message: 'Incorrect password'}); // If password doesn't match, return an error message
        }
        else{
            return done(null, user); // If authentication is successful, return the user object
        }
    }
    catch(err){
        return done(err); // If an error occurs, return the error
    }
}));

module.exports=passport; // Export the passport instance for use in other files