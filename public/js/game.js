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
var customBounds;

function preload() {
  this.load.image("blob", "../images/blobimg");
}

function create() {
  var bounds = new Phaser.Geom.Circle(300, 300, 100);
  var graphics = this.add.graphics();
  graphics.strokeCircleShape(bounds);

  player = this.physics.add.sprite(100, 100, "blob");
  player.setBounce(1);

  playerTwo = this.physics.add.sprite(300, 300, "blob");
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
}

function update() {
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
      player.body.velocity.x = -500;
    }, 50);
  }

  if (player.body.touching.left) {
    setTimeout(function() {
      player.body.velocity.x = 500;
    }, 50);
  }

  if (player.body.touching.down) {
    setTimeout(function() {
      player.body.velocity.y = -500;
    }, 50);
  }

  if (player.body.touching.up) {
    setTimeout(function() {
      player.body.velocity.y = 500;
    }, 50);
  }

  if (playerTwo.body.touching.right) {
    setTimeout(function() {
      playerTwo.body.velocity.x = -500;
    }, 50);
  }

  if (playerTwo.body.touching.left) {
    setTimeout(function() {
      playerTwo.body.velocity.x = 500;
    }, 50);
  }

  if (playerTwo.body.touching.down) {
    setTimeout(function() {
      playerTwo.body.velocity.y = -500;
    }, 50);
  }

  if (playerTwo.body.touching.up) {
    setTimeout(function() {
      playerTwo.body.velocity.y = 500;
    }, 50);
  }

  this.physics.add.collider(player, playerTwo, function() {
    player.setVelocityX(300);
    player.setVelocityY(300);
    playerTwo.setVelocityX(300);
    playerTwo.setVelocityY(300);
    setTimeout(function() {
      player.setVelocityX(0);
      player.setVelocityY(0);
      playerTwo.setVelocityX(0);
      playerTwo.setVelocityY(0);
    }, 100);
  });
}
