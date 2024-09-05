const startButton = document.getElementById("startButton");
const newGameButton = document.getElementById("newGameButton");
const restartButton = document.getElementById("restarButton");
const newGameModal = document.getElementById("newGameModal");
const gameBoard = document.getElementById("gameBoard");
let firstTry = true;
let theme, boardSize, playersNumber;

document.addEventListener("DOMContentLoaded", () => {
    newGameModal.showModal();
});
newGameModal.addEventListener("keydown", (e) => {
    if (firstTry && e.key === "Escape") e.preventDefault();
});
newGameModal.addEventListener("close", () => (firstTry = false));
startButton.addEventListener("click", getSelectedOptions);
newGameButton.addEventListener("click", () => newGameModal.showModal());

function getSelectedOptions() {
    theme =
        document.querySelector('input[name="option1"]:checked').nextElementSibling
            .textContent === "Numbers"
            ? "numbers"
            : "icons";

    const players = Number(
        document.querySelector('input[name="option2"]:checked').nextElementSibling
            .textContent
    );
    playersNumber =
        players === 1
            ? 1
            : players === 2
            ? 2
            : players === 3
            ? 3
            : players === 4
            ? 4
            : 0;

    boardSize =
        document.querySelector('input[name="option3"]:checked').nextElementSibling
            .textContent === "4x4"
            ? 4
            : 6;
    generateBoard(theme, boardSize, playersNumber);
}

// const memoryCard =
//     '<div class="bg-slate-700 p-4 rounded-full w-20 h-20 flex justify-center items-center text-white font-bold text-4xl">1</div>';

function generateBoard(theme, boardSize, playersNumber) {
    gameBoard.innerHTML = "";
    const generatedCardNumbers = generateCardNumbers(boardSize);
    boardSize === 4
        ? gameBoard.classList.add("grid-cols-[repeat(4,max-content)]")
        : gameBoard.classList.add("grid-cols-[repeat(6,max-content)]");
    generatedCardNumbers.forEach((number, i) => {
        const memoryCard = document.createElement("div");
        memoryCard.className =
            "bg-slate-700 p-4 rounded-full  flex justify-center items-center text-white font-bold ";
        boardSize === 4
            ? memoryCard.classList.add("w-20", "h-20", "text-4xl")
            : memoryCard.classList.add("w-16", "h-16", "text-3xl");
        memoryCard.dataset.index = i;
        memoryCard.textContent = number;
        gameBoard.appendChild(memoryCard);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateCardNumbers(boardSize) {
    const numbers = [];

    while (numbers.length < boardSize ** 2 / 2) {
        const value = Math.floor(Math.random() * 20) + 1;
        if (!numbers.includes(value)) numbers.push(value);
    }
    return shuffleArray([...numbers, ...numbers]);
}

/*
            <div id="gameBoard" class="w-max grid grid-cols-[repeat(4,max-content)] gap-4">
                <div class="bg-slate-700 p-4 rounded-full w-20 h-20 flex justify-center items-center text-white font-bold text-4xl">1</div> */
