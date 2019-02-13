# generate-sound-waveform

This package converts sound files such as wav and mp3 to waveform images in Nodejs environment.\

**The node gyp related installation may take a long time.**



## Supported sound formats:

- wav
- mp3
- ogg
- flac



## Output

![1250x250 padding:10px](https://hyunwoo.io/generate-sound-waveform/test.jpeg)
![1250x250 padding:60px](https://hyunwoo.io/generate-sound-waveform/test2.jpeg)
![1250x250 padding:60px](https://hyunwoo.io/generate-sound-waveform/test3.jpeg)




## Usage

```
const lib = require('generate-sound-waveform');
const fs = require('fs');
// generateSoundImage([SOUND FILE PATH], [WIDTH], [HEIGHT])
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



## API

### method :

**generateSoundImage(path, width, height, option?)**

| property | value  |                  desc |
| :------- | :----- | --------------------: |
| path     | string |       sound file path |
| width    | number |     export jpeg width |
| height   | number |    export jpeg height |
| option   | object | export image settings |




## Options

| property        | value   | default |
| :-------------- | :------ | ------: |
| padding         | number  |       8 |
| stepMultiplier  | number  |       4 |
| backgroundColor | string  |  '#fff' |
| lineColor       | number  |  '#666' |
| globalAplha     | number  |     0.6 |
| lineWidth       | number  |     0.5 |
| centerLine      | boolean |    true |
| centerLineColor | string  |  '#fff' |




## Development paradigm

- The package should be easy to use.
- The background color and color of the output jpeg file should be changed according to the user's options.


---


**The Sample Project is available in [GitHub - hyunwoo/generate-sound-waveform](https://github.com/hyunwoo/generate-sound-waveform) along with a sample sound file.**



_Thanks To_

- [audio-decode - npm](https://www.npmjs.com/package/audio-decode)
- [canvas - npm](https://www.npmjs.com/package/canvas)
