import Block from "./block";

export function newLevel(game, level) {
  let blocks = [];
  let positions = [0, 1, 2, 3, 4, 5, 6];

  // Spawn random number of blocks between 1 and 7
  let randomNumber = Math.floor(Math.random() * 7) + 1;

  for (let i = 0; i < randomNumber; i++) {
    let randomPosition = Math.floor(Math.random() * positions.length) + 1;

    blocks.push(
      new Block(
        game,
        { x: 7 + 90 * positions[randomPosition], y: 7 },
        level * 7
      )
    );

    positions.splice(randomPosition, 1);
  }

  let gameBlocks = game.blocks;

  gameBlocks.forEach(element => (element.position.y += 90));

  return [...blocks, ...gameBlocks];
}
