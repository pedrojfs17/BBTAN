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

  let goingLeft = ball.speed.x < 0;
  let goingUp = ball.speed.y < 0;

  //
  // to do
  //
  if (
    rightBall >= leftBlock &&
    leftBall <= rightBlock &&
    bottomBall >= topBlock &&
    topBall <= bottomBlock
  ) {
    if (
      rightBall - ball.speed.x <= leftBlock ||
      leftBall - ball.speed.x >= rightBlock
    )
      return -1;
    // Horizontal
    else return 1; // Vertical Collision
  } else {
    return 0; // No Collision
  }
}
