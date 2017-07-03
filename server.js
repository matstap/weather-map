'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));

app.listen(PORT, ()=> console.log(`You are on port: ${PORT}. Enjoy the storm.`));
