'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

app.get('*', function(req, res){
  res.sendFile('index.html', {root: './public/'})
});

app.listen(PORT, ()=> console.log(`You are on port: ${PORT}. Enjoy the storm.`));
