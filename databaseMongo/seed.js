const { images } = require('./image.js');
const { Gallery } = require('./mongo.js');

async function seed() {
  console.time('💾10M Data Seed Time');
  const oneImage = image => image[Math.floor(images.length * Math.random())];
  function seedData(n) {
    if (n === 100) {
      console.timeEnd('💾10M Data Seed Time');
      return;
    }
    let imageArr = [];
    for (let i = 1; i <= 100000; i++) {
      imageArr.push({
        _id: n * 100000 + i,
        exterior: oneImage(images),
        img1: oneImage(images),
        img2: oneImage(images),
        img3: oneImage(images),
        img4: oneImage(images),
        img5: oneImage(images),
        img6: oneImage(images),
        img7: oneImage(images),
        img8: oneImage(images),
        img9: oneImage(images),
        img10: oneImage(images),
        img11: oneImage(images)
      });
    }
    Gallery.collection.insertMany(imageArr, function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        seedData(n + 1);
      }
    });
  }
  seedData(0);
}

seed();
