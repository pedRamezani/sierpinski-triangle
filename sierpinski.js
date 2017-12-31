var canvas = document.getElementById('sierpinski');
var ctx = canvas.getContext("2d");
var cx = 0;
var cy = 0;
var color1 = "white";
var color2 = "white";
var color3 = "white";
// var chaos = document.getElementById("chaos");

window.addEventListener("load",init);
window.addEventListener("change",init);

function init() {
  ctx.translate(-cx,-cy);
  canvas.width = window.innerWidth * 0.9;
  canvas.height = window.innerHeight * 0.9;
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  ctx.translate(cx, cy);
  ctx.fillStyle = "black";
  ctx.lineWidth = 2;
  ctx.fillRect(-cx, -cy, 2 * cx, 2 * cy);
  ctx.strokeStyle = "white";
  sierpinski([-cx*0.5,cy*0.9],[cx*0.5,cy*0.9],0,true);
}

var slide = document.getElementById("slide");
slide.oninput = function() {
  ctx.fillRect(-cx,-cy,2*cx,2*cy);
  sierpinski([-cx*0.5,cy*0.9],[cx*0.5,cy*0.9],slide.value,true);
}

var cpicker1 = document.getElementById("color1");
var cpicker2 = document.getElementById("color2");
var cpicker3 = document.getElementById("color3");

cpicker1.oninput = function() {
  color1 = cpicker1.value
  ctx.fillRect(-cx,-cy,2*cx,2*cy);
  sierpinski([-cx*0.5,cy*0.9],[cx*0.5,cy*0.9],slide.value,true);
}

cpicker2.oninput = function() {
  color2 = cpicker2.value;
  ctx.fillRect(-cx,-cy,2*cx,2*cy);
  sierpinski([-cx*0.5,cy*0.9],[cx*0.5,cy*0.9],slide.value,true);
}

cpicker3.oninput = function() {
  color3 = cpicker3.value;
  ctx.fillRect(-cx,-cy,2*cx,2*cy);
  sierpinski([-cx*0.5,cy*0.9],[cx*0.5,cy*0.9],slide.value,true);
}


function sierpinski(start,end,iteration,info) {
  var x1 = start[0];
  var y1 = start[1];
  var x2 = end[0];
  var y2 = end[1];
  var x3 = ((x1 + x2) + Math.sqrt(3)*(-y1 + y2))/2;
  var y3 = ((y1 + y2) + Math.sqrt(3)*(x1 - x2))/2;
  var x4 = (x1 + x2)/2;
  var y4 = (y1 + y2)/2;
  var x5 = (x1 + x3)/2;
  var y5 = (y1 + y3)/2;
  var x6 = (x2 + x3)/2;
  var y6 = (y2 + y3)/2;


  // Big Triangle with 4 triangles in it
  ctx.fillStyle = color1;

  //Bottom Left
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x4,y4);
  ctx.lineTo(x5,y5);
  ctx.lineTo(x1,y1);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = color2;

  //Bottom Rigth
  ctx.beginPath();
  ctx.moveTo(x4,y4);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x6,y6);
  ctx.lineTo(x4,y4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = color3;

  //Top
  ctx.beginPath();
  ctx.moveTo(x5,y5);
  ctx.lineTo(x6,y6);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x5,y5);
  ctx.closePath();
  ctx.fill();

  //Middle
  ctx.fillStyle = "black"
  ctx.beginPath();
  ctx.moveTo(x5,y5);
  ctx.lineTo(x6,y6);
  ctx.lineTo(x4,y4);
  ctx.lineTo(x5,y5);
  ctx.closePath();
  ctx.fill();

  if (info) {
    ctx.font = canvas.width/50 + 'px Arial';
    ctx.fillStyle = "white";
    let x = parseFloat(iteration) + 1;
    ctx.fillText( x + ". Iteration",-cx + 10, -cy +10 + canvas.width/50);
    ctx.fillText("Area: " + Math.pow(3/4,x),-cx + 10, -cy +20 + 2*canvas.width/50);
    ctx.fillText("Perimeter: " + Math.pow(3/2,x) + " with " + Math.pow(3,x + 1) + " edges",-cx + 10, -cy +30 + 3*canvas.width/50);
    ctx.fillText("Number of colored Triangles: " + Math.pow(3,x),-cx + 10, -cy +40 + 4*canvas.width/50);
    // ctx.fillText("Number of black Triangles: " + sum(x),-cx + 10, -cy +50 + 5*canvas.width/50);
    ctx.fillText("Number of holes: " + (Math.pow(3,x) - 1)/2,-cx + 10, -cy +50 + 5*canvas.width/50);
    ctx.fillStyle = "black";
  }

  if(iteration > 0) {
    sierpinski([x1,y1],[x4,y4],iteration - 1,false);
    sierpinski([x4,y4],[x2,y2],iteration - 1,false);
    sierpinski([x5,y5],[x6,y6],iteration - 1,false);
  }
}

// function chaos(e) {
//   debugger;
//   let rec = canvas.getBoundingClientRect();
//   mx = e.clientX - rec.left;
//   my = e.clientY - rec.top;
//   console.log(mx + " , " + my)
// }

// function sum(k) {
//   let bt = 0;
//   for (var i = k; i > 0; i--) {
//     bt += Math.pow(3,i-1);
//     console.log( Math.pow(3,k-1))
//   }
//   return bt;
// }
