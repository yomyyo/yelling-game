var socket = io();

socket.on("receive_player", addMessages);

function addMessages(data) {
  console.log("Add Messages Data", data);
  sessionStorage.setItem(data.name, data.color);
  console.log(sessionStorage.getItem(data.name));

  // sessionStorage.setItem("name", data.name);
  // console.log(sessionStorage.getItem("name"))
}



    // console.log(sessionStorage.getItem());
    
    // $("#player_one_name").html(sessionStorage.getItem("name"));


    // socket.on("receive_player", addMessages);

    // function addMessages(data) {
    //     console.log("Data", data);
    //     $("#player_one_name").text(data.name);
    // }


