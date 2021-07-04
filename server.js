const express = require('express');
const port = 3000;
const server = express()

require('dotenv').config()

const app = require('./src/app')

server.use(express.json())
server.use(app)

server.listen(port, () => {
  console.log(`Serer running on localhost ${port}`);
})

