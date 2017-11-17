const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//server static files
app.use(express.static('public'));

// body parser middleware
app.use(bodyParser.json());

// router middleware
app.use('/api', require('./routes/api'));

// error handling middleware
app.use((err, req, res, next) => {
    res.status(442).send({err: err.message});
});

app.listen(3000);
console.log("listening on port...");