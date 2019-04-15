var socket = io();

$("#create-btn").on("click", function() {
    $(".bg-modal").css("display", "flex");
});

$(".close").on("click", function() {
    $(".bg-modal").css("display", "none");
});



$(() => {
    $("#send").click(()=>{
        sendMessage({name: $("#name").val(), color: "#000000"});
    })
    getMessages()
})

socket.on('message', addMessages)


function addMessages(message){
    $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`)
}
function getMessages(){
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addMessages);
  })
}
function sendMessage(message){
  $.post('http://localhost:3000/messages', message)
}