import { detectCollision } from "./collisions.js";

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
