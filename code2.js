const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const clear = document.querySelector('.clear');
let size = document.querySelector('.slider');
let colors = docuemnt.querySelector('.')
let coords = {x: 0, y:0};
let drawing = false;


// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerHeight;


window.addEventListener('load', () => {
  // document.addEventListener('mousedown', initial);
  canvas.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', stop);
  size.defaultValue = 1;

    
})

size.addEventListener('click', sizeSetting)
clear.addEventListener('click', clearCanvas)

// function initial(event) {
//   mousePosition(event);
//   drawing = true;
// }

function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.moveTo(coords.x,coords.y);
  mousePosition(event)
  console.log(coords);
  ctx.lineTo(coords.x,coords.y);
  ctx.stroke();
}

function mousePosition(event) {
  coords.x = event.offsetX;
  coords.y = event.offsetY;
}

function stop() {
  drawing=false;
}

function sizeSetting() {
  console.log(size.value);
  return size.value;
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function colorSetting() {
  console.log(colors);
}
