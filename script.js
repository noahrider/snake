
// Initialize canvas and variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const widthInBlocks = canvasWidth / blockSize;
const heightInBlocks = canvasHeight / blockSize;
let score = 0;

// Initialize the snake
let snake = {
  segments: [[6, 4], [5, 4], [4, 4]],
  direction: "right",
};

// Initialize the apple
let apple = {
  position: generateRandomPosition(),
};

// Set up keyboard event listener to change direction of the snake
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: // left arrow key
      if (snake.direction !== "right") {
        snake.direction = "left";
      }
      break;
    case 38: // up arrow key
      if (snake.direction !== "down") {
        snake.direction = "up";
      }
      break;
    case 39: // right arrow key
      if (snake.direction !== "left") {
        snake.direction = "right";
      }
      break;
    case 40: // down arrow key
      if (snake.direction !== "up") {
        snake.direction = "down";
      }
      break;
  }
});

// Function to generate a random position for the apple
function generateRandomPosition() {
  return [Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)];
}

// Function to check if the snake has collided with a wall or itself
function checkCollision(head) {
  if (head[0] < 0 || head[0] >= widthInBlocks || head[1] < 0 || head[1] >= heightInBlocks) {
    return true; // hit a wall
  }
  for (let i = 1; i < snake.segments.length; i++) {
    if (head[0] === snake.segments[i][0] && head[1] === snake.segments[i][1]) {
      return true; // hit itself
    }
  }
  return false;
}

// Function to update the game
function update() {
  // Move the snake
  let head = [...snake.segments[0]];
  switch (snake.direction) {
    case "left":
      head[0] -= 1;
      break;
    case "up":
      head[1] -= 1;
      break;
    case "right":
      head[0] += 1;
      break;
    case "down":
      head[1] += 1;
      break;
  }
  snake.segments.unshift(head);
  if (head[0] === apple.position[0] && head[1] === apple.position[1]) {
    // Snake has eaten an apple
    score += 1;
    apple.position = generateRandomPosition();
  } else {
    // Snake has not eaten an apple
    snake.segments.pop();
  }

  // Check for collision
  if (checkCollision(head)) {
    // Game over
    alert("Game over! Your score was " + score);
    reset();
  }

  // Draw the game
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "red";
  ctx.fillRect(apple.position[0] * blockSize, apple.position[1] * blockSize, blockSize, blockSize);
  snake.segments.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment[0] * blockSize, segment[1] * blockSize, blockSize, blockSize);
  });

  function drawBlock(x, y) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
  }
  

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + score, 10, 10);

  // Call the update function again after a delay
  setTimeout(update, 100);
}

// Function to reset the game
function reset() {
  score = 0;
  snake = {
    segments: [[6, 4], [5, 4], [4, 4]],
    direction: "right",
  };
  apple = {
    position: generateRandomPosition(),
  };
}

// Call the update function to start the game
update();
