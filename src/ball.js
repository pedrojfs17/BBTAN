import { collisionDetection } from "./collisions";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.speed = { x: 10, y: -6 };
    this.position = { x: this.gameWidth / 2, y: this.gameHeight - 20 };
    this.size = 16;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // Check collisions with the left and right of the canvas
    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth) {
      this.speed.x = -this.speed.x;
    }

    // Check collisions with the top of the canvas
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // Check if the ball is on the bottom of the canvas and load next level
    if (this.position.y + this.size > this.gameHeight) {
      this.game.start();
    }
  }
}
