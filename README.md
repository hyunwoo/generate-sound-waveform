# genearte-sound-waveform

This package converts sound files such as wav and mp3 to waveform images in Nodejs environment.

## Supported sound formats:

- wav
- mp3
- ogg
- flac

## Usage

```
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
```

## Development paradigm

- The package should be easy to use.
- The background color and color of the output jpeg file should be changed according to the user's options.

**The Sample Project is available in [GitHub - hyunwoo/genearte-sound-waveform](https://github.com/hyunwoo/genearte-sound-waveform) along with a sample sound file.**

_Thanks To_
[audio-decode - npm](https://www.npmjs.com/package/audio-decode)
[canvas - npm](https://www.npmjs.com/package/canvas)
