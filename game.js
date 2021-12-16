var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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

function preload ()
{
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

    this.load.spritesheet('star', 'assets/gol.png', { frameWidth: 24, frameHeight: 24});
    this.load.image('bomb', 'assets/bomb.png');

    this.load.spritesheet('lewy', 'assets/lewy.png', { frameWidth: 96, frameHeight: 150 });
// MESSI https://www.youtube.com/watch?v=9LHqhr32-DY

    this.load.image('speedoshee', 'assets/oshee.png');
    this.load.image('jumposhee', 'assets/oshee.png');
    this.load.image('crate', 'assets/crate.png');
    this.load.image('chatbox', 'assets/m_chatbox.png');
//     this.load.image('tree', 'assets/Tree_2.png');
    this.load.spritesheet('santa', 'assets/fifaguys.png', {frameWidth: 153.375, frameHeight: 138});
//     this.load.spritesheet('santa', 'assets/santa.png', {frameWidth: 934, frameHeight: 570});
    this.load.spritesheet('ninja', 'assets/ninja.png', {frameWidth: 377, frameHeight: 451});
//     this.load.image('igloo', 'assets/Igloo.png');
//     this.load.image('tree2', 'assets/Tree_1.png');
//     this.load.image('snowman', 'assets/SnowMan.png');
    this.load.image('stone', 'assets/Stone.png');
//     this.load.image('crystal', 'assets/Crystal.png');
    this.load.image('sign1', 'assets/Sign_1.png');
    this.load.image('sign2', 'assets/Sign_2.png');
    this.load.image('treasure', 'assets/treasure.png');
    this.load.image('paper', 'assets/paper.png');
    this.load.image('lifecrystal', 'assets/lifecrystal.png');
    this.load.audio('terrariaday', 'assets/terrariaday.mp3');
}

var platforms;
var player;
var stars;
var score = 0;
var santaSpeech = "";
var speedoshee;
var speed = 200;
var jumposhee;
var jump = -800; //800
var santa;
var dialogue=0;
var crate;
var crateState = 0;
var chatbox;
var visibleChat = 0;
var tree;
var hitbox;
var lastthrow = 0;
var lasthit = 0;
var ninja;
var hearts = 3;
var treasure;
var treasurecoins;
var boughtLife=0;
var lifecrystal;
var sound;


function create ()
{

    window.scene = this;
//     sound = this.sound.add('terrariaday', {loop: true});
//     sound.play();

    // TWORZENIE WSZYSTKICH PLATFORM:
    this.add.image(750, 380, 'stadium');
    platforms = this.physics.add.staticGroup();
    hitbox = this.physics.add.staticGroup();

    platforms.create(750, 738, 'bigground').setScale(0.5).refreshBody();
    hitbox.create(750, 738, 'bigground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(650, 600, 'ground').setScale(0.5).refreshBody();
    hitbox.create(650, 597, 'ground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(467.50, 600, 'floorleft').setScale(0.5).refreshBody();
    hitbox.create(467.5, 597, 'floorleft2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(832.5, 600, 'floorright').setScale(0.5).refreshBody();
    hitbox.create(832.5, 597, 'floorright2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(50, 450, 'ground').setScale(0.5).refreshBody();
    hitbox.create(50, 447, 'ground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(232.5, 450, 'floorright').setScale(0.5).refreshBody()
    hitbox.create(232.5, 447, 'floorright2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(750, 350, 'ground').setScale(0.5).refreshBody();
    hitbox.create(750, 347, 'ground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(567.5, 350, 'floorleft').setScale(0.5).refreshBody();
    hitbox.create(567.5, 347, 'floorleft2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(932.5, 350, 'floorright').setScale(0.5).refreshBody();
    hitbox.create(932.5, 347, 'floorright2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(1300, 570, 'ground').setScale(0.5).refreshBody();
    hitbox.create(1300, 567, 'ground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(1117.5, 570, 'floorleft').setScale(0.5).refreshBody();
    hitbox.create(1117.5, 567, 'floorleft2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(1482.5, 570, 'floorright').setScale(0.5).refreshBody();
    hitbox.create(1482.5, 567, 'floorright2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(1632, 370, 'ground').setScale(0.5).refreshBody();
    hitbox.create(1632, 367, 'ground2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(1450, 370, 'floorleft').setScale(0.5).refreshBody();
    hitbox.create(1450, 367, 'floorleft2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);

    platforms.create(1300, 200, 'floorleft').setScale(0.5).refreshBody();
    hitbox.create(1300, 197, 'floorleft2').setScale(0.5).refreshBody();
    hitbox.setVisible(true);
    platforms.create(1345, 200, 'floorright').setScale(0.5).refreshBody();
    hitbox.create(1345, 197, 'floorright3').setScale(0.5).refreshBody();
    hitbox.setVisible(true);




//     tree = this.physics.add.staticGroup();
//     tree.create(650, 215, 'tree').setScale(0.75);

//     this.add.image(180,385,'sign2').setScale(0.75);
//     this.add.image(1700,575,'tree2').setScale(0.9);

    lifecrystal = this.physics.add.staticGroup();
    lifecrystal.create(1750, 675, 'lifecrystal').setScale(0.1).refreshBody();


//     this.add.image(545,548,'stone').setScale(0.5);
//     this.add.image(545,548,'stone').setScale(0.5);

    let crystal = this.add.image(650, 410, 'crystal').setScale(0.75);
    let crystal2 = this.add.image(190, 510, 'crystal').setScale(0.75);
    crystal.flipY=true;
    crystal2.flipY=true;
    crystal2.flipX=true;

//     let snowman = this.add.image(1200, 490, 'snowman').setScale(0.5)
//     snowman.flipX=true;


//     let igloo = this.add.image(100,650,'igloo').setScale(0.5);
//     igloo.flipX=true;

    player = this.physics.add.sprite(300, 600, 'lewy').setScale(0.8).refreshBody();

    this.cameras.main.setBounds(0,0,1500,760)
    this.cameras.main.startFollow(player, true);
    this.cameras.main.fadeIn(1000);


    this.physics.world.bounds.width = 1500
    this.physics.world.bounds.height = 800
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(1000)
    player.setDamping(true)
    player.setDrag(0.2)

    this.physics.add.overlap(player, hitbox, ninjaThrow);
    this.physics.add.overlap(player, lifecrystal, buyLife);

    chatbox = this.physics.add.staticGroup();
    chatbox.create(225, 600, 'chatbox').setScale(0.065).refreshBody();
    chatbox.setVisible(false);

    speedoshee = this.physics.add.staticGroup();
    speedoshee.create(1335, 150, 'speedoshee');

    crate = this.physics.add.staticGroup();
    crate.create(800, 300, 'crate').setScale(0.5).refreshBody();

    jumposhee = this.physics.add.staticGroup();
    jumposhee.create(800, 550, 'jumposhee');







    this.anims.create({
        key: 'ninja',
        frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    })


    this.anims.create({
        key: 'coinanimation',
        frames: this.anims.generateFrameNumbers('star', { start: 0, end: 6 }),
        frameRate: 7,
        repeat: -1
    })

    this.anims.create({
        key: 'santaidle',
//         frames: [ { key: 'santa', frame: 0 } ],
        frames: this.anims.generateFrameNumbers('santa', { start: 0, end: 7 }),
        frameRate: 7,
        repeat: -1
    })


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('lewy', { start: 1, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'lewy', frame: 0 } ],
        frameRate: 20
    });

    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

    treasure = this.physics.add.staticGroup();
    treasure.create(1730, 315, 'treasure').setScale(0.2).refreshBody();
    this.physics.add.overlap(player, treasure, collectTreasure);

    stars = this.physics.add.group({
        key: 'star',
        repeat: 20,
        setXY: { x: 12, y: 0, stepX: 70 }
    });


    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.6));
        child.setVelocityX(Phaser.Math.FloatBetween(-100, 100));

        child.anims.play('coinanimation', true);
        child.setCollideWorldBounds(true);
        child.setDamping(true)
        child.setDrag(0.5)

    });

    treasurestars = this.physics.add.group({
        key: 'star',
        repeat: 19,
        setXY: { x: 1740, y: 100, stepX: 0 }
    });

    treasurestars.children.iterate(function (child) {
        child.setVisible(false);


    });

    this.physics.add.collider(treasurestars, hitbox);

    treasurestars.setC
    this.physics.add.overlap(player, treasurestars, collectStar);

    santas = this.physics.add.group({
        key: 'santa',
        setXY: { x: 60, y: 550, stepX: 100 },
    })


    santas.children.iterate(function(child){
        child.anims.play('santaidle', true);
        child.setScale(0.8).refreshBody();

    })

    ninja = this.physics.add.group({
        key: 'ninja',
        setXY: { x: 650, y: 200, stepX: 70 },
    })
    ninja.children.iterate(function(child){
        child.setScale(0.2).refreshBody();
    })


    this.physics.add.collider(ninja, platforms)
    this.physics.add.collider(santas, platforms)
    this.physics.add.overlap(player, santas, santaColision)
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(treasurestars, platforms);
    this.physics.add.overlap(player, stars, collectStar);
    santaSpeech = this.add.text(100, 583, '', { fontSize: '16px', fill: '#000000' });
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, bombs, hitBomb);

    this.physics.add.collider(speedoshee, platforms);
    this.physics.add.overlap(player, speedoshee, collectSpeedoshee);

    this.physics.add.collider(speedoshee, crate);
    this.physics.add.overlap(player, crate, collectCrate);

    this.physics.add.collider(jumposhee, platforms);
    this.physics.add.overlap(player, jumposhee, collectJumposhee);

    var bomb = bombs.create(600, 450, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(0, 200);
    this.add.image(90, 90, 'paper').setScrollFactor(0).setScale(0.3);

    this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(16).setColor('#000000');

}

function ninjaThrow(player, hitbox){

    if(Date.now() - lastthrow > 3000){
        lastthrow = Date.now();;
        setTimeout(function() {
            var bomb = bombs.create(640, 260, 'bomb');
            bomb.setVelocity(Phaser.Math.FloatBetween(-350, -250), -200);
            bomb.setBounce(1);
          }, 200);

        ninja.children.iterate(function(child){
            var ninjaanim = child;
            child.anims.play('ninja', true);
            child.setScale(0.2).refreshBody();
        })


    }



}

function buyLife(player, lifecrystal){
    if(score>99){
        if(Date.now() - boughtLife > 1000){
            hearts +=1;
            score -=100;
            boughtLife = Date.now();
        }
    }
}

function santaColision(player, santas){

    if(crateState == 0){
        if(dialogue==0){
            visibleChat = 1;
            santaSpeech.setText('Chcesz zdobyć złotą piłkę? \n Nie tak prędko mój drogi');
            dialogue = 1;
        }
        else if(dialogue==1){
        setTimeout(function() {
            santaSpeech.setText('Zdobądź jak najwięcej goli! \n  Ale to nie wszystko...');
            dialogue = 2;
          }, 2000);
        }
        else if(dialogue==2){
            setTimeout(function() {
                santaSpeech.setText(' Jakiś puchar za osiągnięcia\ndrużynowe też by się przydał');
                dialogue = 3;
            }, 2000);
        }
        else if(dialogue == 3){
            setTimeout(function() {
              santaSpeech.setText('');
              dialogue = 4;
              visibleChat = 0;
            }, 2000);
        }
    } else {
        if(dialogue == 0){
            visibleChat = 1;
            santaSpeech.setText('Odnalazła się!');
            dialogue = 1;
        }
        else if (dialogue == 1){
            setTimeout(function() {
                santaSpeech.setText('Oto obiecana nagroda');
                dialogue = 2;
                score += 2;
              }, 2000);
        }
        else if (dialogue == 2){
            setTimeout(function() {
                santaSpeech.setText('');
                dialogue = 3;
                visibleChat = 0;
            }, 2000);
        }
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    dialogue = 0;
    score += 10;

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 900) ? Phaser.Math.Between(900,1500) : Phaser.Math.Between(0, 900);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-150, 150), 150);

    }
}

function collectTreasure(player, treasure){
    treasure.disableBody(true, true);
    treasurestars.children.iterate(function (child) {
        child.setVisible(true)
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        child.setBounceX(Phaser.Math.FloatBetween(0.4, 0.6));
        child.setVelocityX(Phaser.Math.FloatBetween(-100, 100));
        child.setVelocityY(Phaser.Math.FloatBetween(-1600, -1400));
        child.anims.play('coinanimation', true);
        child.setCollideWorldBounds(true);
        child.setDamping(true)
        child.setDrag(0.5)
    });

}

function collectCrate(player, crate){
    crate.disableBody(true, true)
    crateState = 1;
    dialogue = 0;
}

function collectSpeedoshee(player, speedoshee){
    speedoshee.disableBody(true, true)

    speed+=75;
}

function collectJumposhee(player, speedoshee){
    speedoshee.disableBody(true, true)

    jump-=200;
}

function hitBomb (player, bomb)
{
    player.setTint(0xff0000);
    if(hearts == 0){
        player.anims.play('turn');
        player.setTint(0xff0000);
        this.physics.pause();


    }

    if(Date.now() - lasthit > 500){
        lasthit = Date.now();
        hearts -= 1;

    }
    setTimeout(function() {
        player.setTint(0xffffff);
      }, 500);
}


function update ()
{
    this.text.setText([
        'Score: ' + score,
        'Lives: ' + hearts,
    ]);


    if(visibleChat == 1){
        chatbox.setVisible(true);
    } else {
        chatbox.setVisible(false);
    }

    if (cursors.left.isDown)
    {
        player.flipX=false;
        player.setVelocityX(-(speed));
        player.anims.play('left', true);

    }
    else if (cursors.right.isDown)
    {
        player.flipX=true;
        player.setVelocityX(speed);
        player.anims.play('left', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(jump);
    }

}
