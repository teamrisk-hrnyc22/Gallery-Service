const { Gallery } = require('./mongo.js');

const getDataFromDatabase = (callback) => {
  console.time()
  Gallery.find()
  .then((data) => {
    callback(null, data)
  })
  .then(console.timeEnd())
  .catch(err => {
    console.log(err);
  })
};

const getListingByID = (id, callback) => {
  Gallery.findOne({_id: id})
  .then((data) => {
    callback(null, data)
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports.getDataFromDatabase = getDataFromDatabase;
module.exports.getListingByID = getListingByID;


