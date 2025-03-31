const mongoose = require('mongoose');

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
});
    
const person= mongoose.model('Person', personSchema);
module.exports=person;