const decode = require('audio-decode');
const max = require('lodash/max');
const fs = require('fs');
const { createCanvas } = require('canvas');
require('vorbis.js');
require('flac.js');

function loadSoundData(soundPath) {
  return new Promise((resolve, reject) => {
    const buf = fs.readFileSync(soundPath);
    decode(buf)
      .then(resolve)
      .catch(reject);
  });
}

function createWaveformImage(data, width, height, options) {
  try {
    if (options === undefined) options = {};
    const padding = options.padding ? options.padding : 8;
    const waveHeight = height / 2 - padding;
    const stepMultiplier = options.stepMultiplier ? options.stepMultiplier : 4;
    const lineColor = options.lineColor ? options.lineColor : '#666';
    const globalAplha = options.globalAlpha ? options.globalAlpha : 0.6;
    const lineWidth = options.lineWidth ? options.lineWidth : 0.5;
    const useCenterLine = options.centerLine ? options.centerLine : true;
    const centerLineColor = options.centerLineColor
      ? options.centerLineColor
      : '#fff';
    const backgroundColor = options.backgroundColor
      ? options.backgroundColor
      : '#fff';

    const step = Math.floor(
      data._channelData[0].length / (width * stepMultiplier - 2),
    );
    const results = [];
    let maxValue = 0;
    for (let i = 0; i < width * stepMultiplier - 2; i++) {
      const value = Math.abs(data._channelData[0][i * step]);
      results.push(value);
      if (value > maxValue) maxValue = value;
    }

    const interpolation = waveHeight / maxValue;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.moveTo(0, height / 2);
    ctx.globalAlpha = globalAplha;
    ctx.lineWidth = lineWidth;
    results.forEach((val, i) => {
      const x = i / stepMultiplier + 1;
      const y =
        val * interpolation * (i % 2 === 0 ? 1 : -1) + waveHeight + padding;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (useCenterLine) {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = centerLineColor;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }

    const stream = canvas.createJPEGStream();
    return stream;
  } catch (e) {
    reject(e);
  }
}

exports.loadSoundData = loadSoundData;
exports.createWaveformImage = createWaveformImage;
exports.generateSoundImage = async (path, width, height, options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await loadSoundData(path);
      const stream = createWaveformImage(data, width, height, options);
      resolve(stream);
    } catch (e) {
      reject(e);
    }
  });
};
