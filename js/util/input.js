function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return new Vec(x, y);
}

let canvas = document.getElementById("canvas");
var mousePos = new Vec(0,0);
var mouseDown = false;
var mouseUp = false;
var pressedKeyCodes = []

canvas.addEventListener("mousedown", function(e)
{
    let pos = getMousePosition(canvas, e);
    mousePos = pos;
    mouseDown = true;
});

canvas.addEventListener("mouseup", function(e)
{
    let pos = getMousePosition(canvas, e);
    mousePos = pos;
    mouseUp = true;
});

canvas.addEventListener("mousemove", function(e)
{
    let pos = getMousePosition(canvas, e);
    mousePos = pos;
});

function keyDownEvent(e){
    pressedKeyCodes.push(e.keyCode);
}

window.addEventListener('keydown',keyDownEvent,false);