const lib = require('./index');
const fs = require('fs');

lib
  .generateSoundImage('./samples/sample1.ogg', 1250, 200, {
    stepMultiplier: 10,
    backgroundColor: '#666',
    lineColor: '#fff',
    globalAplha: 0.8,
    padding: 60,
    centerLine: false,
    centerLineColor: '#fff',
  })
  .then((stream) => {
    const out = fs.createWriteStream('./test.jpeg');
    stream.pipe(out);
    out.on('finish', () => console.log('complete'));
  })
  .catch((err) => {
    console.log(err);
  });
