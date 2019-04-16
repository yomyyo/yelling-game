var socket = io();

$("#join-btn").on("click", function () {
  $(".bg-modal").css("display", "flex");
});

$(".close").on("click", function () {
  $(".bg-modal").css("display", "none");
});



// on click to trigger socket.io(add_player)
$("#send").on("click", function () {
  $(".bg-modal").css("display", "none");
  socket.emit("add_player", {
    name: $("#name").val(),
    color: "#000000"
  })
});

socket.on("receive_player", addMessages);

function addMessages(data) {
  console.log("Add Messages Data", data);

  console.log("Socket.id: ", socket.id);
}

$(document).on("keyup", function(data) {
  console.log(data.key);
  socket.emit("player_key", {
    keyPressed: data.key
  })
})