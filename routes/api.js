const express = require('express');
const conn = require('./../data_access/db');
const router = express.Router();

// get list of cars
router.get('/cars', (req, res, next) => {
  
  var select = "SELECT ID, Item FROM TODO";
  if(req.query.name) select += " WHERE Item LIKE '%" + req.query.name + "%'";

  conn.executeSQL(select, (err, rowCount, rows ) => {
    if(err) return next(err) 
      else res.send(rows);
  });
});

// add a new car to the database
router.post('/cars', (req, res, next) => {
  conn.executeSQL("INSERT INTO TODO VALUES('" + req.body.item + "')", (err, rowCount, rows) => {
    if(err) return next(err) 
      else res.send("success...");
  });
});

// update existing car in the database
router.put('/cars/:id', (req, res, next) => {
  conn.executeSQL("UPDATE TODO SET ITEM = '" + req.body.item + "' WHERE ID = " + req.params.id, (err, rowCount, rows) => {
    if(err) return next(err) 
      else res.send("success...");
  });
});

// delete car from the database
router.delete('/cars/:id', (req, res, next) => {
  conn.executeSQL("DELETE TODO WHERE ID = " + req.params.id, (err, rowCount, rows) => {
    if(err) return next(err) 
      else res.send("item ID = " + req.params.id + " has been deleted :)" );
  });
});

module.exports = router;
