class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }


  create() {
    this.farBG = this.add.tileSprite(0, 0, game.config.width, game.config.height, "farBG").setOrigin(0, 0).setScrollFactor(0);
    this.farBotBG = this.add.tileSprite(0,0, game.config.width, game.config.height, "farBotBG").setOrigin(0, 0).setScrollFactor(0);
    this.farTopBG = this.add.tileSprite(0,0, game.config.width, game.config.height, "farTopBG").setOrigin(0, 0).setScrollFactor(0);
    this.treesBG = this.add.tileSprite(0,0, game.config.width, game.config.height, "treesBG").setOrigin(0, 0).setScrollFactor(0);
    this.treesFG = this.add.tileSprite(0,0, game.config.width, game.config.height, "treesFG").setOrigin(0, 0).setScrollFactor(0);

    this.cat = this.physics.add.sprite(200, 370, "cat");
    this.cat.setScale(7);

		this.cat.body.setCircle(8, 10, 18);

    this.porcupine = this.physics.add.sprite(game.config.width/2 + 50, 440, "porcupine");
    this.porcupine.flipX = true;
    this.porcupine.setScale(3);

		this.porcupine.body.setCircle(6, 10, 20);

    this.porcupine2 = this.physics.add.sprite(game.config.width + game.config.width/2, 440, "porcupine");
    this.porcupine2.flipX = true;
    this.porcupine2.setScale(3);
		this.porcupine2.body.setCircle(6, 10, 20);

    this.porcupine3 = this.physics.add.sprite(game.config.width + game.config.width/2, 440, "porcupine");
    this.porcupine3.flipX = true;
    this.porcupine3.setScale(3);
		this.porcupine3.body.setCircle(6, 10, 20);

    this.porcupineAttack = this.add.sprite(200, 455, "porcupine");
    this.porcupineAttack.flipX = true;
    this.porcupineAttack.setScale(3);
		this.porcupineAttack.visible = false;


    // this.myCam = this.cameras.main;
    // this.myCam.setBounds(0, 0, game.config.width * 10, game.config.height);
    // this.myCam.startFollow(this.cat);

    this.highScore = 0;
    this.score = 0;
    this.moveEnemies = false;

    this.cat.play("cat_idle");
    this.porcupine.play("porcupine_walk");
    this.porcupine2.play("porcupine_walk");
    this.porcupine3.play("porcupine_walk");

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.highScoreText = this.add.bitmapText(30, 0, "pixel", "HIGH SCORE: 0", 32);
    this.scoreText = this.add.bitmapText(30, 25, "pixel", "SCORE: 0", 32);

		this.physics.add.collider(this.cat, this.porcupineAttack);

		let graphics = this.add.graphics();

		this.physics.add.overlap(this.cat, this.porcupine, this.gameOver, null, this);
		this.play = false;
  }

  update() {
    if(this.cursorKeys.space.isDown && this.cat.anims.currentAnim.key != "cat_death") {
			this.play = true;
    }

		if(this.play) {
      if(this.cat.anims.currentAnim.key == "cat_idle") {
        this.cat.play("cat_run1");
      }
      this.parallaxBG();
      this.updateScore();
      this.moveEnemies = true;
		}
    
    this.detectJump();

    if(this.moveEnemies == true) {
      this.movePorcupine(this.porcupine, 10);
      this.movePorcupine(this.porcupine2, 10);
      this.movePorcupine(this.porcupine3, 10);
    }

		if(this.inRange(this.porcupine.x, 190, 210) || this.inRange(this.porcupine2.x, 190, 210) || this.inRange(this.porcupine3.x, 190, 210)) {
			this.porcupineAttack.visible = true;
			this.porcupineAttack.play("porcupine_attack");
		}



    // this.cat.on('animationupdate', (anim, frame, gameObject) => {
    // if (anim.key === 'cat_jump') {
    //     if (frame.index >= 1 && frame.index <= 4) {
    //         console.log(frame.index);
    //     } else if (frame.index >= 5 && frame.index <= 8) {
    //         console.log(frame.index);
    //     }
    // }
    // });

    // if(this.countFrame) {
    //   this.frame++;

    //   if(this.frame <= 8) {
    //     this.cat.y -= 30;
    //   } else if(this.frame > 8) {
    //     this.cat.y += 30;
    //   }
    //   console.log(this.frame);
    // }

    // if(this.frame >= 16) {
    //   this.countFrame = false;
    //   this.frame = 0;
    // }
  }

  detectJump() {
    if(this.cursorKeys.space.isDown && this.cat.anims.currentAnim.key != "cat_jump" && this.cat.anims.currentAnim.key != "cat_death") {
      this.cat.play("cat_jump");
			this.cat.body.setCircle(8, 10, 11);
      this.cat.once("animationcomplete", () => {
				this.cat.body.setCircle(8, 10, 18);
        this.cat.play("cat_run1");
      }
    );
    }
  }

  updateScore() {
    this.score += 0.03;
    this.scoreText.text = "SCORE: " + parseInt(this.score);
  }

  parallaxBG() {
    this.farBotBG.tilePositionX += 1;
    this.farTopBG.tilePositionX += 2;
    this.treesBG.tilePositionX += 3;
    this.treesFG.tilePositionX += 4;
  }

  movePorcupine(porcupine, speed) {
    porcupine.x -= speed;
    if(porcupine.x < -porcupine.displayWidth) {
      this.resetPorcupine(porcupine);
    }
  }

  resetPorcupine(porcupine) {
		let nearestPorcupine = Math.max(this.porcupine.x, this.porcupine2.x, this.porcupine3.x);
    porcupine.x = game.config.width + Phaser.Math.Between(300, 1000);
		if (porcupine.x - nearestPorcupine < game.config.width/4) {
			porcupine.x = nearestPorcupine + Phaser.Math.Between(game.config.width/4, game.config.width/3);
		}
    porcupine.alpha = 1;
  }

	stopPorcupine() {
		this.moveEnemies = false;
	}

	inRange(x, min, max) {
			return x >= min && x <= max;
	}

	gameOver() {
		if(this.cat.anims.currentAnim.key != "cat_death") {
			this.cat.play("cat_death");
		}
		this.highScore = Math.max(this.score, this.highScore);
		this.highScoreText.text = "HIGH SCORE: " + parseInt(this.highScore);
		this.stopPorcupine();
		this.play = false;
		this.cat.once("animationcomplete", () => {
			this.resetGame();
		});

	}

	resetGame() {
		this.score = 0;
		this.scoreText.text = "SCORE: 0";
		this.porcupine.x = game.config.width + Phaser.Math.Between(0, 400);
		this.porcupine2.x = game.config.width + Phaser.Math.Between(800, 1200);
		this.porcupine3.x = game.config.width + Phaser.Math.Between(1600, 2000);
		console.log(this.porcupine.x, this.porcupine2.x, this.porcupine3.x)
		this.cat.play("cat_idle");
	}
}