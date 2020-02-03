export default class InputHandler {
  constructor(player, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37: // LEFT ARROW
          player.rotateLeft();
          break;
        case 65: // A
          player.moveLeft();
          break;

        case 39: // RIGHT ARROW
          player.rotateRight();
          break;
        case 68: // D
          player.moveRight();
          break;

        case 38:
          game.higherSpeed();
          break;
        case 40:
          game.lowerSpeed();
          break;

        case 27: // ESC
          game.togglePause();
          break;

        case 32: // Space-Bar
          game.shoot();
          break;

        case 82: // R
          game.toggleStart();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37: // LEFT ARROW
          if (player.angleSpeed < 0) player.stopRotation();
          break;
        case 65: // A
          if (player.speed < 0) player.stop();
          break;

        case 39: // RIGHT ARROW
          if (player.angleSpeed > 0) player.stopRotation();
          break;
        case 68: // D
          if (player.speed > 0) player.stop();
          break;

        case 38:
          if (game.ballSpeedIncrease > 0) game.stopChangeSpeed();
          break;

        case 40:
          if (game.ballSpeedIncrease < 0) game.stopChangeSpeed();
          break;

        default:
          break;
      }
    });
  }
}
