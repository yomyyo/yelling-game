//Select the canvas from the html document
var canvas = document.querySelector("canvas")

//Set the width and the height of the 
// canvas to the width and height of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//set Canvas to 2d
var c = canvas.getContext("2d");

// //Draw Blob to canvas
// //tell the canvas to start the path
// c.beginPath();
// // Create an arc with the  x, y, radius, 
// // start angle, ending angle(in this case its the value of a cricle)
// // And a boolean for counterclockwise
// c.arc(100, 300, 30, 0, Math.PI * 2, false);
// // Set color of the circle
// c.strokeStyle = "blue";
// // send circle to the canvas
// c.stroke();


// // Create Rectangles
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 250, 0, 0.5)";
// c.fillRect(300, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(500, 500, 100, 100);


// // Create Lines
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(700, 500);
// c.strokeStyle = "#300030";
// c.stroke();

// // Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius

    this.draw = function () {
        //tell the canvas to start the path
        c.beginPath();
        // Create an arc with the  x, y, radius, 
        // start angle, ending angle(in this case its the value of a cricle)
        // And a boolean for counterclockwise
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // Set color of the circle arc aka, outline
        c.strokeStyle = "rgba(0, 0, 255, 0.5)";
        // Set color of circle body
        c.fillStyle = "rgba(0, 0, 255, 0.5)";
        // send circle to the canvas
        c.stroke();
        // fill circle
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}


var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
};
animate();



//Listener function to change canvas size based on window size
window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});