// Mock database of riddles
const riddles = [
    { question: "What has keys but can't open locks?", answer: "A piano" },
    { question: "What can travel around the world while staying in a corner?", answer: "A stamp" },
    { question: "What has a head, a tail, is brown, and has no legs?", answer: "A penny" }
];

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    console.log("Cell clicked");

    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    // Fetch a random riddle
    const riddleIndex = Math.floor(Math.random() * riddles.length);
    const riddle = riddles[riddleIndex];
    console.log("Riddle:", riddle);

    // Display the riddle question
    document.getElementById("riddleQuestion").textContent = riddle.question;
    console.log("Riddle question displayed:", riddle.question);

    // Prompt the player to solve the riddle
    const answer = prompt(riddle.question);

    // Validate the player's answer
    if (answer && answer.trim().toLowerCase() === riddle.answer.toLowerCase()) {
        updateCell(this, cellIndex);
        checkWinner();
    } else {
        alert("Incorrect answer! You must solve the riddle to make a move.");
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        } if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
