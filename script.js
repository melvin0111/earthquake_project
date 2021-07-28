// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, collideRectRect, color, colorMode, createCanvas, fill, frameRate,
 *    keyCode, height, loop, noLoop, noStroke, random, rect, round, stroke, text, width
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
 */

let backgroundColor;
let snake;
let apple;
let score;
let curColor;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  frameRate(12);

  backgroundColor = 95;
  snake = new Snake();
  apple = new Apple();
  score = 0;
  curColor = 0;
}

function draw() {
  background(backgroundColor);

  apple.showSelf();

  snake.moveSelf();
  snake.showSelf();
  snake.checkCollideTail();
  snake.checkCollideApple();

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
    let ts = new TailSegment(this.x, this.y);
    this.tail = [ts];
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

    if (this.x >= 400) {
      this.x = 20;
    }
    if (this.y >= 400) {
      this.y = 20;
    }
    if (this.x <= 0) {
      this.x = 400;
    }
    if (this.y <= 0) {
      this.y = 400;
    }
    
    let newTS = new TailSegment(this.x, this.y);
    this.tail.unshift(newTS);
    this.tail.pop();
  }

  showSelf() {
    fill(0);
    stroke(240, 100, 100);
    rect(this.x, this.y, this.size, this.size);
    noStroke();

    for (let ts of this.tail) {
      ts.showSelf();
    }
  }

  checkCollideApple() {
    let hit = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      apple.x,
      apple.y,
      apple.size,
      apple.size
    );
    if (hit) {
      score += 1;
      apple = new Apple();
      this.extendTail();
    }
  }

  checkCollideTail() {
    for (let i = 1; i < this.tail.length; i++) {
      let ts = this.tail[i];
      let hit = collideRectRect(
        ts.x,
        ts.y,
        ts.size,
        ts.size,
        this.x,
        this.y,
        this.size,
        this.size
      );
      if (hit) {
        gameOver();
      }
    }
  }

  extendTail() {
    // [ts1, ts2, ts3]: length = 3
    let placeholderTS = new TailSegment(null, null);
    this.tail.push(placeholderTS);
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = curColor;
    curColor = (curColor + 10) % 360;
  }

  showSelf() {
    fill(0);
    fill(curColor, 180, 180);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    let size = 10;
    this.x = random(width - size);
    this.y = random(height - size);
    this.size = size;
  }

  showSelf() {
    fill(color("red"));
    rect(this.x, this.y, this.size, this.size);
  }
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
  } else if (keyCode === 32) {
    // Space key
    restartGame();
  } else {
    console.log("Error: invalid key");
  }
}
