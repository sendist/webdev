let config = {
  width: screen.width,
  height: 540,
  backgroundColor: 0x000000,
  scene: [preloadGame, playGame],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }

};

let game = new Phaser.Game(config);