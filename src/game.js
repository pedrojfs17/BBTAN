import Player from "./player";
import InputHandler from "./input";
import Ball from "./ball";
import Block from "./block";
import { newLevel } from "./level";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.blocks = [];
    this.level = 0;
  }

  start() {
    this.player = new Player(this);
    this.ball = new Ball(this);

    this.level++;
    this.blocks = newLevel(this, this.level);
    /*for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        blocks.push(new Block(this, { x: 7 + 90 * i, y: 7 + 90 * j }, 1 + i));
      }
    }*/

    this.gameObjects = [this.player, this.ball, ...this.blocks];

    new InputHandler(this.player);
  }

  update(deltaTime) {
    /*this.player.update(deltaTime);
    this.ball.update(deltaTime);*/

    this.gameObjects.forEach(object => object.update(deltaTime));
  }

  draw(ctx) {
    /*this.player.draw(ctx);
    this.ball.draw(ctx);*/

    this.gameObjects.forEach(object => object.draw(ctx));
  }
}

/* 
  O jogo a cada jogada baixa todos os blocos uma casa, e cria novos blocos 
com números random dentro de um range, que vai aumentando consoante o nivel
em que o jogador se encontra. A cada jogada é incrementado um ao nivel, e
5 bolas ao jogador e em 5 o range das casas.

*/
