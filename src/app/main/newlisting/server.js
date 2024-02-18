const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Listing = require('./page.js');

const app = express();
const PORT = process.env.PORT || 5000;




// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// POST endpoint to add a new listing
app.post('/api/listings', async (req, res) => {
  const { title, price, description, imageURL, username } = req.body;

  try {
    const newListing = new Listing({
      title,
      price,
      description,
      imageURL,
      username
    });

    const savedListing = await newListing.save();
    res.json(savedListing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

