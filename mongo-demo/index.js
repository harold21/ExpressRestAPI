const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log('DB created...'))
    .catch(err => console.error('Could not connect to mongoDb...', err));