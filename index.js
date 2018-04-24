const express = require('express');
let path = require('path');
const app = express();

app.set("view engine","pug");
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render("login");
  console.log("Página de inicio...")
})

app.listen(8080);
