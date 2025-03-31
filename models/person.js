const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
//defining person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work:{
        type: String,
        enum:['chef','waiter','manager','owner'],
        required: true
    },
    mobile:{
        type: Number,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
    },
    salary:{
        type: Number,
        required: true
    },
    address:{
        type: String,
    },
    username:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String 
    }
});

personSchema.pre('save', async function(next) {
    const person = this; // Get the current person document being saved
    
    //Hash the new coming password or the password that is being updated
    if(!person.isModified('password')){
        return next(); // Proceed to the next middleware or save operation if password is not modified
    }
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10); // Generate a salt of 10 characters
        //hash password
        const hashedPassword=await bcrypt.hash(person.password, salt); // Hash the password using the generated salt
        //override the password with the hashed password
        person.password=hashedPassword; // Set the hashed password to the person document
        next(); // Proceed to the next middleware or save operation
    }
    catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {   
    try{
        //use bcrypt to compare the provided password with hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password); // Compare the candidate password with the hashed password
        return isMatch; // Return true if the passwords match, false otherwise
    }
    catch(err){
        throw err; // If an error occurs, throw the error
    }
}

const person= mongoose.model('Person', personSchema);
module.exports=person;