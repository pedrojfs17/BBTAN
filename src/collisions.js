export function detectCollision(ball, block) {
  let previousBallPos = {
    x: ball.position.x - ball.speed.x,
    y: ball.position.y - ball.speed.y
  };

  let previousInsideX =
    previousBallPos.x + ball.size >= block.position.x &&
    previousBallPos.x <= block.position.x + block.size;

  let previousInsideY =
    previousBallPos.y + ball.size >= block.position.y &&
    previousBallPos.y <= block.position.y + block.size;

  let insideX =
    ball.position.x + ball.size >= block.position.x &&
    ball.position.x <= block.position.x + block.size;

  let insideY =
    ball.position.y + ball.size >= block.position.y &&
    ball.position.y <= block.position.y + block.size;

  if (insideX && insideY) {
    if (!previousInsideX && previousInsideY) return 1; // Horizontal collision -> change x speed

    if (previousInsideX && !previousInsideY) return -1; // Vertical collision -> change y speed

    if (!previousInsideX && !previousInsideY) return 2; // Corner Collision
  } else {
    return 0; // No collision
  }
}
