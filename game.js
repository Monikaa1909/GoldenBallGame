var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('stadium', 'assets/stadium.png');

  this.load.image('ground', 'assets/floor.png');
  this.load.image('ground2', 'assets/floor2.png');
  this.load.image('ground3', 'assets/floor3.png');

  this.load.image('bigground', 'assets/bigfloor.png');
  this.load.image('bigground2', 'assets/bigfloor2.png');

  this.load.image('floorleft', 'assets/floorleft.png');
  this.load.image('floorright', 'assets/floorright.png');
  this.load.image('floorleft2', 'assets/floorleft2.png');
  this.load.image('floorright2', 'assets/floorright2.png');
  this.load.image('floorright3', 'assets/floorright3.png');

  this.load.spritesheet('ball', 'assets/gol.png', {frameWidth: 24, frameHeight: 24});
  this.load.image('granat', 'assets/granat2.png');
  this.load.image('faul', 'assets/faul2.png');

  this.load.spritesheet('lewy', 'assets/lewy.png', {frameWidth: 96, frameHeight: 150});

  this.load.image('speedoshee', 'assets/oshee.png');
  this.load.image('jumposhee', 'assets/oshee.png');

  this.load.image('trophy', 'assets/trophy.png');
  this.load.image('chatbox', 'assets/m_chatbox.png');
//     this.load.image('tree', 'assets/Tree_2.png');
  this.load.spritesheet('fifa', 'assets/fifa.png', {frameWidth: 153.375, frameHeight: 150});
  this.load.spritesheet('messi', 'assets/messi.png', {frameWidth: 112, frameHeight: 150});
//     this.load.image('igloo', 'assets/Igloo.png');
//     this.load.image('tree2', 'assets/Tree_1.png');
//     this.load.image('snowman', 'assets/SnowMan.png');
  this.load.image('stone', 'assets/Stone.png');
//     this.load.image('crystal', 'assets/Crystal.png');
  this.load.image('sign1', 'assets/Sign_1.png');
  this.load.image('sign2', 'assets/Sign_2.png');
  this.load.image('present', 'assets/present.png');
  this.load.image('paper', 'assets/paper.png');
  this.load.image('scoreBackground', 'assets/score-background.png')
  this.load.image('scoreBackground2', 'assets/score-background2.png');
  this.load.image('livesBackground', 'assets/lives-background.png');
  this.load.image('lifecrystal', 'assets/lifecrystal.png');
  this.load.audio('terrariaday', 'assets/terrariaday.mp3');
}

var platforms;
var player;
var balls;
var score = 0;
var fifaSpeech = "";
var speedoshee;
var speed = 200;
var jumposhee;
var jump = -800; //800
var fifa;
var dialogue = 0;
var trophy;
var trophyState = 0;
var chatbox;
var visibleChat = 0;
var tree;
var hitbox;
var lastthrow = 0;
var lastfaul = 0;
var lasthit = 0;
var messi;
var hearts = 3;
var present;
var presentballs;
var boughtLife = 0;
var lifecrystal;
var sound;
var isFifaCollision = false;


function create() {

  window.scene = this;

  // DODANIE DŹWIĘKU (narazie strasznie irytuje więc wyłączyłam)
  // sound = this.sound.add('terrariaday', {loop: true});
  // sound.play();

  // TWORZENIE WSZYSTKICH PLATFORM:
  this.add.image(750, 380, 'stadium');
  platforms = this.physics.add.staticGroup();
  hitbox = this.physics.add.staticGroup();

  platforms.create(750, 738, 'bigground').setScale(0.5).refreshBody();
  hitbox.create(750, 728, 'bigground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  platforms.create(530, 600, 'ground').setScale(0.5).refreshBody();
  hitbox.create(530, 590, 'ground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(347.50, 600, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(347.5, 590, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(712.5, 600, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(712.5, 590, 'floorright2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  platforms.create(1480, 450, 'ground').setScale(0.5).refreshBody();
  hitbox.create(1480, 440, 'ground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(1297.50, 450, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(1297.5, 440, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(1662.5, 450, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(1662.5, 440, 'floorright2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  platforms.create(20, 450, 'ground').setScale(0.5).refreshBody();
  hitbox.create(20, 440, 'ground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(202.5, 450, 'floorright').setScale(0.5).refreshBody()
  hitbox.create(202.5, 440, 'floorright2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  platforms.create(1310, 150, 'ground').setScale(0.5).refreshBody();
  hitbox.create(1310, 140, 'ground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(1127.5, 150, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(1127.5, 140, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(1492.5, 150, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(1492.5, 140, 'floorright2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  platforms.create(500, 170, 'ground').setScale(0.5).refreshBody();
  hitbox.create(500, 160, 'ground2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(317.5, 170, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(317.5, 160, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(682.5, 170, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(682.5, 160, 'floorright2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);

  // platforms.create(1632, 370, 'ground').setScale(0.5).refreshBody();
  // hitbox.create(1632, 360, 'ground2').setScale(0.5).refreshBody();
  // hitbox.setVisible(true);
  // platforms.create(1450, 370, 'floorleft').setScale(0.5).refreshBody();
  // hitbox.create(1450, 360, 'floorleft2').setScale(0.5).refreshBody();
  // hitbox.setVisible(true);

  platforms.create(850, 400, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(850, 390, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(895, 400, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(895, 390, 'floorright3').setScale(0.5).refreshBody();
  hitbox.setVisible(true);


  platforms.create(30, 280, 'floorleft').setScale(0.5).refreshBody();
  hitbox.create(30, 270, 'floorleft2').setScale(0.5).refreshBody();
  hitbox.setVisible(true);
  platforms.create(75, 280, 'floorright').setScale(0.5).refreshBody();
  hitbox.create(75, 270, 'floorright3').setScale(0.5).refreshBody();
  hitbox.setVisible(true);


//     tree = this.physics.add.staticGroup();
//     tree.create(650, 215, 'tree').setScale(0.75);

//     this.add.image(180,385,'sign2').setScale(0.75);
//     this.add.image(1700,575,'tree2').setScale(0.9);

//     this.add.image(545,548,'stone').setScale(0.5);
//     this.add.image(545,548,'stone').setScale(0.5);


//     let crystal = this.add.image(650, 410, 'crystal').setScale(0.75);
//     let crystal2 = this.add.image(190, 510, 'crystal').setScale(0.75);
//     crystal.flipY=true;
//     crystal2.flipY=true;
//     crystal2.flipX=true;

//     let snowman = this.add.image(1200, 490, 'snowman').setScale(0.5)
//     snowman.flipX=true;


//     let igloo = this.add.image(100,650,'igloo').setScale(0.5);
//     igloo.flipX=true;

  // USTAWIENIE LEWANDOWSKIEGO - GŁÓWNEGO GRACZA
  player = this.physics.add.sprite(300, 600, 'lewy').setScale(0.8).refreshBody();

  // POSTAWIENIE SERDUSZKA DODAJĄCEGO ŻYCIE (które narazie nie działa)
  lifecrystal = this.physics.add.staticGroup();
  lifecrystal.create(1475, 700, 'lifecrystal').setScale(0.1).refreshBody();

  // USTAWIENIE ZAKRESU KAMER I OGÓLNYCH SZCZEGÓŁÓW ŚWIATA
  this.cameras.main.setBounds(0, 0, 1500, 760)
  this.cameras.main.startFollow(player, true);
  this.cameras.main.fadeIn(1000);
  this.physics.world.setBounds(0, -200, 1500, 1000)
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(1000)
  player.setDamping(true)
  player.setDrag(0.2)

  // WYWOŁANIE FUNKCJI RZUCAJĄCEGO MESSIEGO, WJEŹDŹAJĄCEGO Z FAULEM I DODAWANIA ŻYCIA (dodawanie życie nie działa, trza zrobić :( )
  this.physics.add.overlap(player, hitbox, messiThrow);
  this.physics.add.overlap(player, hitbox, faulGo);
  this.physics.add.overlap(player, lifecrystal, buyLife);

  // UŁOŻENIE DYMKU Z TEKSTEM LUDZI Z FIFY
  chatbox = this.physics.add.staticGroup();
  chatbox.create(225, 600, 'chatbox').setScale(0.065).refreshBody();
  chatbox.setVisible(false);

  // UŁOŻENIE 2 OSHEE I TROFEUM
  speedoshee = this.physics.add.staticGroup();
  speedoshee.create(1380, 420, 'speedoshee');

  trophy = this.physics.add.staticGroup();
  trophy.create(1475, 100, 'trophy').setScale(0.24).refreshBody();

  jumposhee = this.physics.add.staticGroup();
  jumposhee.create(50, 250, 'jumposhee');

  // USTAWIENIA GRAFIKI MESSIEGO, LUDZI Z FIFY I LEWANDOWSKIEGO
  this.anims.create({
    key: 'messi',
    frames: this.anims.generateFrameNumbers('messi', {start: 0, end: 9}),
    frameRate: 10,
    repeat: 0
  })

  this.anims.create({
    key: 'fifaidle',
    frames: this.anims.generateFrameNumbers('fifa', {start: 0, end: 7}),
    frameRate: 7,
    repeat: -1
  })


  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('lewy', {start: 1, end: 3}),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{key: 'lewy', frame: 0}],
    frameRate: 20
  });

  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();

  // USTAWIENIE PREZENTU Z DODATKOWYMI PIŁKAMI
  present = this.physics.add.staticGroup();
  present.create(540, 130, 'present').setScale(0.2).refreshBody();
  this.physics.add.overlap(player, present, collectPresent);

  // SPADAJĄCE PIPŁKI
  balls = this.physics.add.group({
    key: 'ball',
    repeat: 20,
    setXY: {x: 12, y: 0, stepX: 70}
  });

  balls.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.6));
    child.setVelocityX(Phaser.Math.FloatBetween(-100, 100));

    child.anims.play('ballanimation', true);

    child.setCollideWorldBounds(true);
    child.setDamping(true)
    child.setDrag(0.5)
  });

  // PIŁKI PO ZDOBYCIU PREZENTU
  presentballs = this.physics.add.group({
    key: 'ball',
    repeat: 19,
    setXY: {x: 700, y: 100, stepX: 0}
  });

  presentballs.children.iterate(function (child) {
    child.setVisible(false);
  });

  this.physics.add.collider(presentballs, hitbox);

  presentballs.setC
  this.physics.add.overlap(player, presentballs, collectBall);

  // USTAWIENIE LUDZI Z FIFY
  fifas = this.physics.add.group({
    key: 'fifa',
    setXY: {x: 60, y: 550, stepX: 100},
  })

  fifas.children.iterate(function (child) {
    child.anims.play('fifaidle', true);
    child.setScale(0.8).refreshBody();

  })

  // USTAWIENIE MESSIEGO
  messi = this.physics.add.group({
    key: 'messi',
    setXY: {x: 1300, y: 60, stepX: 70},
  })
  messi.children.iterate(function (child) {
    child.setScale(0.8).refreshBody();
  })

  this.physics.add.collider(messi, platforms)
  this.physics.add.collider(fifas, platforms)
  this.physics.add.overlap(player, fifas, fifaColision)
  this.physics.add.collider(balls, platforms);
  this.physics.add.collider(presentballs, platforms);
  this.physics.add.overlap(player, balls, collectBall);

  fifaSpeech = this.add.text(100, 583, '', {fontSize: '16px', fill: '#000000'});

  granats = this.physics.add.group();
  fauls = this.physics.add.group();

  this.physics.add.collider(granats, platforms);
  this.physics.add.overlap(player, granats, hitGranat);

  this.physics.add.collider(fauls, platforms);
  this.physics.add.overlap(player, fauls, hitFaul);

  this.physics.add.collider(speedoshee, platforms);
  this.physics.add.overlap(player, speedoshee, collectSpeedoshee);

  this.physics.add.collider(speedoshee, trophy);
  this.physics.add.overlap(player, trophy, collectTrophy);

  this.physics.add.collider(jumposhee, platforms);
  this.physics.add.overlap(player, jumposhee, collectJumposhee);

//     var granat = granats.create(600, 475, 'granat');
//     granat.setBounce(1);
//     granat.setCollideWorldBounds(true);
//     granat.setVelocity(0, 200);

//     var faul = fauls.create(1500, 670, 'faul');
//     faul.setScale(0.55).refreshBody();
//     faul.setVelocity(-300, 0);

  // WYNIKI
  this.add.image(75, 70, 'scoreBackground').setScrollFactor(0).setScale(0.3);
  this.add.image(70, 20, 'scoreBackground2').setScrollFactor(0).setScale(0.3);
  this.add.image(70, 130, 'livesBackground').setScrollFactor(0).setScale(0.3);
  // this.add.image(70, 178, 'scoreBackground').setScrollFactor(0).setScale(0.3);
  // this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(16).setColor('#000000');
  // this.text = this.add.text(32, 32, '', {fontFamily: Calibri}).setScrollFactor(0).setFontSize(32).setColor('#000000')
  this.score = this.add.text(24, 1, 'Score:', { fontFamily: 'Arial', fontSize: '32px', fill: '#000', fontWeight: 'bold' }).setScrollFactor(0).setColor('#000000');
  this.lives = this.add.text(24, 110, 'Lives:', { fontFamily: 'Arial', fontSize: '32px', fill: '#000', fontWeight: 'bold' }).setScrollFactor(0).setColor('#000000');
  this.scoreResult = this.add.text(54, 32, '0', { fontFamily: 'Arial', fontSize: '64px', fill: '#000', fontWeight: 'bold' }).setScrollFactor(0).setColor('#efcc00');
  this.livesResult = this.add.text(18, 142, '❤', { fontFamily: 'Arial', fontSize: '64px', fill: '#000', fontWeight: 'bold' }).setScrollFactor(0).setColor('#ff0000');
}

function faulGo(player, hitbox) {
  if (!isFifaCollision) {
    if (Date.now() - lastfaul > 3000) {
      lastfaul = Date.now();
      setTimeout(function () {
        var faul = fauls.create(1500, 670, 'faul');
        faul.setScale(0.55).refreshBody();
        faul.setVelocity(-300, 0);
      }, 500);
    }
  } else {
    fauls.clear()
  }

}

function messiThrow(player, hitbox) {
  if (!isFifaCollision)  {
    if (Date.now() - lastthrow > 3000) {
      lastthrow = Date.now();

      setTimeout(function () {
        var granat = granats.create(1290, 120, 'granat');
        granat.setVelocity(Phaser.Math.FloatBetween(-350, -250), -200);
        granat.setBounce(1);
      }, 200);

      messi.children.iterate(function (child) {
        var messianim = child;
        child.anims.play('messi', true);
        child.setScale(0.8).refreshBody();
      })
    }
  } else {
    granats.clear()
  }

}

// FUNKCJA Z DODAWANIEM ŻYCIA DO OGARNIĘCIA
function buyLife(player, lifecrystal) {
  hearts += 1
  lifecrystal.disableBody(true, true)
  // if(score>99){
  //     if(Date.now() - boughtLife > 1000){
  //         hearts +=1;
  //         score -=100;
  //         boughtLife = Date.now();
  //     }
  // }
}

function fifaColision(player, fifas) {
  isFifaCollision = true
  if (trophyState == 0) {
    if (dialogue == 0) {
      visibleChat = 1;
      fifaSpeech.setText('Chcesz zdobyć złotą piłkę? \n Nie tak prędko mój drogi');
      dialogue = 1;
    } else if (dialogue == 1) {
      setTimeout(function () {
        fifaSpeech.setText('Zdobądź jak najwięcej goli! \n  Ale to nie wszystko...');
        dialogue = 2;
      }, 2000);
    } else if (dialogue == 2) {
      setTimeout(function () {
        fifaSpeech.setText(' Jakiś puchar za osiągnięcia\ndrużynowe też by się przydał');
        dialogue = 3;
      }, 2000);
    } else if (dialogue == 3) {
      setTimeout(function () {
        fifaSpeech.setText('');
        dialogue = 4;
        visibleChat = 0;
      }, 2000);
    }
  } else {
    if (dialogue == 0) {
      visibleChat = 1;
      fifaSpeech.setText('Odnalazła się!');
      dialogue = 1;
    } else if (dialogue == 1) {
      setTimeout(function () {
        fifaSpeech.setText('Oto obiecana nagroda');
        dialogue = 2;
        score += 2;
      }, 2000);
    } else if (dialogue == 2) {
      setTimeout(function () {
        fifaSpeech.setText('');
        dialogue = 3;
        visibleChat = 0;
      }, 2000);
    }
  }
}

function collectBall(player, ball) {
  ball.disableBody(true, true);
  dialogue = 0;
  score += 1;

  if (balls.countActive(true) === 0) {
    balls.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 900) ? Phaser.Math.Between(900, 1500) : Phaser.Math.Between(0, 900);

    var granat = granats.create(x, 16, 'granat');
    granat.setBounce(1);
    granat.setCollideWorldBounds(true);
    granat.setVelocity(Phaser.Math.Between(-150, 150), 150);

  }
}

function collectPresent(player, present) {
  present.disableBody(true, true);
  presentballs.children.iterate(function (child) {
    child.setVisible(true)
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.6));
    child.setVelocityX(Phaser.Math.FloatBetween(-100, 100));
    child.setVelocityY(Phaser.Math.FloatBetween(-1600, -1400));
    child.anims.play('ballanimation', true);
    child.setCollideWorldBounds(true);
    child.setDamping(true)
    child.setDrag(0.5)
  });

}

// ZDOBYCIE PUCHARU
function collectTrophy(player, trophy) {
  trophy.disableBody(true, true)
  trophyState = 1;
  dialogue = 0;
}

function collectSpeedoshee(player, speedoshee) {
  speedoshee.disableBody(true, true)
  speed += 75;
}

function collectJumposhee(player, speedoshee) {
  speedoshee.disableBody(true, true)

  jump -= 200;
}

function hitGranat(player, granat) {
  player.setTint(0xff0000);
  if (hearts == 0) {
    player.anims.play('turn');
    player.setTint(0xff0000);
    this.physics.pause();


  }

  if (Date.now() - lasthit > 500) {
    lasthit = Date.now();
    hearts -= 1;

  }
  setTimeout(function () {
    player.setTint(0xffffff);
  }, 500);
}

function hitFaul(player, faul) {
  player.setTint(0xff0000);
  if (hearts == 0) {
    player.anims.play('turn');
    player.setTint(0xff0000);
    this.physics.pause();


  }

  if (Date.now() - lasthit > 500) {
    lasthit = Date.now();
    hearts -= 1;

  }
  setTimeout(function () {
    player.setTint(0xffffff);
  }, 500);
}


function update() {
  let heartsAnimation = new Array("")
  if (player.x >= 200) isFifaCollision = false
  if (score >= 10) this.scoreResult.setPosition(36, 32)
  if (score >= 100) this.scoreResult.setPosition(18, 32)
  this.scoreResult.setText(score)
  for (let i = 0; i < hearts; i++) {
    heartsAnimation.push("❤")
  }

  this.livesResult.setText(heartsAnimation.join(""))
  // this.text.setText([
  //   'Score: ' + score,
  //   'Lives: ' + hearts,
  // ]);

  if (visibleChat == 1) {
    chatbox.setVisible(true);
  } else {
    chatbox.setVisible(false);
  }

  if (cursors.left.isDown) {
    player.flipX = false;
    player.setVelocityX(-(speed));
    player.anims.play('left', true);

  } else if (cursors.right.isDown) {
    player.flipX = true;
    player.setVelocityX(speed);
    player.anims.play('left', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(jump);
  }
}

function onWorldBounds(player) {
  player.reset(player.x, game.world.centerX);
  player.reset(player.y, game.world.centerY);
}
