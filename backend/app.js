const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const User = require('./models/auth.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('views', path.join(__dirname, '../frontend', 'views'));
app.set('view engine', 'ejs');
//link ejs to css in public folder 
app.use(express.static(path.join(__dirname, '../frontend', 'public')));
const authRouter = require('./routes/signup'); // Import the signup router
const loginRouter = require('./routes/login');
app.use('/auth', authRouter);
app.use('/auth', loginRouter)

const connectToDatabase = require('./config/database'); // Import the function
connectToDatabase();


// Connect to MongoDB


// Basic route for testing server
app.get('/', (req, res) => {
  res.render('index'); // Render the index template
});
app.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup template
  });
  
  // Log-in route
  app.get('/login', (req, res) => {
    res.render('login'); // Render the login template
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


