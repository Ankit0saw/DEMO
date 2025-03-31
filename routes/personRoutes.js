const express = require('express');
const router = express.Router();
const person = require('../models/person'); // Import the person model
const {jwtAuthMiddleware,generateToken}=require('../jwt'); // Import the authentication module
router.post('/signup', async function (req, res) {
    try{
      const data=req.body; // Extract data from the request body  
  
      // Create a new person using the data from the request body
      const newPerson = new person(data);
      //OR, const newPerson = new person({
      //     name: req.body.name,   
      //     age: req.body.age,
      //     .....
      // });
  
      //save the new person to the database
      const response=await newPerson.save(); // Save the new person to the database
      // Send a success response back to the client 
      console.log('data is saved');

      const payload={
        id: response.id,
        username: response.username
      }

      console.log('payload is created:',payload); // Log the payload for debugging
      console.log(JSON.stringify(payload)); // Log the payload as a JSON string for debugging
      const token=generateToken(payload); // Generate a JWT token for the new user
      console.log('token is generated:',token); // Log the generated token
      res.status(200).json({message: 'Person created successfully', data: response,Token:token}); // Send the person data and token as a JSON response
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})
  
router.get('/', async function (req, res) {
  try{
    const data=await person.find(); // Fetch all persons from the database
    console.log('data is fetched');
    res.status(200).json(data); // Send the persons as a JSON response
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.get('/:workType', async function (req, res) {
    try{
      const workType = req.params.workType; // Extract the workType from the URL parameters
      if(workType=='chef' || workType=='waiter' || workType=='manager' || workType=='owner'){
        const response=await person.find({work:workType}); // Fetch persons with the specified work type from the database
        console.log('data is fetched');
        res.status(200).json(response); // Send the persons as a JSON response
      }
      else{
        console.log('invalid workType');
        res.status(404).json({error: 'Invalid workType'}); // Send a 400 Bad Request response if the workType is invalid
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async function (req, res) {
    try{
      const personId = req.params.id; // Extract the ID from the URL parameters
      const data=req.body; // Extract data from the request body
  
      // Update the person with the specified ID using the data from the request body
      const response=await person.findByIdAndUpdate(personId, data, { 
        new: true,
        runValidators: true // Validate the data against the schema
      }) // Update the person in the database
        if(!response){
            console.log('person not found');
            return res.status(404).json({error: 'Person not found'}); // Send a 404 Not Found response if the person is not found
        }
      console.log('data is updated');
      res.status(200).json({message: 'Person updated successfully', data: response}); // Send a success response back to the client
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async function (req, res) {
    try{
      const personId = req.params.id;
      const response=await person.findByIdAndDelete(personId); 
        if(!response){
            console.log('person not found');
            return res.status(404).json({error: 'Person not found'}); // Send a 404 Not Found response if the person is not found
        }
      console.log('data is deleted');
      res.status(200).json({message: 'Person deleted successfully'}); // Send a success response back to the client
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router; // Export the router to be used in other files