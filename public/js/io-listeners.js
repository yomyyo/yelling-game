var socket = io();

socket.on("receive_player", addMessages);

function addMessages(data) {

    //data => {name: playerName, color: playerColor}
    console.log($("#player_one_name").html());

    if ($("#player_one_name").html() === "Waiting for player...") {
        console.log("TEST");
        $("#player_one_name").html(data.name);
    } else {
        $("#player_two_name").html(data.name);
    }
}

