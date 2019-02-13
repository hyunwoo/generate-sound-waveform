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
    stepMultiplier: 10, // Density of waveform [default : 4]
    backgroundColor: '#666', // image background color [default : '#fff']
    lineColor: '#fff', // image line color [default : '#666']
    globalAplha: 0.8, // draw line global alpha value [default : 0.6]
    padding: 60, // padding height [default : 8]
    lineWidth : 1 // draw line width [default : 0.5]
    centerLine: false, // center guide line [default : true]
    centerLineColor: '#fff', // center guild line color [default : '#fff']
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

- [audio-decode - npm](https://www.npmjs.com/package/audio-decode)
- [canvas - npm](https://www.npmjs.com/package/canvas)
