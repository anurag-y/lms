const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const User = require('./models/auth.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('views', path.join(__dirname, '../frontend', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend', 'public')));
const authRouter = require('./routes/signup'); // Import the signup router
const {requireAuth, loginRouter} = require('./routes/login');
app.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
  })
);
app.use('/auth', authRouter);
app.use('/auth', loginRouter)

const connectToDatabase = require('./config/database'); // Import the function
connectToDatabase();




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
  // Example logout route handler

  // Middleware to check authentication status
// Use the middleware for protected routes
app.get('/about', requireAuth, (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.render('about');
});


app.get('/logout', (req, res) => {
  req.session = null; // Clear the session data
  res.redirect('/'); // Redirect to a page (e.g., home) after logout
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


