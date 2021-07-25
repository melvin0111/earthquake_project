// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, colorMode, createCanvas, fill, frameRate, keyCode,
 *    height, loop, noLoop, noStroke, random, rect, round, stroke, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let backgroundColor;
let snake;
let apple;
let score;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  frameRate(12);

  backgroundColor = 95;
  snake = new Snake();
  apple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);

  snake.moveSelf();
  snake.showSelf();
  snake.checkCollideTail();
  snake.checkCollideApple();

  apple.showSelf();

  displayScore();
}

function displayScore() {
  fill(0);
  text(`Score: ${score}`, 10, 20);
}

function restartGame() {
  score = 0;
  snake = new Snake();
  apple = new Apple();
  loop();
}

function gameOver() {
  fill(0);
  text("GAME OVER", 10, 40);
  noLoop();
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
  }

  showSelf() {
    stroke(240, 100, 100);
    rect(this.x, this.y, this.size, this.size);
    noStroke();
  }

  checkCollideApple() {}

  checkCollideTail() {}

  extendTail() {}
}

class TailSegment {
  constructor() {}

  showSelf() {}
}

class Apple {
  constructor() {}

  showSelf() {}
}

function keyPressed() {
  console.log("Key pressed: ", keyCode);
  if (keyCode === UP_ARROW && snake.direction != "S") {
    snake.direction = "N";
  } else if (keyCode === DOWN_ARROW && snake.direction != "N") {
    snake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && snake.direction != "W") {
    snake.direction = "E";
  } else if (keyCode === LEFT_ARROW && snake.direction != "E") {
    snake.direction = "W";
  } else {
    console.log("Error: invalid key");
  }
}
