// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate, earthquakes,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width, resizeCanvas,
 *    UP_ARROW, DOWN_ARROW, textWrap, WORD, textSize, textFont, fontBold, loadFont, LEFT_ARROW, windowHeight, windowWidth, windowResized, RIGHT_ARROW, Mappa, loadJSON, clear, ellipse, createVector, createSlider
 */

let canvas;
let myMap;
let dateSlider;
let dateText;
let canvasWidth;
let canvasHeight;
let mode;

const options = {
  lat: 40,
  lng: 5,
  zoom: 2,
  style: "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
};
const mappa = new Mappa("Leaflet");

function setup() {
  mode = 0;
  canvas = createCanvas(windowWidth, windowHeight);
  canvasWidth = 800;
  canvasHeight = 600;

  textFont("Georgia");
  fontBold = loadFont("assets/Bold.ttf");

  // canvas = createCanvas(canvasWidth, canvasHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas, function() {
    // Logan: Trying out a resizing solution from https://github.com/cvalenzuela/Mappa/issues/31
    myMap.map.invalidateSize();
  });
  dateSlider = createSlider(1965, 2016, 1965, 1);
  dateSlider.position(10, windowHeight - 50);
  dateSlider.style("width", "300px");
}

function draw() {
  clear();
  /* this needs to be used to reset the position of the circles every
   *  frame, so it is updated when the tile map is moved/resized
   */
  if (mode == 0) {
    firstSlide();
  }
  if (mode == 1){
    secondSlide();
  }
  if (mode == 2) {
    colorMode(HSB);
    fill(0, 0, 100);
    textSize(20);
    text(`Year: ${dateSlider.value()}`, 10, windowHeight - 60);
    for (let i = 0; i < earthquakes.length; i++) {
      if (Number(earthquakes[i].Date.slice(-2)) === dateSlider.value() % 100) {
        // Options to support dynamic window resizing:
        //   A. Store initial width/height, and adjust pixel values based on the current and initial sizes
        //   B. Figure out how to properly tell mappa to resize the map
        let pixels = myMap.latLngToPixel(
          earthquakes[i].Latitude,
          earthquakes[i].Longitude
        );
        colorMode(HSB);
        let hue = 360 - ((1.75 * earthquakes[i].Magnitude * 36 + 200) % 360);
        fill(hue, 100, 100);
        ellipse(
          pixels.x,
          pixels.y,
          10 ** (earthquakes[i].Magnitude / 3.2) / 10
        );
        if (i == 0) {
          console.log(hue);
        }
      }
    }
  }
}

function windowResized() {
  text(`Year: ${dateSlider.value()}`, 10, windowHeight - 60);
  resizeCanvas(windowWidth, windowHeight);
  dateSlider.position(10, windowHeight - 50);

  // Logan: Trying out a resizing solution from https://github.com/cvalenzuela/Mappa/issues/31
  myMap.mappaDiv.style.width = windowWidth + "px";
  myMap.mappaDiv.style.height = windowHeight + "px";
}

function keyPressed() {
  if (keyCode === 13) {
    mode = 1;
  } else if (keyCode === 32) {
    mode = 2;
  }
}

function firstSlide() {
  colorMode;
  fill(255, 255, 255);
  textSize(60);
  text("Press Enter", windowWidth / 2 - 150, windowHeight / 2);
}

function secondSlide() {
  colorMode;
  fill(255, 255, 255);
  textSize(40);
  text("What is an earthquake?", windowWidth/14, windowHeight/10)
  textSize(25)
  // textWrap(WORD)
  text("--", windowWidth/14, window/12)
}
