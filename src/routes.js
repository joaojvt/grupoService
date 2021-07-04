const express = require('express');
const routes = express.Router()
const path = require('path');

const TesteController = require('./controller/TesteController')

const teste =  new TesteController()

routes.get('/', (req, res) =>  {
  res.sendFile(path.join(__dirname + '/public/index.html'))
});

routes.get('/base', teste.index)

module.exports = routes