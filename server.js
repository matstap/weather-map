'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

var proxyWeather = function(request, response) {
  (requestProxy({
    url: 'https://api.openweathermap.org/data/2.5' + request.params[0]
  }))(request, response);
};

app.get('/weather*', proxyWeather);```

app.get('*', function(req, res){
  res.sendFile('index.html', {root: './public/'})
});

app.listen(PORT, ()=> console.log(`You are on port: ${PORT}. Enjoy the storm.`));
