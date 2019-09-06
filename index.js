const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config'); // Very useful package for manage configuration folder
const morgan = require('morgan'); // This package is used for logging request and responses
const helmet = require('helmet'); // For Protect your express app setting various HTTP headers
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For set static access to a folder modules f.e. /.public
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mailPass'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// DB work...
dbDebugger('Connecting to the Database...');

app.use(function(req, res, next) {
    console.log("Logging...");
    next();
});

app.use(logger);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on port ${port}`));