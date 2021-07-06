const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/', express.static('src/public'));
app.use('/api', routes);

module.exports = app