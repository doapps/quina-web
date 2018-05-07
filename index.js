const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();


app.use(session({
  secret: 'doapps',
  resave: true,
  saveUninitialized: false,
}));


app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));


app.listen(8000);
