import Player from "./player.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { newLevel } from "./level.js";

const GAMESTATE = {
  RUNNING: 0,
  PLAYERMOVE: 1,
  GAMEOVER: 2,
  PAUSE: 3,
  MENU: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.blocks = [];
    this.level = 0;
    this.player = new Player(this);

    this.gameBalls = [];
    this.activeBalls = 0;

    this.ballSpeed = 10;
    this.ballSpeedIncrease = 0;
    this.maxBallSpeed = 20;
    this.minBallSpeed = 7;

    new InputHandler(this.player, this);
    this.gamestate = GAMESTATE.PLAYERMOVE;

    this.frames = 0;
  }

  start() {
    this.gamestate = GAMESTATE.PLAYERMOVE;

    this.level++;
    this.blocks = newLevel(this, this.level);
    this.gameBalls = [];
    this.activeBalls = 0;

    this.gameObjects = [this.player, ...this.blocks];
  }

  shoot() {
    if (this.gamestate === GAMESTATE.PLAYERMOVE) {
      this.gamestate = GAMESTATE.RUNNING;
      this.gameBalls.push(new Ball(this));
      this.activeBalls++;
      this.frames = 0;
      this.gameObjects = [...this.gameBalls, ...this.gameObjects];
    }
  }

  gameOver() {
    this.gamestate = GAMESTATE.GAMEOVER;
    this.level = 0;
  }

  update(deltaTime) {
    this.frames++;

    if (this.gamestate === GAMESTATE.PAUSE) return;

    if (this.gamestate === GAMESTATE.PLAYERMOVE) {
      this.player.update(deltaTime);
      this.blocks = this.blocks.filter(object => !object.destroyed);
      this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
      this.gameObjects.forEach(object => object.update(deltaTime));
      this.ballSpeed += this.ballSpeedIncrease;
      if (this.ballSpeed >= this.maxBallSpeed)
        this.ballSpeed = this.maxBallSpeed;
      if (this.ballSpeed <= this.minBallSpeed)
        this.ballSpeed = this.minBallSpeed;
    }

    if (this.gamestate === GAMESTATE.RUNNING) {
      if (
        this.activeBalls < Math.round((this.level + 1) / 2) &&
        this.frames % 10 === 0
      ) {
        this.gameBalls.push(new Ball(this));
        this.activeBalls++;
      }
      this.blocks = this.blocks.filter(object => !object.destroyed);
      this.gameObjects = [...this.gameBalls, this.player, ...this.blocks];
      this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
      this.gameObjects.forEach(object => object.update(deltaTime));
    }
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));

    if (
      this.gamestate !== GAMESTATE.GAMEOVER ||
      this.gamestate !== GAMESTATE.MENU
    ) {
      ctx.beginPath();
      ctx.moveTo(0, 637);
      ctx.lineTo(630, 637);
      ctx.strokeStyle = "rgb(255,0,0,0.2)";
      ctx.stroke();

      ctx.font = "25px Comic Sans MS";
      ctx.fillStyle = "rgb(0,0,0,0.5)";
      ctx.textAlign = "left";
      ctx.fillText(
        "Balls: " + Math.round((this.level + 1) / 2),
        10,
        this.gameHeight - 130
      );
      ctx.textAlign = "right";
      ctx.fillText(
        "Level: " + this.level,
        this.gameWidth - 10,
        this.gameHeight - 130
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "#000000";
      ctx.fill();

      ctx.font = "80px Comic Sans MS";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 - 10);
      ctx.font = "25px Comic Sans MS";
      ctx.fillText(
        "Press 'r' to Restart",
        this.gameWidth / 2,
        this.gameHeight / 2 + 50
      );
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSE) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSE;
    }
  }

  toggleStart() {
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      this.gamestate = GAMESTATE.PLAYERMOVE;
      this.blocks = [];
      this.start();
    }
  }

  higherSpeed() {
    this.ballSpeedIncrease = 0.5;
  }

  lowerSpeed() {
    this.ballSpeedIncrease = -0.5;
  }

  stopChangeSpeed() {
    this.ballSpeedIncrease = 0;
  }
}
