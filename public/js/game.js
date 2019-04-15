

/* eslint-disable linebreak-style */
var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

var player;
var playerTwo;
var cursors;
var graphics;
var bounds;
var p1Lives = 3;
var p2Lives = 3;
var stateText;
var gameOver = false;

function preload() {
  this.load.image("blob", "../images/blobimg");
}

function create() {
  stateText = this.add.text(200, 300, " ", {
    font: "30px Arial",
    fill: "#fff"
  });
  stateText.visible = false;

  bounds = new Phaser.Geom.Circle(300, 300, 250);
  graphics = this.add.graphics();

  graphics.lineStyle(2, 0xffffff, 1);
  graphics.strokeCircleShape(bounds);

  player = this.physics.add.sprite(100, 300, "blob");
  player.setBounce(1);

  playerTwo = this.physics.add.sprite(400, 300, "blob");
  playerTwo.setBounce(1);
  cursors = this.input.keyboard.createCursorKeys();

  this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  player.setActive(true);
  playerTwo.setActive(true);

  player.body.maxVelocity.set(160);
  playerTwo.body.maxVelocity.set(160);
  player.body.drag.set(150);
  playerTwo.body.drag.set(150);

  player.body.collideWorldBounds = true;
  playerTwo.body.collideWorldBounds = true;

  this.physics.add.collider(player, playerTwo);
}

function update() {
  var p1PointX = player.x;
  var p1PointY = player.y;
  var p2PointX = playerTwo.x;
  var p2PointY = playerTwo.y;

  if (gameOver) {
    player.destroy();
    playerTwo.destroy();
    // player.setAccelerationX(0);
    // player.setAccelerationY(0);
    // playerTwo.setAccelerationX(0);
    // playerTwo.setAccelerationY(0);
    return;
  }

  if (!bounds.contains(p1PointX, p1PointY)) {
    player.setPosition(300);
    if (p1Lives > 1) {
      p1Lives--;
    } else {
      stateText.text = "PLAYER 2 WINS";
      stateText.visible = true;
      gameOver = true;
    }
  }

  if (!bounds.contains(p2PointX, p2PointY)) {
    playerTwo.setPosition(300);
    if (p2Lives > 0) {
      p2Lives--;
    } else {
      stateText.text = "PLAYER 1 WINS";
      stateText.visible = true;
      gameOver = true;
    }
  }

  if (cursors.left.isDown) {
    player.setAccelerationX(-160);
  } else if (cursors.right.isDown) {
    player.setAccelerationX(160);
  } else {
    player.setAccelerationX(0);
  }
  if (cursors.up.isDown) {
    player.setAccelerationY(-160);
  } else if (cursors.down.isDown) {
    player.setAccelerationY(160);
  } else {
    player.setAccelerationY(0);
  }

  if (this.key_A.isDown) {
    playerTwo.setAccelerationX(-160);
  } else if (this.key_D.isDown) {
    playerTwo.setAccelerationX(160);
  } else {
    playerTwo.setAccelerationX(0);
  }
  if (this.key_W.isDown) {
    playerTwo.setAccelerationY(-160);
  } else if (this.key_S.isDown) {
    playerTwo.setAccelerationY(60);
  } else {
    playerTwo.setAccelerationY(0);
  }

//   if (player.body.touching.right) {
//     player.body.acceleration.x = -50;
//   }

//   if (player.body.touching.left) {
//     player.body.acceleration.x = 50;
//   }

//   if (player.body.touching.down) {
//     player.body.acceleration.y = -50;
//   }

//   if (player.body.touching.up) {
//     player.body.acceleration.y = 50;
//   }

//   if (playerTwo.body.touching.right) {
//     playerTwo.body.acceleration.x = -50;
//   }

//   if (player.body.touching.left) {
//     playerTwo.body.acceleration.x = 50;
//   }

//   if (player.body.touching.down) {
//     playerTwo.body.acceleration.y = -50;
//   }

//   if (player.body.touching.up) {
//     playerTwo.body.acceleration.y = 50;
//   }
}
