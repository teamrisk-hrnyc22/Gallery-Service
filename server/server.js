const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
// const { getDataFromDatabase, getListingByID } = require('../database/utils.js');]
const { getDataFromDatabase, getListingByID } = require('../databaseMongo/helper.js');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/:number', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

app.get('/api', (req, res) => {
  getDataFromDatabase((err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/:id', (req, res) => {
  getListingByID(req.params.id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get('/loaderio-d36124ebe9adf0b368663c1ae8f15d1f', (req, res) => {
  res.send('../loaderio-d36124ebe9adf0b368663c1ae8f15d1f.txt');
});

app.listen(PORT, () => {
  console.log(`Connected to Express server on Port: ${PORT}`);
});
