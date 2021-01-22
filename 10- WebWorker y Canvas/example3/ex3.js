class roundRect {
  constructor(rectX, rectY, rectHeight, rectWidth, stroke, fill, c) {
    var radius = 5;
    c.beginPath();
    c.strokeStyle = stroke;
    c.fillStyle = fill;
    c.moveTo(rectX + rectWidth / 2, rectY);
    c.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, radius);
    c.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, radius);
    c.arcTo(rectX, rectY + rectHeight, rectX, rectY, radius);
    c.arcTo(rectX, rectY, rectX + rectWidth / 2, rectY, radius);
    c.closePath();
    c.fill();
    c.stroke();
  }
}

var objects = [
  {x:10, y:10, speed:{x:0, y:1},    w:50, h:7,  stroke:"red",   fill:"red"},
  {x:50, y:10, speed:{x:0.5, y:1},  w:25, h:20, stroke:"black", fill:"blue"},
  {x:190, y:10, speed:{x:-0.2, y:1}, w:20, h:18, stroke:"black", fill:"lime"}
]

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < objects.length; i++) { 
    var o = objects[i]
    new roundRect(o.x, o.y, o.w, o.h, o.stroke, o.fill, ctx);
    o.x += o.speed.x
    o.y += o.speed.y    
  }
  requestAnimationFrame(animate);  
}

var canvas = document.body.querySelector("#canvasOne");
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight * 0.9975;
var ctx = canvas.getContext("2d");
animate();