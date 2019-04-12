var canvas = document.querySelector("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

createBlobs(canvas);


window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // console.log("Height: ", canvas.height)
    // console.log("Width: ", canvas.width)
    // });


    createBlobs(canvas);

    // var c = canvas.getContext("2d");

    // //Create Rectangles
    // // c.fillStyle = "rgba(255, 0, 0, 0.5)";
    // // c.fillRect(100, 100, 100, 100);
    // // c.fillStyle = "rgba(0, 250, 0, 0.5)";
    // // c.fillRect(300, 100, 100, 100);
    // // c.fillStyle = "rgba(0, 0, 255, 0.5)";
    // // c.fillRect(500, 500, 100, 100);


    // //Create Lines
    // // c.beginPath();
    // // c.moveTo(50, 300);
    // // c.lineTo(300, 100);
    // // c.lineTo(700, 500);
    // // c.strokeStyle = "#300030";
    // // c.stroke();

    // //Arc / Circle
    // // c.beginPath();
    // // c.arc(300, 300, 30, 0, Math.PI * 2, false);
    // // c.strokeStyle = "blue";
    // // c.stroke();

    // // for (var i = 0; i < 20; i++) {
    // //     var x = Math.random() * window.innerWidth;
    // //     var y = Math.random() * window.innerHeight;
    // //     c.beginPath();
    // //     c.arc(x, y, 30, 0, Math.PI * 2, false);
    // //     c.strokeStyle = "blue";
    // //     c.stroke();
    // // }

    // c.beginPath();
    // c.arc(100, 300, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = "blue";
    // c.stroke();

});

var createBlobs = function (canvas) {
    var c = canvas.getContext("2d");

    c.beginPath();
    c.arc(100, 300, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    //Create Rectangles
    // c.fillStyle = "rgba(255, 0, 0, 0.5)";
    // c.fillRect(100, 100, 100, 100);
    // c.fillStyle = "rgba(0, 250, 0, 0.5)";
    // c.fillRect(300, 100, 100, 100);
    // c.fillStyle = "rgba(0, 0, 255, 0.5)";
    // c.fillRect(500, 500, 100, 100);


    //Create Lines
    // c.beginPath();
    // c.moveTo(50, 300);
    // c.lineTo(300, 100);
    // c.lineTo(700, 500);
    // c.strokeStyle = "#300030";
    // c.stroke();

    //Arc / Circle
    // c.beginPath();
    // c.arc(300, 300, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = "blue";
    // c.stroke();

    // for (var i = 0; i < 20; i++) {
    //     var x = Math.random() * window.innerWidth;
    //     var y = Math.random() * window.innerHeight;
    //     c.beginPath();
    //     c.arc(x, y, 30, 0, Math.PI * 2, false);
    //     c.strokeStyle = "blue";
    //     c.stroke();
    // }
}
