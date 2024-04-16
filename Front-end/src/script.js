const questionsAndAnswers = [
    {
        question: "What has keys but can't open locks?",
        answer: "A piano"
    },
    {
        question: "What can travel around the world while staying in a corner?",
        answer: "A stamp"
    },
    {
        question: "What has a head, a tail, is brown, and has no legs?",
        answer: "A penny"
    },
    {
        question: "The more you take, the more you leave behind. What am I?",
        answer: "Footsteps"
    },
    {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "An echo"
    },
    {
        question: "I'm light as a feather, but even the world's strongest man couldn't hold me for much longer than a minute. What am I?",
        answer: "Breath"
    },
    {
        question: "The person who makes it, sells it. The person who buys it, never uses it. The person who uses it, never knows they're using it. What is it?",
        answer:"Coffin"
    },
    {
        question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        answer: "Candle"
    },
    {
        question: "What has a neck but no head?",
        answer: "A bottle"
    },
    {
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        answer: "The letter 'M'"
    },
    {
        question: "What gets wetter as it dries?",
        answer: "A towel"
    }
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

    // Fetch a random question from questionsAndAnswers
    const questionIndex = Math.floor(Math.random() * questionsAndAnswers.length);
    const { question, answer } = questionsAndAnswers[questionIndex];

    // Prompt the player to solve the riddle
    const playerAnswer = prompt(question);

    // Log player's answer to check
    console.log("Player's answer:", playerAnswer);

    // Validate the player's answer
    if (playerAnswer && playerAnswer.trim().toLowerCase() === answer.toLowerCase()) {
        // Call updateCell with the clicked cell and its index
        updateCell(this, cellIndex);
        checkWinner();
    } else {
        // Skip the player's turn if they get the riddle wrong
        changePlayer();
        alert("Incorrect answer! Your turn is skipped.");
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
