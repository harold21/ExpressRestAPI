const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });  // Here we use pug index template to render the entire DOM
});

module.exports = router;