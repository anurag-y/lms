const express = require('express');
const User = require('../models/auth');
const router = express.Router();

router.get('/:email', async (req, res) => {
    try {
      const email = req.params.email;
      console.log('email is ' + email);

      const user = await User.findOne({ email });
      console.log('user is ' + user);
  
      if (!user) {
        console.log('user not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
        console.log('error occurred');
      res.status(500).json({ error: 'An error occurred' });

    }
  });
  module.exports = router;