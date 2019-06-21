const express = require('express');
const path = require('path');
const cors = require('cors');
// const morgan = require('morgan');
const { getDataFromDatabase, getListingByID, getListingByIDCached } = require('../databaseMongo/helper.js');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');
const PORT = process.env.PORT || 3000;

const app = express();

// app.use(morgan('dev'));
app.use(cors());
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

// app.get('/api/:id', (req, res) => {
//   getListingByIDCached(redis, req.params.id, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send([results]);
//     }
//   });
// });


app.get('/loaderio-e90baeaf1b349dc0b7678c75a10d7e3f', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-e90baeaf1b349dc0b7678c75a10d7e3f'));
});

app.listen(PORT, () => {
  console.log(`Connected to Express server on Port: ${PORT}`);
});
