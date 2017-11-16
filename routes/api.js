const express = require('express');
const conn = require('./../data_access/db');
const router = express.Router();

// get list of cars
router.get('/cars', (req, res) => {
  conn.executeSQL("SELECT ID, Item FROM TODO", (err, rowCount, rows ) => {
    res.send(rows);
  });
});

// add a new car to the database
router.post('/cars', (req, res) => {
  console.log(req.body);
  res.send({type: 'POST'});
});

// update existing car in the database
router.put('/cars/:id', (req, res) => {
  res.send({id: req.params.id});
});

// delete car from the database
router.delete('/cars/:id', (req, res) => {
  res.send({type: 'DELETE'});
});

module.exports = router;
