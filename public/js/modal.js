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


