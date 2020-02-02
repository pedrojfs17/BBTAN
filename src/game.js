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
    this.ball = new Ball(this);
    new InputHandler(this.player, this);
    this.gamestate = GAMESTATE.PLAYERMOVE;
  }

  start() {
    this.gamestate = GAMESTATE.PLAYERMOVE;

    this.level++;
    this.blocks = newLevel(this, this.level);

    this.gameObjects = [this.player, ...this.blocks];
  }

  shoot() {
    if (this.gamestate === GAMESTATE.PLAYERMOVE) {
      this.gamestate = GAMESTATE.RUNNING;
      this.ball = new Ball(this);
      this.gameObjects = [this.ball, ...this.gameObjects];
    }
  }

  gameOver() {
    this.gamestate = GAMESTATE.GAMEOVER;
    this.level = 0;
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSE) return;

    if (this.gamestate === GAMESTATE.PLAYERMOVE) {
      this.player.update(deltaTime);
      this.gameObjects.forEach(object => object.update(deltaTime));
      this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
    }

    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gameObjects.forEach(object => object.update(deltaTime));
      this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
    }
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));

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
}
