var socket = io();

socket.on("test", function () {
  console.log()
})

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

// console.log("PLayer One : " + playerOneName);
// console.log("PLayer Two : " + playerTwoName);


// console.log("PLayer One Id: " + playerOneId);
// console.log("PLayer Two Id: " + playerTwoId);

// console.log("socket ID: ", socket.id);




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

//Contain player's blobs
var blobs = [];

socket.on("receive_player", addBlobs);

console.log("TESTING IN GAME.JS");
console.log("BLobs: ", blobs);

function addBlobs(data) {
  blobs.push(data);
  console.log("Blobs: ", data)
}


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


  //set player 1 and player 2 settings
  // To blob 1 and blob 2 objects
  //
  //
  //
  //add socket.io connection to load blobs array
  //
  //
  //


  // walking animation
  this.anims.create({
    key: "walk",
    frames: this.anims.generateFrameNumbers("animatedBlob", {
      //use different frames to choose different colors. refer to animate.png in images
      start: 121,
      end: 130
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


// Listens for keypress data from server
socket.on("testing", logKey);

function logKey(data) {
  // console.log("playerId: ", socket.id);
  console.log("Key Data: ", data.keyPressed);
  console.log("name:", data.name)

  // console.log("Player Array: ", playerArr);
  // console.log("PlayerOne: ", playerArr[0]);
  // console.log("PlayerTwo: ", playerArr[1]);

  //if player is player one
  // console.log("player 1 name: ", playerOneName);
  // console.log("player 2 name: ", playerTwoName);
  // console.log("data name: ", data.name);

  if (data.name === playerOneName) {

    console.log("in player one");
    player.anims.play("walk", true);

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
    playerTwo.anims.play("walk", true);
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


  //Add listener for socket.io update
  //
  //
  //

  // log where the players are on the map
  var p1PointX = player.x;
  var p1PointY = player.y;
  var p2PointX = playerTwo.x;
  var p2PointY = playerTwo.y;


  socket.emit("tellServerPosition", {
    p1PointX: player.x,
    p1PointY: player.y,
    p2PointX: playerTwo.x,
    p2PointY: playerTwo.y,
    name: name
  })

  // if a player has no more lives, end the game
  if (gameOver) {
    player.destroy();
    playerTwo.destroy();
    // player.setAccelerationX(0);
    // player.setAccelerationY(0);
    // playerTwo.setAccelerationX(0);
    // playerTwo.setAccelerationY(0);
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

  // movement using arrow keys for player 1



  // socket.on("testing", logKey);

  // function logKey(data) {
  //   // console.log("playerId: ", socket.id);
  //   console.log("Key Data: ", data.keyPressed);
  //   console.log("name:", data.name)

  //   // console.log("Player Array: ", playerArr);
  //   // console.log("PlayerOne: ", playerArr[0]);
  //   // console.log("PlayerTwo: ", playerArr[1]);

  //   //if player is player one
  //   // console.log("player 1 name: ", playerOneName);
  //   // console.log("player 2 name: ", playerTwoName);
  //   // console.log("data name: ", data.name);

  //   if (data.name === playerOneName) {

  //     console.log("in player one");
  //     player.anims.play("walk", true);

  //     //Logic for keypress
  //     switch (data.keyPressed) {
  //       case "ArrowUp" || "Up":
  //         player.setVelocityY(-160);
  //         setTimeout(function() {
  //           player.setVelocityY(0);
  //         }, 1)
  //         break;
  //       case "ArrowDown" || "Down":
  //         player.setVelocityY(160);
  //         setTimeout(function() {
  //           player.setVelocityY(0);
  //         }, 500)
  //         break;
  //       case "ArrowLeft" || "Left":
  //         player.setVelocitynX(-160);
  //         setTimeout(function() {
  //           player.setVelocityX(0);
  //         }, 500)
  //         break;
  //       case "ArrowRight" || "Right":
  //         player.setVelocityX(160);
  //         setTimeout(function() {
  //           player.setVelocityX(0);
  //         }, 500)
  //         break;
  //     }
  //   } else {
  //     playerTwo.anims.play("walk", true);
  //     switch (data.keyPressed) {
  //       case "ArrowUp" || "Up":
  //         playerTwo.setVelocityY(-160);
  //         setTimeout(function() {
  //           playerTwo.setVelocityY(0);
  //         }, 500)
  //         break;
  //       case "ArrowDown" || "Down":
  //         playerTwo.setVelocityY(160);
  //         setTimeout(function() {
  //           playerTwo.setVelocityY(0);
  //         }, 500)
  //         break;
  //       case "ArrowLeft" || "Left":
  //         playerTwo.setVelocitynX(-160);
  //         setTimeout(function() {
  //           playerTwo.setVelocityX(0);
  //         }, 500)
  //         break;
  //       case "ArrowRight" || "Right":
  //         playerTwo.setVelocityX(160);
  //         setTimeout(function() {
  //           playerTwo.setVelocityX(0);
  //         }, 500)
  //         break;
  //     }
  //   }
  // }






  // //left and right
  // if (cursors.left.isDown) {
  //   player.anims.play("walk", true);
  //   player.setAccelerationX(-160);
  // } else if (cursors.right.isDown) {
  //   player.setAccelerationX(160);
  //   player.anims.play("walk", true);
  // }

  // //up and down
  // if (cursors.up.isDown) {
  //   player.setAccelerationY(-160);
  //   player.anims.play("walk", true);
  // } else if (cursors.down.isDown) {
  //   player.setAccelerationY(160);
  //   player.anims.play("walk", true);
  // }



  //if none of arrow keys are pressed, play idle animation
  // if (
  //   !cursors.left.isDown &&
  //   !cursors.right.isDown &&
  //   !cursors.up.isDown &&
  //   !cursors.down.isDown
  // ) {
  //   player.setAccelerationX(0);
  //   player.setAccelerationY(0);
  //   player.anims.play("idle", true);
  // }

  // movement using wasd for player 2



  // //left and right
  // if (this.key_A.isDown) {
  //   playerTwo.setAccelerationX(-160);
  //   playerTwo.anims.play("walk", true);
  // } else if (this.key_D.isDown) {
  //   playerTwo.setAccelerationX(160);
  //   playerTwo.anims.play("walk", true);
  // }

  // //up and down
  // if (this.key_W.isDown) {
  //   //log Player's Blob
  //   //
  //   //
  //   //
  //   console.log(blobs[{ "id": socket.id }])

  //   playerTwo.setAccelerationY(-160);
  //   playerTwo.anims.play("walk", true);
  // } else if (this.key_S.isDown) {
  //   playerTwo.setAccelerationY(60);
  //   playerTwo.anims.play("walk", true);
  // }











  //if player 2 is not pressing wasd, then play idle animation
  // if (
  //   !this.key_A.isDown &&
  //   !this.key_D.isDown &&
  //   !this.key_S.isDown &&
  //   !this.key_W.isDown
  // ) {
  //   playerTwo.setAccelerationX(0);
  //   playerTwo.setAccelerationY(0);
  //   playerTwo.anims.play("idle", true);
  // }

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