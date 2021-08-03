
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate, earthquakes,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width, resizeCanvas,
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, windowHeight, windowWidth, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */

let canvas;
let myMap;
let dateSlider;
let dateText;
  
const options = {
  lat: 40,
  lng: 5,
  zoom: 2,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');


function setup() {
  // canvas = createCanvas(windowWidth, windowHeight);
  canvas = createCanvas(800, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  dateSlider = createSlider(1965, 2016, 1965, 1);
  dateSlider.position(10, 650);
  dateSlider.style('width', '300px');
  dateText = text('', 620, 10)
}

function draw(){
  clear(); 
  /* this needs to be used to reset the position of the circles every 
  *  frame, so it is updated when the tile map is moved/resized
  */

  text(dateSlider.value(), 0, 600);
  for (let i = 0; i < earthquakes.length; i++) {
    if (Number(earthquakes[i].Date.slice(-2)) === 65) {
      let pixels = myMap.latLngToPixel(earthquakes[i].Latitude, earthquakes[i].Longitude);
      colorMode(HSB);
      fill(100, 100, 100);
      ellipse(pixels.x, pixels.y, (10 ** (earthquakes[i].Magnitude / 3.3)) / (10));
    }
  }
  console.log(dateSlider.value());
}

