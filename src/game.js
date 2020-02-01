import Player from "./player";
import InputHandler from "./input";
import Ball from "./ball";
import Block from "./block";
import { newLevel } from "./level";

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
    this.ball = new Ball(this);
  }

  start() {
    this.gamestate = GAMESTATE.PLAYERMOVE;

    this.player = new Player(this);

    this.level++;
    this.blocks = newLevel(this, this.level);

    this.gameObjects = [this.player, ...this.blocks];

    new InputHandler(this.player, this);
  }

  shoot() {
    if (this.gamestate === GAMESTATE.PLAYERMOVE) {
      this.gamestate = GAMESTATE.RUNNING;
      this.ball = new Ball(this);
      this.gameObjects.push(this.ball);
    }
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSE) return;

    if (this.gamestate === GAMESTATE.PLAYERMOVE) this.player.update(deltaTime);

    if (this.gamestate === GAMESTATE.RUNNING) {
      this.gameObjects.forEach(object => object.update(deltaTime));
      this.gameObjects = this.gameObjects.filter(object => !object.destroyed);
    }
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSE) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSE;
    }
  }
}

/* 
  O jogo a cada jogada baixa todos os blocos uma casa, e cria novos blocos 
com números random dentro de um range, que vai aumentando consoante o nivel
em que o jogador se encontra. A cada jogada é incrementado um ao nivel, e
5 bolas ao jogador e em 5 o range das casas.

*/
