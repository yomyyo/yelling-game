var socket = io();
var name;


$("#join-btn").on("click", function () {
  $(".bg-modal").css("display", "flex");
});

$(".close").on("click", function () {
  $(".bg-modal").css("display", "none");
});

$("#start-btn").on("click", function () {
  // var gameScript = document.createElement('script');
  // gameScript.setAttribute('src', 'js/game.js');
  // document.body.appendChild(gameScript);
  $("#create-game").attr("class", "hidden");
  //Tell server to start the game
  socket.emit("startGame");
})



// on click to trigger socket.io(add_player)
$("#send").on("click", function () {
  $(".bg-modal").css("display", "none");
  name = $("#name").val();
  socket.emit("add_player", {
    name: $("#name").val(),
    color: "#000000"
  })
});

// socket.on("receive_player", addMessages);

// function addMessages(data) {
//   console.log("Add Messages Data", data);

//   // console.log("Socket.id: ", socket.id);
// }

// Captures keypress to send to server and all players
$(document).on("keyup", function (data) {
  // console.log(data.key);
  socket.emit("keyPress", {
    keyPressed: data.key,
    name: name
  })
})


if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'Left': function () {
      console.log("Left!");
      socket.emit("keyPress", {
        keyPressed: "ArrowLeft",
        name: name
      })
    },
    'Right': () => {
      console.log("Right!")
      socket.emit("keyPress", {
        keyPressed: "ArrowRight",
        name: name
      })
    },
    'Up': () => {
      console.log("Up!")
      socket.emit("keyPress", {
        keyPressed: "ArrowUp",
        name: name
      })
    },
    'Down': () => {
      console.log("Down!")
      socket.emit("keyPress", {
        keyPressed: "ArrowDown",
        name: name
      })
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}