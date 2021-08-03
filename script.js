
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate, earthquakes,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width, resizeCanvas,
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */

let canvas;
let myMap;
let pixels1;
let pixels2;

class Earthquake {
    constructor(date, time, latitude, longitude, type, magnitude) {
      this.date = date;
      this.time = time;
      this.latitude = latitude;
      this.longitude = longitude;
      this.type = type;
      this.magnitude = magnitude;
    }
  }

  
const options = {
  lat: 40,
  lng: 5,
  zoom: 2,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');


function setup() {
  canvas = createCanvas(800, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  
  console.log(earthquakes[1]);
  
}

let testEarthquake1 = new Earthquake(0, 0, 40, 74, 0, 10);
let testEarthquake2 = new Earthquake(0, 0, 30, 35, 0, 20);
function draw(){
    clear();
  
    for (let i = 0; i < 1000; i++) {
      let pixels = myMap.latLngToPixel(earthquakes[i].Latitude, earthquakes[i].Longitude);
      colorMode(HSB);
      fill(100, 100, 100);
      ellipse(pixels.x, pixels.y, earthquakes[i].Magnitude * 2);
    }
}

