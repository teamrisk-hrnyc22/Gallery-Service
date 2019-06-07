const { Pool } = require('pg');
const { images } = require('./image.js');

const pool = new Pool({
  host: 'localhost',
  user: 'ohbrian',
  database: 'postgres',
  password: '',
  port: 5432
});

(async function() {
  console.time();
  const client = await pool.connect();

  await client
    .query(`DROP TABLE IF EXISTS gallery;`)
    .then(() => {
      console.log('DROP TABLE gallery success!');
    })
    .catch(err => {
      console.log(err);
    });

  await client
    .query(
      `CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL NOT NULL,
    img1 TEXT NOT NULL,
    img2 TEXT NOT NULL,
    img3 TEXT NOT NULL,
    img4 TEXT NOT NULL,
    img5 TEXT NOT NULL,
    img6 TEXT NOT NULL,
    img7 TEXT NOT NULL,
    img8 TEXT NOT NULL,
    img9 TEXT NOT NULL,
    img10 TEXT NOT NULL,
    img11 TEXT NOT NULL,
    img12 TEXT NOT NULL,
    PRIMARY KEY (id)
  );`
    )
    .then(() => {
      console.log('CREATE TABLE gallery success!');
    })
    .catch(err => {
      console.log(err);
    });
// COPY {gallery [(img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12)] | (query)}
  const image = arr => arr[Math.floor(images.length * Math.random())];
  for (let i = 0; i < 10000000; i++) {
    await client
      .query(
        `INSERT INTO gallery (img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
        [
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images),
          image(images)
        ]
      )
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  client.release();
  console.timeEnd();
})();

module.exports.pool = pool;

// pool.on('connect', () => {
//   console.log('connected to postgres database');
// });
// pool.end()
