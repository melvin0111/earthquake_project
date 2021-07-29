// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width
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
  lat: 40.73447,
  lng: -74.00232,
  zoom: 13,
  style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
}
const mappa = new Mappa('Leaflet');

function preload() {
  data = loadJSON('./data/taxiday1.geojson');
}

function setup() {
  canvas = createCanvas(600, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas); 
  tripsCoordinates = myMap.geoJSON(data, "LineString");

  tripsCoordinates.forEach(function (trip) {
    trip.forEach(function (coordinate) {
        allCoordinates.push(coordinate)
      })
  });
  
  size = createSlider(5, 20);
  size.position(10, 610);
  size.style('width', '300px');
  
  speed = createSlider(0.2, 1, 0.2, 0.01);
  speed.position(10, 650);
  speed.style('width', '300px');
  
  color = createSlider(0, 250);
  color.position(10, 690);
  color.style('width', '300px');
  
  //myMap.onChange(drawPoints);
}


function draw(){
  clear();
  if(delta < 1){
    delta += speed.value(); 
  } else {
    delta = 0; 
    coordinate ++; 
  }

  origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]); 
  originVector = createVector(origin.x, origin.y); 
  destination = myMap.latLngToPixel(allCoordinates[coordinate + 1][1], allCoordinates[coordinate + 1][0]);  
  destinationVector = createVector(destination.x, destination.y);

  taxiPosition = originVector.lerp(destinationVector, delta);
  colorMode(HSB)
  fill(color.value(),100,100);
  ellipse(taxiPosition.x, taxiPosition.y, size.value(), size.value());
}

function drawPoints(){
  clear() 
  noStroke();
  fill(255);
  for(let i = 0; i < allCoordinates.length; i++){
    let pos = myMap.latLngToPixel(allCoordinates[i][1], allCoordinates[i][0])
    ellipse(pos.x, pos.y, 15, 15);
  }
}