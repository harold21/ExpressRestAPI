const Joi = require('joi');
const express = require('express');
const app = new express();

app.use(express.json());

const movies = [
    { id: 1, name: 'Beach 1', gender: 'Action', duration: 120 },
    { id: 1, name: 'Advenger 1', gender: 'Fiction', duration: 160 },
    { id: 1, name: 'Jhon Wick', gender: 'Action', duration: 150 },
    { id: 1, name: 'The Lion King', gender: 'Animation', duration: 140 },
]

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/api/movies/', (req, res) => {

})


function validateMovie(body) {
    const schema = {
        name: Joi.string().required(),
        gender: Joi.strict.require(),
        duration: Joi.number.require()
    };

    return Joi.validate(body, schema);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${ port }`));