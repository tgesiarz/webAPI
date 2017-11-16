const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
app.listen(3000);
console.log("listening on port...");