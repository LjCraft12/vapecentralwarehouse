// Dependencies
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('./config/database');

// Connect to database on the config/database folder
mongoose.connect(config.database);

// On database connection
mongoose.connection.on('connected', () => {
   console.log('Connected to database ' + config.database);
});

// On database connection error
mongoose.connection.on('error', (err) => {
   console.log('Database error ' + err);
});

// Setting express() to const app
const app        = express();

const users      = require('./routes/users');

// Setting up port for the server
const port       = process.env.PORT || 3000;

// Cors middleware
app.use(cors());

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// index route
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/users', users);

// Listening for the port
app.listen(port, () => {
    console.log('Server connected on port: ' + port );
});
