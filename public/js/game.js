var socket = io();
var playerOneColor;

socket.on("changedPlayerOne", function(data){
  console.log("TEST");
  playerOneColor = data.playerOneColor;
});

// console.log(playerOneColor);


/* eslint-disable linebreak-style */
// Setings for the game

var playerOneName;
playerOneName = $("#player_one_name").html();
var playerOneId;
playerOneId = $("#player_one_id").html();

var playerTwoName;
playerTwoName = $("#player_two_name").html();
var playerTwoId;
playerTwoId = $("#player_two_id").html();

var name;
name = $("#name").val();

var id;
id = $("#playerId").val();

var config = {
  type: Phaser.AUTO,
  parent: "blob-game",
  width: 600,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// initilize the game using settings
var game = new Phaser.Game(config);

// variables used for game
var player;
var playerTwo;
var cursors;
var graphics;
var bounds;
var p1Lives = 3;
var p2Lives = 3;
var stateText;
var gameOver = false;
var livesOne;
var livesTwo;

// preload assets before the game starts
function preload() {
  this.load.image("grass", "images/grass.png");
  this.load.spritesheet("animatedBlob", "images/animate.png", {
    frameWidth: 32,
    frameHeight: 32
  });
}

// create all assets
function create() {

  // background picture
  this.add.image(300, 300, "grass");

  // text declaring who will win. Only visible when someone has no more lives
  stateText = this.add.text(110, 300, " ", {
    font: "50px Arial",
    fill: "#fff",
    stroke: "#000000",
    strokeThickness: 2
  });
  stateText.visible = false;

  //the ring
  bounds = new Phaser.Geom.Circle(300, 300, 250);
  graphics = this.add.graphics();

  // settings used to draw the ring
  graphics.lineStyle(5, 0x9400d3, 1);
  graphics.strokeCircleShape(bounds);


  //player 1 settings
  player = this.physics.add.sprite(100, 300, "animatedBlob");
  player.setBounce(1);
  player.setSize(10, 10);
  player.setOffset(10, 22);

  // player 2 settings
  playerTwo = this.physics.add.sprite(400, 300, "animatedBlob");
  playerTwo.setBounce(1);
  playerTwo.setSize(10, 10);
  playerTwo.setOffset(10, 22);

  // walking animation
  this.anims.create({
    //Red color
    key: "walk-red",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      //use different frames to choose different colors. refer to animate.png in images
      start: 121,
      end: 130
    }),
    frameRate: 15,
    repeat: -1
  });
  this.anims.create({
    //Blue color
    key: "walk-blue",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      //use different frames to choose different colors. refer to animate.png in images
      start: 71,
      end: 80
    }),
    frameRate: 15,
    repeat: -1
  })
  this.anims.create({
    //Green color
    key: "walk-green",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      //use different frames to choose different colors. refer to animate.png in images
      start: 21,
      end: 30
    }),
    frameRate: 15,
    repeat: -1
  });
  this.anims.create({
    //yellow color
    key: "walk-yellow",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      //use different frames to choose different colors. refer to animate.png in images
      start: 171,
      end: 180
    }),
    frameRate: 15,
    repeat: -1
  });

  // idle animation
  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      start: 101,
      end: 110
    }),
    frameRate: 10,
    repeat: -1
  });

  // phaser's built in function for arrow key presses
  cursors = this.input.keyboard.createCursorKeys();

  // key presses for a w s d for movement
  this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  // make sure the physics apply to players
  player.setActive(true);
  playerTwo.setActive(true);

  // change player size
  player.setScale(3);
  playerTwo.setScale(3);

  // movement logic
  player.body.maxVelocity.set(1000);
  playerTwo.body.maxVelocity.set(1000);
  player.body.drag.set(2000);
  playerTwo.body.drag.set(2000);

  // set so players cannot leave the bounds of the screen
  player.body.collideWorldBounds = true;
  playerTwo.body.collideWorldBounds = true;

  // physics to allow players to touch each other
  this.physics.add.collider(player, playerTwo);

  // display number of lives for player 1
  livesOne = this.add.text(16, 16, "Player 1 Lives: 3", {
    font: "20px Arial",
    stroke: "#000000",
    strokeThickness: 2,
    fill: "#ff0000"
  });

  // display number of lives for player 2
  livesTwo = this.add.text(430, 16, "Player 2 Lives: 3", {
    font: "20px Arial",
    stroke: "#000000",
    strokeThickness: 2,
    fill: "#ff0000"
  });
}

socket.on("updateLocation", logKey);


function logKey(data) {

  if (data.name === playerOneName) {

    console.log("in player one");

    console.log("p1c", playerOneColor)

    switch (playerOneColor) {
      case "red":
        player.anims.play("walk-red", true);
        break;
      case "blue":
      player.anims.play("walk-blue", true);
        break;
      case "green":
      player.anims.play("walk-green", true);
        break;
      case "yellow":
      player.anims.play("walk-yellow", true);
        break;
    }



    // player.anims.play("walk-green", true);

    //Logic for keypress
    switch (data.keyPressed) {
      case "ArrowUp" || "Up":
        player.setVelocityY(-700);
        // setTimeout(function () {
        // player.setVelocityY(0);
        // }, 50000)
        break;
      case "ArrowDown" || "Down":
        player.setVelocityY(700);
        // setTimeout(function () {
        //   player.setVelocityY(0);
        // }, 50000)
        break;
      case "ArrowLeft" || "Left":
        player.setVelocityX(-700);
        // setTimeout(function () {
        //   player.setVelocityX(0);
        // }, 50000)
        break;
      case "ArrowRight" || "Right":
        player.setVelocityX(700);
        // setTimeout(function () {
        //   player.setVelocityX(0);
        // }, 50000)
        break;
    }
  } else {

    //Player Two

    switch (playerTwoColor) {
      case "red":
        playerTwo.anims.play("walk-red", true);
        break;
      case "blue":
      playerTwo.anims.play("walk-blue", true);
        break;
      case "green":
      playerTwo.anims.play("walk-green", true);
        break;
      case "yellow":
      playerTwo.anims.play("walk-yellow", true);
        break;
    }
    switch (data.keyPressed) {
      case "ArrowUp" || "Up":
        playerTwo.setVelocityY(-700);
        // setTimeout(function () {
        //   playerTwo.setVelocityY(0);
        // }, 50000)
        break;
      case "ArrowDown" || "Down":
        playerTwo.setVelocityY(700);
        // setTimeout(function () {
        //   playerTwo.setVelocityY(0);
        // }, 50000)
        break;
      case "ArrowLeft" || "Left":
        playerTwo.setVelocityX(-700);
        // setTimeout(function () {
        //   playerTwo.setVelocityX(0);
        // }, 50000)
        break;
      case "ArrowRight" || "Right":
        playerTwo.setVelocityX(700);
        // setTimeout(function () {
        //   playerTwo.setVelocityX(0);
        // }, 50000)
        break;
    }
  }
}

// this function does real time checks on the state of the game
function update() {

  // log where the players are on the map
  var p1PointX = player.x;
  var p1PointY = player.y;
  var p2PointX = playerTwo.x;
  var p2PointY = playerTwo.y;

  // if a player has no more lives, end the game
  if (gameOver) {
    player.destroy();
    playerTwo.destroy();
    return;
  }

  // checks to see if player 1 has left the ring, and if they have, take off a life. If no more lives, end game
  if (!bounds.contains(p1PointX, p1PointY)) {
    player.setPosition(300);
    if (p1Lives > 1) {
      p1Lives--;
      livesOne.setText("Player 1 Lives: " + p1Lives);
    } else {
      p1Lives--;
      livesOne.setText("Player 1 Lives: " + p1Lives);
      stateText.text = "PLAYER 2 WINS";
      stateText.visible = true;

      var winPlayer;
      var losePlayer;
      $.get("/api/players", function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].name == playerOneName) {
            winPlayer = data[i];
          }
          if (data[i].name == playerTwoName) {
            losePlayer = data[i];
          }
        }

        var wins = losePlayer.wins + 1;
        var newData = {
          wins: wins
        }

        losses = winPlayer.losses + 1;
        var losedata = {
          losses: losses
        }

        $.ajax("/api/players/" + playerOneName, {
          type: "PUT",
          data: newData
        }).then(
          function () {
            console.log("Player Two Wins");
          }
        )

        $.ajax("/api/players/" + playerTwoName, {
          type: "PUT",
          data: losedata
        }).then(
          function () {
            console.log("Player One Lose");
          }
        )
        gameOver = true;
        $("#end-game").removeAttr("class");
      })
    }
  }

  // checks to see if player 2 has left the ring, and if they have, take off a life. If no more lives, end game
  if (!bounds.contains(p2PointX, p2PointY)) {
    playerTwo.setPosition(300);
    if (p2Lives > 1) {
      p2Lives--;
      livesTwo.setText("Player 2 Lives: " + p2Lives);
    } else {
      p2Lives--;
      livesTwo.setText("Player 2 Lives: " + p2Lives);
      stateText.text = "PLAYER 1 WINS";
      stateText.visible = true;

      var winPlayer;
      var losePlayer;
      $.get("/api/players", function (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].name == playerOneName) {
            winPlayer = data[i];
          }
          if (data[i].name == playerTwoName) {
            losePlayer = data[i];
          }
        }

        var newData = {
          wins: winPlayer.wins + 1
        }

        var losedata = {
          losses: losePlayer.losses + 1
        }

        $.ajax("/api/players/" + playerOneName, {
          type: "PUT",
          data: newData
        }).then(
          function () {
            console.log("Player One Wins");
          }
        )

        $.ajax("/api/players/" + playerTwoName, {
          type: "PUT",
          data: losedata
        }).then(
          function () {
            console.log("Player Two Lose");
          }
        )
        gameOver = true;
        $("#end-game").removeAttr("class");
      })
    }
  }
}