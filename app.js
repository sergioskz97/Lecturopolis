const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const cons = require('consolidate');

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

module.exports = app;