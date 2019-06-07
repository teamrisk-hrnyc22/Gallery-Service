const images = () => {
  let results = [];
  for (let i = 1; i <= 1000; i++) {
    results.push(`https://loremflickr.com/320/240?lock=${i}`);
  }
  return results
}

module.exports.images = images();