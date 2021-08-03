
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
}

function draw(){
    clear(); 
    /* this needs to be used to reset the position of the circles every 
    *  frame, so it is updated when the tile map is moved/resized
    */
  
    for (let i = 0; i < 1000; i++) {
      if (Number(earthquakes[i].Date.slice(-2)) === 65) {
        let pixels = myMap.latLngToPixel(earthquakes[i].Latitude, earthquakes[i].Longitude);
        colorMode(HSB);
        fill(100, 100, 100);
        ellipse(pixels.x, pixels.y, (10 ** (earthquakes[i].Magnitude / 3.3)) / (10));
        console.log(earthquakes[i].Date.slice(-2));
      }
    }
}

