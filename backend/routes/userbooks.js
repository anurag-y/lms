// routes/book.js
const express = require('express');
const router = express.Router();
const Book = require('../models/books'); // Import the Book schema

router.get('/:bookID', async (req, res) => {
  try {
      
      const uniqueCode = req.params.bookID;
      const book= await Book.findOne({ uniqueCode });
      res.status(200).json(book);
  } catch (error) {
      res.status(500).json({ error: 'An error occured' });
  }
});


router.get('/', async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).json(books);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});




module.exports = router;