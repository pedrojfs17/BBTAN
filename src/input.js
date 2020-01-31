export default class InputHandler {
  constructor(player) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        /*case 37: // LEFT ARROW
          player.moveLeft();
          break;*/
        case 65: // A
          player.moveLeft();
          break;

        /*case 39: // RIGHT ARROW
          player.moveRight();
          break;*/
        case 68: // D
          player.moveRight();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        /*case 37: // LEFT ARROW
          player.stop();
          break;*/
        case 65: // A
          if (player.speed < 0) player.stop();
          break;

        /*case 39: // RIGHT ARROW
          player.stop();
          break;*/
        case 68: // D
          if (player.speed > 0) player.stop();
          break;

        default:
          break;
      }
    });
  }
}
