export function collisionDetection(ball, block) {
  // Ball boundries
  let bottomBall = ball.position.y + ball.size;
  let topBall = ball.position.y;
  let leftBall = ball.position.x;
  let rightBall = ball.position.x + ball.size;

  // Block boundries
  let bottomBlock = block.position.y + block.size;
  let topBlock = block.position.y;
  let leftBlock = block.position.x;
  let rightBlock = block.position.x + block.size;

  if (rightBall >= leftBlock && leftBall <= rightBlock) {
    return 1; // Horizontal Collision
  } else if (bottomBall >= topBlock && topBall <= bottomBlock) {
    return -1; // Vertical Collision
  } else {
    return 0; // No Collision
  }
}
