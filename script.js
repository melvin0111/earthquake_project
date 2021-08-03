
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate, earthquakes,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width, resizeCanvas,
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, windowHeight, windowWidth, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */

let canvas;
let myMap;
let pixels1;
let pixels2;
let earthquakesGlobal = earthquakes
  
const options = {
  lat: 40,
  lng: 5,
  zoom: 2,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  
  console.log(earthquakes[0].Date);
  
}

function draw(){
    clear();
  
    for (let i = 0; i < 1000; i++) {
      let pixels = myMap.latLngToPixel(earthquakes[i].Latitude, earthquakes[i].Longitude);
      colorMode(HSB);
      fill(100, 100, 100);
      ellipse(pixels.x, pixels.y, earthquakes[i].Magnitude * 2);
    }
}

