const express = require('express')
const {Server: HttpServer} = require('http')
const cors = require('cors')

const indexRouter = require('./src/routes/index');

const errorHandler = require('./src/middlewares/errorHandler');

require('dotenv').config()
 

const app = express();

const http = new HttpServer(app);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

app.use('/api', indexRouter);

app.use(errorHandler);

module.exports = http;