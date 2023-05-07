require('dotenv').config();

const User = require('./models/User');
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/cors');
const connectDB = require('./config/database');
const credentials = require('./middleware/credentials');
const errorHandlerMiddleware = require('./middleware/error_handler');
const authenticationMiddleware = require('./middleware/authentication');

const app = express();
const PORT = 3500;

connectDB();

// Allow Credentials
app.use(credentials);

// CORS
app.use(cors(corsOptions));

// middlewares
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Middleware for authentication
app.use(authenticationMiddleware);

// application x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Default error handler
app.use(errorHandlerMiddleware);

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/team', require('./routes/api/teams'));

app.all('*', (req, res) => {
    if (req.accepts('json')) {
        res.status(404).json({'error': '404 Not Found'});
    }
    else {
        res.type('text').send('404 Not Found');
    }
})

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`);
    });
})