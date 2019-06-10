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

module.exports.getDataFromDatabase = getDataFromDatabase;
module.exports.getListingByID = getListingByID;
