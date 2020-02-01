import { detectCollision } from "./collisions";

export default class Block {
  constructor(game, position, life) {
    this.game = game;

    this.position = position;
    this.textOffset = { x: 38, y: 48 };
    this.size = 75;
    this.life = life;

    this.destroyed = false;
  }

  update(deltaTime) {
    /*
    if (collisionDetection(this.game.ball, this)) {
      let centerXBall = this.game.ball.position.x + this.game.ball.size / 2;
      let centerYBall = this.game.ball.position.y + this.game.ball.size / 2;
      let radius = this.game.ball.size / 2;
      //let centerXBlock = this.position.x + this.size / 2;
      //let centerYBlock = this.position.y + this.size / 2;

      // Horizontal
      if (centerXBall + this.game.ball.speed.x + radius > this.position.x)
        this.game.ball.speed.x = -this.game.ball.speed.x;

      // Vertical
      if (
        centerYBall + this.game.ball.speed.y + radius >
        this.position.y + this.size
      )
        this.game.ball.speed.y = -this.game.ball.speed.y;
      
      this.life = Number(this.life) - 1;
    }*/

    /*
    if (collisionDetection(this.game.ball, this) < 0) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.life = Number(this.life) - 1;
    } else if (collisionDetection(this.game.ball, this) > 0) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.life = Number(this.life) - 1;
    }*/

    let col = detectCollision(this.game.ball, this);

    if (col === -1) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.life = Number(this.life) - 1;
    } else if (col === 1) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.life = Number(this.life) - 1;
    } else if (col === 2) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.life = Number(this.life) - 1;
    }

    if (Number(this.life) === 0 && !this.destroyed) {
      this.destroyed = true;
    }
  }

  draw(ctx) {
    ctx.strokeStyle = "#ff0000";
    ctx.fillStyle = "#ff0000";
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.lineWidth = 5;

    ctx.fillText(
      this.life,
      this.position.x + this.textOffset.x,
      this.position.y + this.textOffset.y
    );
    ctx.strokeRect(this.position.x, this.position.y, this.size, this.size);
  }
}

/*

ctx.strokeStyle = "#ff0000";
ctx.fillStyle = "#ff0000";
ctx.font = "30px Comic Sans MS";
ctx.textAlign = "center";
ctx.lineWidth = 5;

// x = 45 + 90 * i
// y = 55 + 90 * i
// ctx.fillText(block.life, x, y);

let blockSize = 75;

// x = 7 + 90 * i
// y = 7 + 90 * j
// ctx.strokeRect(x, y, blockSize, blockSize)

let blockPositions = [
  [7, 7],
  [97, 7],
  [187, 7],
  [277, 7],
  [367, 7],
  [457, 7],
  [547, 7],
  [7, 97],
  [97, 97],
  [187, 97],
  [277, 97],
  [367, 97],
  [457, 97],
  [547, 97],
  [7, 187],
  [97, 187],
  [187, 187],
  [277, 187],
  [367, 187],
  [457, 187],
  [547, 187],
  [7, 277],
  [97, 277],
  [187, 277],
  [277, 277],
  [367, 277],
  [457, 277],
  [547, 277],
  [7, 367],
  [97, 367],
  [187, 367],
  [277, 367],
  [367, 367],
  [457, 367],
  [547, 367],
  [7, 457],
  [97, 457],
  [187, 457],
  [277, 457],
  [367, 457],
  [457, 457],
  [547, 457],
  [7, 547],
  [97, 547],
  [187, 547],
  [277, 547],
  [367, 547],
  [457, 547],
  [547, 547]
];

*/
