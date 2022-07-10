const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const clear = document.querySelector('.clear');
let size = document.querySelector('.slider');
let green = document.querySelector('.green');
let yellow = document.querySelector('.yellow');
let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
let orange = document.querySelector('.orange');
let black = document.querySelector('.black');
let rby = document.querySelector('.rby');
let coords = {x:0, y:0};
let touchCoords = {x:0, y:0};
// let {x,y} = {0,0};
let hue = 0;
let drawing = false;
let colors = "";
let colorInt;

// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerHeight;


window.addEventListener('load', (e) => {
  e.preventDefault();
  canvas.addEventListener('mousedown', initial);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);
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
rby.addEventListener('click', multiColor)

function initial(event) {
  mousePosition(event);
  drawing = true;
}

function draw(event) {
  if (drawing == false) return;
  ctx.beginPath();
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // hue++;
  // multiColor();
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
    clearInterval(colorInt);
  }
}

function initialTouch(e) {
  e.preventDefault();
  [...e.changedTouches].forEach(touch => {
    touchPosition(touch);
    console.log(touchCoords);
    ctx.beginPath();
    ctx.lineWidth = size.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colors;
    
  })
  drawing = true;
}

function drawTouch(e) {
  if (drawing === false) return;
  [...e.changedTouches].forEach( touch => {
    ctx.moveTo(touch.pageX,touch.pageY);
    touchPosition(touch);
    ctx.lineTo(touchCoords.x,touchCoords.y);
    ctx.stroke();
    ctx.closePath();
  })
    

  
  
}

function touchPosition(touch) {
  touchCoords.x = touch.pageX;
  touchCoords.y = touch.pageY;
  // console.log(x,y);
}

function stopTouch(e) {
  if (drawing === true) {
    drawing = false;
    touchCoords.x = 0;
    touchCoords.y = 0;
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
  // console.log(e.composedPath()[0].classList[0]);
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
  } else if(e.composedPath()[0].classList[0] === "rby") {
    // colorInt = setInterval(multiColor(), 10)
    // multiColor();
    return colors;
  }
}

function multiColor() {
  // hue++;
  colorInt = setInterval( () => {
    hue++;
  }, 10)
  colors = `hsl(${hue},100%,50%)`;
  console.log(colors);
  return colors;
}