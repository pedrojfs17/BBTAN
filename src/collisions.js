/*export function collisionDetection(ball, block) {
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
}*/

export function collisionDetection(ball, block) {
  let centerXBall = ball.position.x + ball.size / 2;
  let centerYBall = ball.position.y + ball.size / 2;
  let radius = ball.size / 2;
  let centerXBlock = block.position.x + block.size / 2;
  let centerYBlock = block.position.y + block.size / 2;

  var distXRight = Math.abs(centerXBall - centerXBlock - block.size / 2);
  var distXLeft = Math.abs(centerXBall - centerXBlock + block.size / 2);
  var distYUp = Math.abs(centerYBall - centerYBlock - block.size / 2);
  var distYDown = Math.abs(centerYBall - centerYBlock + block.size / 2);

  if (
    distXRight > block.size / 2 + radius &&
    distXLeft > block.size / 2 + radius
  ) {
    return false;
  }

  if (
    distYUp > block.size / 2 + radius &&
    distYDown > block.size / 2 + radius
  ) {
    return false;
  }

  if (distXRight <= block.size / 2) {
    return true;
  }
  if (distXLeft <= block.size / 2) {
    return true;
  }
  if (distYUp <= block.size / 2) {
    return true;
  }
  if (distYDown <= block.size / 2) {
    return true;
  }

  // also test for corner collisions
  var dx = distXRight - block.size / 2;
  var dy = distYUp - block.size / 2;
  return dx * dx + dy * dy <= radius * radius;
}

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
