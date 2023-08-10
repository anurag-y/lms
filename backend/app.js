const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const User = require('./models/auth.js');
const Admin = require('./models/admin.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('views', path.join(__dirname, '../frontend', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend', 'public')));
const authRouter = require('./routes/signup'); // Import the signup router
const {requireAuth, loginRouter} = require('./routes/login');
const newAdminRouter = require('./routes/adm_signup'); // Import the signup router
const { router: admLoginRouter, requireAdminAuth } = require('./routes/adm_login');
const bookRouter = require('./routes/books');

app.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
  })
);
app.use('/auth', admLoginRouter);
app.use('/auth', authRouter);
app.use('/auth', loginRouter);
app.use('/auth', newAdminRouter);
app.use('/books', bookRouter);

const connectToDatabase = require('./config/database'); // Import the function
connectToDatabase();

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/signup', (req, res) => {
    res.render('signup');
  });
  

  app.get('/login', (req, res) => {
    req.session.adminAuthenticated = false; //if user logins admin should be logged out
    res.render('login'); 

  });
  app.get('/logout', (req, res) => {
    req.session.authenticated = false; 
    res.redirect('/'); 
  });
  
  app.get('/adm_login', (req, res) => {
    req.session.authenticated = false; //if admin logins user should be logged out
    res.render('adm_login'); // Render the login template
  });
 app.get('/adm_signup', (req, res) => {
    res.render('adm_signup'); // Render the login template
  });
  

  app.get('/admin_dashboard', requireAdminAuth, (req, res) => {
    // This route is protected and can only be accessed by authenticated admin
    res.render('admin_dashboard');
  });
  app.get('/user_dashboard', requireAuth, (req, res) => {
    // This route is protected and can only be accessed by authenticated admin
    res.render('user_dashboard');
  });


  // Middleware to check authentication status
// Use the middleware for protected routes
app.get('/about', (req, res) => {
  // This route is protected and can only be accessed by authenticated users
  res.render('about');
});
app.get('/logout', (req, res) => {
  req.session = null; // Clear the session data
  res.redirect('/'); // Redirect to a page (e.g., home) after logout
});
app.get('/catalog', (req, res) => {
  res.render('catalog');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


