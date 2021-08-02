// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */
// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
 *    keyCode, tripsCoordinates, preload, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width, resizeCanvas,
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */

let canvas;
let myMap;
let tripsCoordinates;
let allCoordinates = [];
let data;

let delta = 0; 
let coordinate = 0; 

let origin; 
let originVector;  
let destination; 
let destinationVector;

let taxiPosition;
let size;
let speed;
let color;

const options = {
  lat: 40,
  lng: 5,
  zoom: 2,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./assets/earthquake_data.geojson');
}

function setup() {
  canvas = createCanvas(800, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");
  
   tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
}


function draw(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 5, 5);
  }
}

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
