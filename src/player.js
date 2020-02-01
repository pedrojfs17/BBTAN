export default class Player {
  constructor(game) {
    this.image = document.getElementById("img_cannon");

    this.width = this.image.width / 6;
    this.height = this.image.height / 6;

    this.gameWidth = game.gameWidth;

    this.position = {
      x: game.gameWidth / 2,
      y: game.gameHeight - 40
    };
    this.angle = 0;

    this.maxSpeed = 7;
    this.speed = 0;
    this.maxAngleSpeed = (2 * Math.PI) / 180;
    this.angleSpeed = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.width / -2,
      this.height / -2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  update(deltaTime) {
    this.position.x += this.speed;
    this.angle += this.angleSpeed;

    if (this.position.x - this.width < 0) this.position.x = this.width;

    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;

    if (this.angle < -Math.PI / 2 + 0.25) this.angle = -Math.PI / 2 + 0.25;

    if (this.angle > Math.PI / 2 - 0.25) this.angle = Math.PI / 2 - 0.25;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  rotateLeft() {
    this.angleSpeed = -this.maxAngleSpeed;
  }

  rotateRight() {
    this.angleSpeed = this.maxAngleSpeed;
  }

  stop() {
    this.speed = 0;
  }

  stopRotation() {
    this.angleSpeed = 0;
  }
}
