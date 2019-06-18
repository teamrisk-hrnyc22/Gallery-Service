const { Gallery } = require('./mongo.js');

const getDataFromDatabase = callback => {
  Gallery.find()
    .then(data => {
      callback(null, [data]);
    })
    .catch(err => {
      console.log(err);
    });
};

const getListingByID = (id, callback) => {
  Gallery.findOne({ _id: id })
    .then(data => {
      callback(null, [data]);
    })
    .catch(err => {
      console.log(err);
    });
};

const getListingByIDCached = (redis, id, callback) => {
  redis.get(id, (err, reply) => {
    if (err) {
      console.log(err);
    } else if (reply) { // id exists in cache
      console.log(`ID: ${id} exists in Redis Cache!`)
      callback(null, JSON.parse(reply));
    } else {
      Gallery.findOne({ _id: id }, (err, doc) => {
        if (err || !doc) {
          console.log(err);
        } else {  // id found in database, save to cache and return to client
          console.log(`ID: ${id} saved in Redis Cache!`)
          redis.set(id, JSON.stringify(doc), function() {
            callback(null, doc);
          });
        }
      });
    }
  });
};

module.exports.getDataFromDatabase = getDataFromDatabase;
module.exports.getListingByID = getListingByID;
module.exports.getListingByIDCached = getListingByIDCached;
