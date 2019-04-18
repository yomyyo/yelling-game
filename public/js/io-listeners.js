var socket = io();
// console.log("Socket ID:" + socket.id);

socket.on("receive_player", addMessages);

function addMessages(data) {

    $("#player-id").html(data.id)

    //data => {name: playerName, color: playerColor}
    // console.log($("#player_one_name").html());

    //If the player one slot is till waiting for players
    if ($("#player_one_name").html() === "Waiting for player...") {
        //Change player one name slot to this player name
        $("#player_one_name").html(data.name);
        //Give this an id of blob-one
        $("#player_one_name").attr("name", data.name);
        // console.log($("#player_one_name").attr("name"));
        
        $("#player_one_id").html(data.id);



        // console.log(data.id);
        // $(".player_one_keypress").attr("id", data.id);

        // console.log("Player two not found: ", $("#player_two_name").html() === "Waiting for player...");
        // console.log("Player one found ", $("#player_one_name").html() != "Waiting for player...");


        //If there is a player one, but not a player two
    } else if ($("#player_one_name").html() != "Waiting for player..." && $("#player_two_name").html() === "Waiting for player...") {
        //Change player one name slot to this player name
        $("#player_two_name").html(data.name);
        //Give this an id of the blob-two
        $("#player_two_name").attr("name", data.name);

        // $(".player_two_keypress").attr("id", data.id);
        // console.log($("#player_one_name").html());
        // console.log($("#player_two_name").html());


        $("#player_two_id").html(data.id);
    }
}


// Listener for server to tell us to start game
socket.on("startGame", () => {
    //Load game.js
    var gameScript = document.createElement('script');
    gameScript.setAttribute('src', 'js/game.js');
    document.body.appendChild(gameScript);
    $("#create-game").attr("class", "hidden");

})




// Listens for keypress data from server
socket.on("keyPress", logKey);

function logKey(data) {
    // console.log("playerId: ", socket.id);
    // console.log("Key Data: ", data.keyPressed);

    // console.log("Player Array: ", playerArr);
    // console.log("PlayerOne: ", playerArr[0]);
    // console.log("PlayerTwo: ", playerArr[1]);

    // console.log("data name: ", data.name);
    // console.log("Id: ", $("#player_one_name").attr("id"));


    // console.log(data.name === $("#player_one_name").attr("name"));
    //If data is coming from player one, update player-one-message
    if (data.name === $("#player_one_name").attr("name")) {
        // console.log("socket id:", socket.id)
        $(".player_one_keypress").html(data.keyPressed + " was pressed");
    } else {
        // console.log("socket id:", socket.id)

        // else Update player two message
        $(".player_two_keypress").html(data.keyPressed + " was pressed");
    }
}

