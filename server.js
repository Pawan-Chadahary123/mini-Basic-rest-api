const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
require('dotenv').config(); // Import and configure dotenv

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection using dotenv
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the User Profiles API');
});

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
