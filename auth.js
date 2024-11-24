const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// Create a User using : POST "/api/auth/createuser". Dosen't require login

    
router.post('/createuser', [
    
    body('name','Enter a valid name').isLength({ min: 3 }),  
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid name').isLength({ min: 5 }),
    
], async (req, res) => {
    // If there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email })
    if (user) {
       return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    //     .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    //     res.json({error:"Please enter a unique value of email", message:err.message})
    // })
    res.json(user) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
}
})

module.exports = router