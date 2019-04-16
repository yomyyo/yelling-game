var socket = io();
var name;

$("#join-btn").on("click", function () {
  $(".bg-modal").css("display", "flex");
});

$(".close").on("click", function () {
  $(".bg-modal").css("display", "none");
});



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

$(document).on("keyup", function(data) {
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
        keyPressed: "left",
        name: name
      })
    },
    'Right': () => {
      console.log("Right!")
      socket.emit("keyPress", {
        keyPressed: "right",
        name: name
      })
    },
    'Up': () => {
      console.log("Up!")
      socket.emit("keyPress", {
        keyPressed: "up",
        name: name
      })
    },
    'Down': () => {
      console.log("Down!")
      socket.emit("keyPress", {
        keyPressed: "down",
        name: name
      })
    },
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}