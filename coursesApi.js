const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config'); // Very useful package for manage configuration folder
const morgan = require('morgan'); // This package is used for logging request and responses
const helmet = require('helmet'); // For Protect your express app setting various HTTP headers
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // For set static access to a folder modules f.e. /.public
app.use(helmet());

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

const courses = [
    { id: 1, name: 'curse1' },
    { id: 2, name: 'curse2' },
    { id: 3, name: 'curse3' },
    { id: 4, name: 'curse4' },
];

app.get('/', (req, res) => {
    res.send('Hello world!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id was not found!');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id was not found!');

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given id was not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(body) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(body, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on port ${port}`));