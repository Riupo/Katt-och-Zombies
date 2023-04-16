const gameGrid = document.querySelector(".game-grid");
const currentCell = document.querySelector(".current-cell");
const cellImage = document.querySelector(".cell-image");

const images = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png",
    "images/9.png",
    "images/10.png",
    "images/11.png",
    "images/12.png",
    "images/13.png",
    "images/14.png",
    "images/15.png",
    "images/16.png",
    "images/17.png",
    "images/18.png",
    "images/19.png",
    "images/20.png",
    "images/21.png",
    "images/22.png",
    "images/23.png",
    "images/24.png",
    "images/25.png",
];
// Create the grid
for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "game-cell";
    cell.dataset.index = i;
    gameGrid.appendChild(cell);
}


// Set the starting position
let playerPosition = 12;
let catPosition;
let zombiePosition;
let score = 0;
gameGrid.children[playerPosition].classList.add("player");
currentCell.textContent = `Nuvarande ruta: ${playerPosition + 1}`;

function updateScore(change) {
    score += change;
    document.querySelector(".score").textContent = `Poäng: ${score}`;

    // Visa kattbilden när du får poäng
    if (change > 0) {
        const catImage = document.querySelector(".katt-image");
        catImage.style.display = "block";
    }
    if (change < 0){
        const zombieImage = document.querySelector(".zombie-image");
        zombieImage.style.display = "block";
    }
}

function generateRandomZombiePosition() {
    do {
        zombiePosition = Math.floor(Math.random() * 25);
    } while (zombiePosition === playerPosition || zombiePosition === catPosition);
}

function updateZombieImage( ) {
    const zombieImage = document.querySelector(".zombie-image");
    if (playerPosition === zombiePosition) {
        zombieImage.style.display = "block";
    } else {
        zombieImage.style.display = "none";
    }
}

generateRandomZombiePosition();

function generateRandomCatPosition() {
    do {
        catPosition = Math.floor(Math.random() * 25);
    } while (catPosition === playerPosition);
}

function updateCatImage() {
    const catImage = document.querySelector(".katt-image");
    if (playerPosition === catPosition) {
        catImage.style.display = "block";
    } else {
        catImage.style.display = "none";
    }
}

generateRandomCatPosition();

function movePlayer(newPosition, steps = 1) {
    if (Math.abs(newPosition - playerPosition) === steps || Math.abs(newPosition - playerPosition) === 5 * steps) {
        gameGrid.children[playerPosition].classList.remove("player");
        playerPosition = newPosition;
        gameGrid.children[playerPosition].classList.add("player");
        currentCell.textContent = `Nuvarande ruta: ${playerPosition + 1}`;
        cellImage.src = images[playerPosition];
        cellImage.style.display = "block";

        // Check if the player moves to the cat's position
        if (playerPosition === catPosition) {
            updateScore(1); // Update the score
            generateRandomCatPosition(); // Set a new random cat position
        } else {
            const catImage = document.querySelector(".katt-image");
            catImage.style.display = "none";
        }

        if (playerPosition === zombiePosition) {
            updateScore(-1); // Deduct 1 point from the score
            generateRandomZombiePosition(); // Set a new random zombie position
        } else {
            const zombieImage = document.querySelector(".zombie-image");
            zombieImage.style.display = "none";
        }
    }
}



// Handle keyboard input
document.addEventListener("keydown", (event) => {
    if (event.key === "s" && playerPosition < 20) {
        movePlayer(playerPosition + 5);
    } else if (event.key === "v" && playerPosition % 5 !== 0) {
        movePlayer(playerPosition - 1);
    } else if (event.key === "n" && playerPosition > 4) {
        movePlayer(playerPosition - 5);
    } else if (event.key === "ö" && playerPosition % 5 !== 4) {
        movePlayer(playerPosition + 1);
    }
});

// Handle mouse click
gameGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("game-cell")) {
        const newPosition = parseInt(event.target.dataset.index);
        movePlayer(newPosition);
    }
});

const controlButtons = document.querySelectorAll(".control-button");

controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("up") && playerPosition > 4) {
            movePlayer(playerPosition - 5);
        } else if (button.classList.contains("left") && playerPosition % 5 !== 0) {
            movePlayer(playerPosition - 1);
        } else if (button.classList.contains("down") && playerPosition < 20) {
            movePlayer(playerPosition + 5);
        } else if (button.classList.contains("right") && playerPosition % 5 !== 4) {
            movePlayer(playerPosition + 1);
        }
    });
});

generateRandomCatPosition();
updateCatImage();
updateZombieImage();    