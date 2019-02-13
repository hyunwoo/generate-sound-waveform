const lib = require('./index');
const fs = require('fs');

lib
  .generateSoundImage('./samples/sample2.wav', 1250, 200, {
    stepMultiplier: 10,
    backgroundColor: '#fff',
    lineColor: '#39c',
    globalAplha: 0.8,
    padding: 10,
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
