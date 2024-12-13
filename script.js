let snake;
let food;
let resolution = 20;
let rows, cols;
let gameStarted = false;

function startGame() {
  gameStarted = true;
  snake = new Snake();
  frameRate(10);
  spawnFood();
}

function setup() {
  const gameDiv = document.getElementById("game");
  const canvas = createCanvas(400, 400);
  canvas.parent(gameDiv);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
}

function draw() {
  if (!gameStarted) return;

  background(0);
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    spawnFood();
  }

  fill(255, 0, 0);
  rect(food.x * resolution, food.y * resolution, resolution, resolution);

  if (snake.isDead()) {
    gameStarted = false;
    alert("Game Over! Your score: " + snake.total);
  }
}

function spawnFood() {
  food = createVector(floor(random(cols)), floor(random(rows)));
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.ySpeed !== 1) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.ySpeed !== -1) {
    snake.setDirection(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xSpeed !== 1) {
    snake.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xSpeed !== -1) {
    snake.setDirection(1, 0);
  }
}

class Snake {
  constructor() {
    this.body = [createVector(floor(cols / 2), floor(rows / 2))];
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 0;
  }

  setDirection(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  update() {
    const head = this.body[this.body.length - 1].copy();
    head.x += this.xSpeed;
    head.y += this.ySpeed;
    this.body.push(head);

    if (this.body.length > this.total + 1) {
      this.body.shift();
    }
  }

  show() {
    fill(0, 255, 0);
    for (let segment of this.body) {
      rect(segment.x * resolution, segment.y * resolution, resolution, resolution);
    }
  }

  eat(pos) {
    const head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.total++;
      return true;
    }
    return false;
  }

  isDead() {
    const head = this.body[this.body.length - 1];
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      return true;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      const part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }

    return false;
  }
}
