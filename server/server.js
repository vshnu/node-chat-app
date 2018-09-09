const path = require('path');
const express = require('express');


var publicPath = path.join(__dirname, '../public');
var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log('Server is up ');
})
