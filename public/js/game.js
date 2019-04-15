

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
    // player.setVelocityX(0);
    // player.setVelocityY(0);
    // playerTwo.setVelocityX(0);
    // playerTwo.setVelocityY(0);
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
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }
  if (cursors.up.isDown) {
    player.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  } else {
    player.setVelocityY(0);
  }

  if (this.key_A.isDown) {
    playerTwo.setVelocityX(-160);
  } else if (this.key_D.isDown) {
    playerTwo.setVelocityX(160);
  } else {
    playerTwo.setVelocityX(0);
  }
  if (this.key_W.isDown) {
    playerTwo.setVelocityY(-160);
  } else if (this.key_S.isDown) {
    playerTwo.setVelocityY(160);
  } else {
    playerTwo.setVelocityY(0);
  }

  if (player.body.touching.right) {
    setTimeout(function() {
      player.body.velocity.x = Math.floor(Math.random() * (-490 + -510 + 1)) + -510;
    }, 50);
  }

  if (player.body.touching.left) {
    setTimeout(function() {
      player.body.velocity.x = Math.floor(Math.random() * (510 + 490 + 1)) + 490;
    }, 50);
  }

  if (player.body.touching.down) {
    setTimeout(function() {
      player.body.velocity.y = Math.floor(Math.random() * (-490 + -510 + 1)) + -510;
    }, 50);
  }

  if (player.body.touching.up) {
    setTimeout(function() {
      player.body.velocity.y = Math.floor(Math.random() * (510 + 490 + 1)) + 490;
    }, 50);
  }

  if (playerTwo.body.touching.right) {
    setTimeout(function() {
      playerTwo.body.velocity.x = Math.floor(Math.random() * (-490 + -510 + 1)) + -510;
    }, 50);
  }

  if (playerTwo.body.touching.left) {
    setTimeout(function() {
      playerTwo.body.velocity.x = Math.floor(Math.random() * (510 + 490 + 1)) + 490;
    }, 50);
  }

  if (playerTwo.body.touching.down) {
    setTimeout(function() {
      playerTwo.body.velocity.y = Math.floor(Math.random() * (-490 + -510 + 1)) + -510;
    }, 50);
  }

  if (playerTwo.body.touching.up) {
    setTimeout(function() {
      playerTwo.body.velocity.y = Math.floor(Math.random() * (510 + 490 + 1)) + 490;
    }, 50);
  }
}
