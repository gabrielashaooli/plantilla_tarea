function changeBgColor() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = document.getElementById("bgColorSelector").value;
    ctx.fillRect(0, 0, 500, 500);
}

function addPointAndDraw() {
    var canvas = document.getElementById("myCanvas");
    
}

let lastX = 0;
let lastY = 0;

function drawLines(canvas, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    
    lastX = x; lastY = y;
    
    ctx.strokeStyle = document.getElementById("lnColorSelector").value;

    // Draw the Path
    ctx.stroke();
    
}

let canvasElem = document.getElementById("myCanvas");

canvasElem.addEventListener("mousemove", function (e) {
    drawLines(canvasElem, e);
});
