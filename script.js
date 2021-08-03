// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
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

function preload() {
  // data = loadJSON('assets/earthquake_data.geojson');
}

function setup() {
  canvas = createCanvas(800, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  
  // let tripsCoordinates = myMap.geoJSON(data, "LineString");
}

let testEarthquake1 = new Earthquake(0, 0, 40, 74, 0, 10);
let testEarthquake2 = new Earthquake(0, 0, 30, 35, 0, 20);
function draw(){
    clear();
    pixels1 = myMap.latLngToPixel(testEarthquake1.latitude, testEarthquake1.longitude);
    colorMode(HSB)
    fill(100,100,100);
    ellipse(pixels1.x, pixels1.y, 10);

    pixels2 = myMap.latLngToPixel(testEarthquake2.latitude, testEarthquake2.longitude);
    colorMode(HSB)
    fill(100,100,100);
    ellipse(pixels2.x, pixels2.y, 10);
}

