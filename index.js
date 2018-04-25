const express = require('express');
let path = require('path');
const app = express();
const routes = require('./routes/routess');

//routes
app.set("view engine","pug");
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(8080);
