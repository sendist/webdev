class preloadGame extends Phaser.Scene{
  constructor(){
    super("preloadGame");
  }

  preload() {
    this.load.spritesheet("cat", "assets/character/cat.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("porcupine", "assets/character/porcupine.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image("farBG", "assets/background/FarBG.png");
    this.load.image("farBotBG", "assets/background/FarBottomBG.png");
    this.load.image("farTopBG", "assets/background/FarTopBG.png");
    this.load.image("treesBG", "assets/background/TreesBG.png");
    this.load.image("treesFG", "assets/background/TreesFG.png");

    this.load.bitmapFont("pixel", "assets/font/font.png", "assets/font/font.xml");
  }
  
  create(){
    this.scene.start("playGame");

    this.anims.create({
      key: "cat_walk",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 32,
        end: 39
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "cat_idle1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 8,
        end: 15
      }),
      frameRate: 8,
      repeat: 5
    });

    this.anims.create({
      key: "cat_idle2",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 248,
        end: 251
      }),

      frames: [
        { key: "cat", frame: 168 },
        { key: "cat", frame: 169 },
        { key: "cat", frame: 170 },
        { key: "cat", frame: 171 },
        { key: "cat", frame: 248 },
        { key: "cat", frame: 249 },
        { key: "cat", frame: 250 },
        { key: "cat", frame: 251 },
      ],
      frameRate: 8,
      repeat: 2
    });

    this.anims.create({
      key: "cat_idle3",
      frames: [
        { key: "cat", frame: 168 },
        { key: "cat", frame: 169 },
        { key: "cat", frame: 170 },
        { key: "cat", frame: 171 },
        { key: "cat", frame: 256 },
        { key: "cat", frame: 257 },
        { key: "cat", frame: 258 },
        { key: "cat", frame: 259 },
        { key: "cat", frame: 256 },
        { key: "cat", frame: 257 },
        { key: "cat", frame: 258 },
        { key: "cat", frame: 259 },
        { key: "cat", frame: 256 },
        { key: "cat", frame: 257 },
        { key: "cat", frame: 258 },
        { key: "cat", frame: 259 },
        { key: "cat", frame: 256 },
        { key: "cat", frame: 257 },
        { key: "cat", frame: 258 },
        { key: "cat", frame: 259 },
        { key: "cat", frame: 176 },
        { key: "cat", frame: 177 },
        { key: "cat", frame: 178 },
        { key: "cat", frame: 179 },
      ],
        
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "cat_idle4",
      frames : [
        { key: "cat", frame: 352 },
        { key: "cat", frame: 353 },
        { key: "cat", frame: 354 },
        { key: "cat", frame: 355 },
        { key: "cat", frame: 360 },
        { key: "cat", frame: 361 },
        { key: "cat", frame: 362 },
        { key: "cat", frame: 363 },
      ],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "cat_glance",
      frames: [
        { key: "cat", frame: 200 },
        { key: "cat", frame: 201 },
        { key: "cat", frame: 202 },
        { key: "cat", frame: 203 },
        { key: "cat", frame: 208 },
        { key: "cat", frame: 209 },
        { key: "cat", frame: 210 },
        { key: "cat", frame: 211 },
        { key: "cat", frame: 216 },
        { key: "cat", frame: 217 },
        { key: "cat", frame: 218 },
        { key: "cat", frame: 219 },
        { key: "cat", frame: 120 },
        { key: "cat", frame: 121 },
        { key: "cat", frame: 122 },
        { key: "cat", frame: 123 },
      ],
      frameRate: 8,
      repeat: 0
    })
    this.anims.create({
      key: "cat_respawn",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 296,
        end: 303
      }),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "cat_run1",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 48,
        end: 51,
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: "cat_jump",
      frames: [
        { key: "cat", frame: 144 },
        { key: "cat", frame: 152 },
        { key: "cat", frame: 153 },
        { key: "cat", frame: 154 },
        { key: "cat", frame: 155 },
        { key: "cat", frame: 160 },
        { key: "cat", frame: 161 },
        { key: "cat", frame: 162 },
        { key: "cat", frame: 163 },
      ],
      frameRate: 16,
      repeat: 0
    })

    this.anims.create({
      key: "cat_death",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 280,
        end: 291
        }),
      frameRate: 8,
      repeat: 0
    });

    // porcupine animations
    this.anims.create({
      key: "porcupine_walk",
      frames: this.anims.generateFrameNumbers("porcupine", {
        start: 0,
        end: 5
      }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "porcupine_attack",
      frames: [
        { key: "porcupine", frame: 10 },
        { key: "porcupine", frame: 11 },
        { key: "porcupine", frame: 13 },
      ],

      frameRate: 24,
      repeat: 0
    });

  }
}