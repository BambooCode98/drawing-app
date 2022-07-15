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
let eraserSq = document.querySelector('.eraserSquare');
let eraserC = document.querySelector('.eraserCircle');
let download = document.querySelector('.download');
let menubars = document.querySelector('.menubars');
let menu = document.querySelector('.menu');
const auto = document.querySelector('.auto');
const stopAuto = document.querySelector('.stopAuto');
let speed = document.querySelector('.speed');
let coords = {x:0, y:0};
let touchCoords = {x:0, y:0};
let [dx,dy] = [0,0];

let [x,y] = [0,0];
let autoPoints = [];
let autoDrawing = false;
let hue = 0;
let drawing = false;
let colors = "";
let colorInt;
let autoInt;
let lineEnd = "";



window.addEventListener('load', (e) => {
  e.preventDefault();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  canvas.addEventListener('mousedown', initial);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('touchstart', initialTouch);
  canvas.addEventListener('touchmove', drawTouch);
  canvas.addEventListener('touchend', stopTouch);
  size.defaultValue = 1;

    
})

screen.orientation.addEventListener('change', (e) => {
  e.preventDefault();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  menu.style.height = `${window.innerHeight/1.25}px`;
  menu.style.width = `${window.innerWidth/1.8}px`;
})

size.addEventListener('click', sizeSetting)
clear.addEventListener('click', clearCanvas)
green.addEventListener('click', colorChanger)
blue.addEventListener('click', colorChanger)
yellow.addEventListener('click', colorChanger)
orange.addEventListener('click', colorChanger)
red.addEventListener('click', colorChanger)
black.addEventListener('click', colorChanger)
eraserSq.addEventListener('click', colorChanger)
eraserC.addEventListener('click', colorChanger)
rby.addEventListener('click', multiColor)
auto.addEventListener('click', autoDraw)
stopAuto.addEventListener('click', stopAutoDraw)

// speed.addEventListener('click', () => {
//   console.log(speed.value);
//   let points = speed.value;
//   if(autoPoints.length === 10) {
//     return autoPoints;
//   } else {
//     autoPoints.push(points);
//     console.log(autoPoints);
//     return autoPoints;
//   }

// })

download.addEventListener('click', (e) => {
  let canvasURL = canvas.toDataURL('yourDrawing/png','1');
  const createAnchor = document.createElement('a');
  createAnchor.href = canvasURL;
  createAnchor.download = "yourDrawing.png";
  createAnchor.click();
  createAnchor.remove();
})

menubars.addEventListener('click', () => {
  if(menu.style.display === '') {
    menu.style.display = 'flex';
    if(window.innerWidth >= 650) {
      menu.style.width = `${window.innerWidth/2.5}px`
    } else {
      menu.style.width = `${window.innerWidth/1.8}px`;
    }
    menu.style.height = `${window.innerHeight/1.25}px`;
    menubars.style.color = 'white';
  } else if(menu.style.display === 'flex') {
    menu.style.display = '';
    menubars.style.color = 'black';

  }
})

function initial(event) {
  mousePosition(event);
  drawing = true;
  ctx.beginPath();
  ctx.lineWidth = size.value;
  if(lineEnd === "square") {
    ctx.lineCap = "square";
  } else {
    ctx.lineCap = "round";
  }
  ctx.lineJoin = "round";
  ctx.strokeStyle = colors;
  ctx.moveTo(coords.x,coords.y);
  mousePosition(event)
  ctx.lineTo(event.offsetX,event.offsetY);
  ctx.stroke();
}

function draw(event) {
  if (drawing == false) return;
  ctx.beginPath();
  ctx.lineWidth = size.value;
  if(lineEnd === "square") {
    ctx.lineCap = "square";
  } else {
    ctx.lineCap = "round";
  }
  ctx.lineJoin = "round";
  ctx.strokeStyle = colors;
  ctx.moveTo(coords.x,coords.y);
  mousePosition(event)
  ctx.lineTo(event.offsetX,event.offsetY);
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
    lineEnd = "round";
  }
}

function initialTouch(e) {
  e.preventDefault();
  [...e.targetTouches].forEach(touch => {
    
    [touchCoords.x,touchCoords.y] = [touch.pageX,touch.pageY]
    ctx.beginPath();
    ctx.lineWidth = size.value;
    if(lineEnd === "square") {
      ctx.lineCap = "square";
    } else {
      ctx.lineCap = "round";
    }
    ctx.lineJoin = "round";
    ctx.strokeStyle = colors;
    ctx.moveTo(touchCoords.x,touchCoords.y);
    ctx.lineTo(touch.pageX,touch.pageY);
    ctx.stroke();
    
  })
  drawing = true;
}

function drawTouch(e) {
  if (drawing === false) return;
  [...e.targetTouches].forEach( touch => {
    ctx.beginPath();
    ctx.lineWidth = size.value;
    if(lineEnd === "square") {
      ctx.lineCap = "square";
    } else {
      ctx.lineCap = "round";
    }
    ctx.lineJoin = "round";
    ctx.strokeStyle = colors;
    ctx.moveTo(touchCoords.x,touchCoords.y);
    ctx.lineTo(touch.pageX,touch.pageY);
    ctx.stroke();
    ctx.closePath();
    [touchCoords.x,touchCoords.y] = [touch.pageX,touch.pageY];
  })
    

  
  
}

function touchPosition(touch) {
  touchCoords.x = touch.pageX;
  touchCoords.y = touch.pageY;
}

function stopTouch(e) {
  if (drawing === true) {
    drawing = false;
    touchCoords.x = 0;
    touchCoords.y = 0;
    lineEnd = "round";
    
  }
}

function sizeSetting() {
  return size.value;
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function colorChanger(e) {
  if(e.composedPath()[0].classList[0] === "green") {
    clearInterval(colorInt);
    colors = "green";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "red") {
    clearInterval(colorInt);
    colors = "red";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "orange") {
    clearInterval(colorInt);
    colors = "orange";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "yellow") {
    clearInterval(colorInt);
    colors = "yellow";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "blue") {
    clearInterval(colorInt);
    colors = "blue";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "black") {
    clearInterval(colorInt);
    colors = "black";
    return colors;
  } else if(e.composedPath()[0].classList[0] === "eraserSquare") {
    clearInterval(colorInt);
    colors = "white";
    lineEnd = 'square';
    return colors;
  }  else if(e.composedPath()[0].classList[0] === "eraserCircle") {
    clearInterval(colorInt);
    colors = "white";
    lineEnd = 'circle';
    return colors;
  } 
}

function multiColor() {
  colorInt = setInterval( () => {
    hue++;
    colors = `hsl(${hue},100%,50%)`;
    return colors;
  }, 10)
}

//autoDraw section

function autoDraw() {
  autoDrawing = true;
  [x,y] = [canvas.width/2, canvas.height/2];
  [dx,dy] = [Math.random()*10,Math.random()*10];
  if(autoDrawing === false) {
    console.log('not drawing');
    return;
  } else {
    console.log('drawing');
    
    autoInt = setInterval( () => {
      ctx.beginPath();
      ctx.lineWidth = size.value;
      if(lineEnd === "square") {
        ctx.lineCap = "square";
      } else {
        ctx.lineCap = "round";
      }
      ctx.lineJoin = "round";
      ctx.strokeStyle = colors;
      ctx.moveTo(x,y);
      if(y + dy < 0 || y + dy > canvas.height) {
        dy = -dy;
      }
      if(x < 0 || x > canvas.width) {
        dx = -dx;
      }
      x += dx;
      y += dy;
      ctx.lineTo(x,y);
      ctx.stroke();
    }, 10)
    
    auto.removeEventListener('click', autoDraw);
    
  }
}

function stopAutoDraw() {
  clearInterval(autoInt)
  autoDrawing = false;
  console.log('stopping');
  auto.addEventListener('click', autoDraw);
}