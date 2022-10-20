"use strict";

const grid = document.querySelector(".grid");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

const userStart = [230, 20];
let userCurrentPosition = userStart;

const ballStart = [270, 40];
const ballCurrentPosition = ballStart;
let xAxisDirection = 2;
let yAxisDirection = 2;

let gameActive = true;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

//Create user
const user = document.createElement("div");
grid.appendChild(user);
user.classList.add("block");
user.style.backgroundColor = "blueviolet";
user.style.left = userCurrentPosition[0] + "px";
user.style.bottom = userCurrentPosition[1] + "px";

//Create ball
const ball = document.createElement("div");
grid.appendChild(ball);
ball.classList.add("ball");
drawBall();

//Draw ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
//Draw user
function drawUser() {
  user.style.left = userCurrentPosition[0] + "px";
  user.style.bottom = userCurrentPosition[1] + "px";
}

//Move User
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (userCurrentPosition[0] + blockWidth < boardWidth) {
        userCurrentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xAxisDirection;
  ballCurrentPosition[1] += yAxisDirection;

  drawBall();
  if (ballCurrentPosition[1] == 0) {
    alert("You lost");
    gameActive = false;
  }
  changeDirection();
  //   console.log(ballCurrentPosition[0]);
}

// Change direction
function changeDirection() {
  //walls
  if (ballCurrentPosition[0] + ballDiameter >= boardWidth) {
    xAxisDirection = -2;
  }
  if (ballCurrentPosition[1] + ballDiameter >= boardHeight) {
    yAxisDirection = -2;
  }
  if (ballCurrentPosition[0] <= 0) {
    xAxisDirection = 2;
  }
  if (ballCurrentPosition[1] <= 0) {
    yAxisDirection = 2;
  }
  //blocks
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter >= blocks[i].bottomLeft[1]
    ) {
      yAxisDirection = -2;

      const blocksArray = document.querySelectorAll(".block");
      blocksArray[i].classList.remove("block");

      blocks.splice(i, 1);
    }
    drawBall();
  }
  //player
  if (
    ballCurrentPosition[0] > userCurrentPosition[0] &&
    ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
    ballCurrentPosition[1] <= userCurrentPosition[1] + blockHeight
  ) {
    yAxisDirection = 2;
  }
  drawBall();
}

if (gameActive) {
  setInterval(moveBall, 10);
}
//
