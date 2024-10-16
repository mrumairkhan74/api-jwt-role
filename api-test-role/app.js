const express = require('express');
const data = require('./connection/apiConnection')  // mongoose connection 
const routes = require('./routes/apiRoute'); // router 
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes)


module.exports = app;