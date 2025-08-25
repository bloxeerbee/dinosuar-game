let dino = document.getElementById('dino');
let obstacle = document.getElementById('obstacle');
let gameArea = document.getElementById('gameArea');

let isJumping = false;
let score = 0;
let obstacleSpeed = 5;

function jump() {
  if (isJumping) return;

  isJumping = true;
  let jumpHeight = 0;
  let jumpInterval = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(() => {
        if (jumpHeight <= 0) {
          clearInterval(fallInterval);
          isJumping = false;
        } else {
          jumpHeight -= 5;
          dino.style.bottom = jumpHeight + 'px';
        }
      }, 20);
    } else {
      jumpHeight += 5;
      dino.style.bottom = jumpHeight + 'px';
    }
  }, 20);
}

function moveObstacle() {
  let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
  if (obstaclePosition >= 600) {
    score++;
    obstacleSpeed += 0.5; // Increase speed with each pass
    obstacle.style.right = '0px';
  } else {
    obstacle.style.right = obstaclePosition + obstacleSpeed + 'px';
  }

  // Collision detection
  let dinoPosition = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
  if (obstaclePosition > 50 && obstaclePosition < 100 && dinoPosition <= 50) {
    alert('Game Over! Score: ' + score);
    location.reload();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    jump();
  }
});

setInterval(moveObstacle, 20);
