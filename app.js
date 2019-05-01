const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const routes = require('./routes/index');


const app = express();
const cons = require('consolidate');
require('./public/js/database');

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

module.exports = app;