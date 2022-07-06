const gridContainerBox = document.getElementsByClassName("gridcontainer");
const slider = document.querySelector('.slider');
const update = document.querySelector('.update');


// console.log(gridContainerBox);
let gridSquare = document.createElement("div");
gridSquare.setAttribute("id", "gridbox");
let resetButton = document.getElementById("reset");


function createBoxes(maxBoxes) { 
    
    for(i = 0; i < maxBoxes; i++ ) {
        let gridSquare = document.createElement("div");
        gridContainerBox[0].appendChild(gridSquare);
        gridSquare.setAttribute("id", "gridbox");
        gridSquare.addEventListener("mouseover", hover);
    }
    
}

resetButton.addEventListener("click", reloadPage);

function hover() {
    this.style.backgroundColor = randomColor();
}

function reloadPage() {
    location.reload();
}

function randomColor() {
    let rand = Math.floor(Math.random() * 10);
    if (rand < 1) {
        return "yellow";
    } else if (rand >= 1 && rand < 2) {
        return "green";
    } else if (rand >= 2 && rand < 3) {
        return "blue";
    } else if (rand >= 3 && rand < 4) {
        return "red";
    } else if (rand >= 4 && rand < 5) {
        return "black";
    } else if (rand >= 5 && rand < 6) {
        return "light blue";
    } else if (rand >= 6 && rand < 7) {
        return "orange";
    } else if (rand >= 7 && rand < 8) {
        return "pink";
    } else if (rand >= 8 && rand < 9) {
        return "purple";
    } else if (rand >= 9 && rand < 10) {
        return "light green";
    }
}

// update.addEventListener('click', () => {
//     console.log(slider.value);
//     gridSquare.style.display = "none";
//     createBoxes(slider.value);
// })


//as long as the number of boxes ends in a 0 it will fill the container
createBoxes(50);