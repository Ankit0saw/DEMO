const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItems'); // Import the menuItems model

router.post('/', async function (req, res) {
    try{
      const data=req.body;
      const newMenu = new menuItem(data);
      const response=await newMenu.save(); 
      console.log('data is saved');
      res.status(200).json({message: 'menuItem created successfully', data: response});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })
router.get('/', async function (req, res) {
    try{
      const data=await menuItem.find();
      console.log('data is fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router; // Export the router to be used in other files