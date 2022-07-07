const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const clear = document.querySelector('.clear');
let size = document.querySelector('.slider');
// let colors = document.querySelector('.color');
let green = document.querySelector('.green');
let yellow = document.querySelector('.yellow');
let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
let orange = document.querySelector('.orange');
let black = document.querySelector('.black');
let coords = {x:0, y:0};
let touchCoords = {x:0, y:0};
let touchX = 0;
let id = [];
let drawing = false;
let colors = "";

// console.log(green);
// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerHeight;


window.addEventListener('load', (e) => {
  e.preventDefault();
  document.addEventListener('mousedown', initial);
  canvas.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', stop);
  canvas.addEventListener('touchstart', initialTouch);
  canvas.addEventListener('touchmove', drawTouch);
  canvas.addEventListener('touchend', stopTouch);
  size.defaultValue = 1;

    
})

size.addEventListener('click', sizeSetting)
clear.addEventListener('click', clearCanvas)
green.addEventListener('click', colorChanger)
blue.addEventListener('click', colorChanger)
yellow.addEventListener('click', colorChanger)
orange.addEventListener('click', colorChanger)
red.addEventListener('click', colorChanger)
black.addEventListener('click', colorChanger)

function initial(event) {
  mousePosition(event);
  drawing = true;
}

function draw(event) {
  if (drawing == false) return;
  ctx.beginPath();
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = colors;
  ctx.moveTo(coords.x,coords.y);
  mousePosition(event)
  ctx.lineTo(coords.x,coords.y);
  ctx.stroke();
}

function mousePosition(event) {
  coords.x = event.offsetX;
  coords.y = event.offsetY;
}

function stop() {
  if (drawing === true) {
    drawing = false;
    coords.x = 0;
    coords.y = 0;
  }
}

function initialTouch(e) {
  e.preventDefault();
  [...e.changedTouches].forEach(touch => {
    // console.log(id);
    touchPosition(touch);
  })
  drawing = true;
}

function drawTouch(e) {
  if (drawing === false) return;
  // console.log(e.targetTouches[0]);
  // id = e.changedTouches;
  // console.log(id);
  
  [...e.changedTouches].forEach( touch => {
    console.log(touch.pageY);
    ctx.beginPath();
    ctx.lineWidth = size.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colors;
    ctx.moveTo(touch.pageX,touch.pageY);
    // [...e.changedTouches].forEach(touch => {
    //   touchPosition(touch);
    // })
    ctx.lineTo(touch.pageX,touch.pageY);
    ctx.stroke();
  })
    

  
  
}

function touchPosition(touch) {
  touchCoords.x = touch.pageX;
  touchCoords.y = touch.pageY;
}

function stopTouch(e) {
  if (drawing === true) {
    drawing = false;
    // touchCoords.x = 0;
    // touchCoords.y = 0;
    // [...e.changedTouches].forEach( touch => {

    // })
  }
}

function sizeSetting() {
  return size.value;
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function colorChanger(e) {
  console.log(e.composedPath()[0].classList[0]);
  if(e.composedPath()[0].classList[0] === "green") {
    colors = "green";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "red") {
    colors = "red";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "orange") {
    colors = "orange";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "yellow") {
    colors = "yellow";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "blue") {
    colors = "blue";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "black") {
    colors = "black";
    return colors;
  }
}
