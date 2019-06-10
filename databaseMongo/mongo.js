const mongoose = require('mongoose');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '27017';

mongoose.connect(`mongodb://${host}:${port}/zillow`, { useNewUrlParser: true });

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

const gallery = mongoose.Schema(
  {
    _id: Number,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
    img7: String,
    img8: String,
    img9: String,
    img10: String,
    img11: String,
    img12: String
  },
  { _id: false }
);

const Gallery = mongoose.model('Gallery', gallery, 'gallery');

module.exports.db = db;
module.exports.Gallery = Gallery;
