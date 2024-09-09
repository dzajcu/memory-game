const startButton = document.getElementById("startButton");
const newGameButton = document.getElementById("newGameButton");
const restartButton = document.getElementById("restarButton");
const newGameModal = document.getElementById("newGameModal");
const gameBoard = document.getElementById("gameBoard");
let firstTry = true;
let theme, boardSize, playersNumber;
const flippedCards = [];

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
    if (boardSize === 4) {
        gameBoard.classList.remove("grid-cols-[repeat(6,max-content)]");
        gameBoard.classList.add("grid-cols-[repeat(4,max-content)]");
    } else {
        gameBoard.classList.remove("grid-cols-[repeat(4,max-content)]");
        gameBoard.classList.add("grid-cols-[repeat(6,max-content)]");
    }
    generatedCardNumbers.forEach((number, i) => {
        const memoryCard = document.createElement("div");
        memoryCard.className =
            "bg-slate-700 p-4 rounded-full flex justify-center items-center text-white font-bold";
        boardSize === 4
            ? memoryCard.classList.add("w-20", "h-20", "text-4xl")
            : memoryCard.classList.add("w-16", "h-16", "text-3xl");
        memoryCard.dataset.index = i;
        // memoryCard.textContent = number;
        const memoryCardText = document.createElement("span");
        memoryCardText.classList.add("opacity-0");
        memoryCard.appendChild(memoryCardText);
        gameBoard.appendChild(memoryCard);
        memoryCard.addEventListener("click", () => flipCard(memoryCard, number));
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
        const value = Math.floor(Math.random() * 30) + 1;
        if (!numbers.includes(value)) numbers.push(value);
    }
    return shuffleArray([...numbers, ...numbers]);
}

function flipCard(memoryCard, number) {
    const index = memoryCard.dataset.index;
    if (flippedCards.length < 2 && !flippedCards.includes(memoryCard)) {
        memoryCard.classList.remove("bg-slate-700");
        memoryCard.classList.add(
            "bg-amber-500",
            "transform",
            "animate-flip-y",
            "transition-colors",
            "duration-50",
            "delay-300"
        );
        memoryCard
            .getElementsByTagName("span")[0]
            .classList.add("transform", "animate-text-flip-y");
        memoryCard.getElementsByTagName("span")[0].textContent = number;
        setTimeout(() => {
            memoryCard.getElementsByTagName("span")[0].classList.add("opacity-100");
        }, 300);
        flippedCards.push(memoryCard);

        if (flippedCards.length === 2) {
            if (checkMatch()) {
                flippedCards[0].classList.remove("bg-amber-500");
                flippedCards[0].classList.add("bg-slate-300");
                flippedCards[1].classList.remove("bg-amber-500");
                flippedCards[1].classList.add("bg-slate-300");
                flippedCards.length = 0;
            } else {
                setTimeout(() => {
                    flippedCards[0].getElementsByTagName("span")[0].textContent = "";
                    flippedCards[1].getElementsByTagName("span")[0].textContent = "";
                    flippedCards[0]
                        .getElementsByTagName("span")[0]
                        .classList.remove("opacity-100");
                    flippedCards[1]
                        .getElementsByTagName("span")[0]
                        .classList.remove("opacity-100");
                    flippedCards[0].classList.remove(
                        "bg-amber-500",
                        "animate-flip-y"
                    );
                    flippedCards[0]
                        .getElementsByTagName("span")[0]
                        .classList.remove("animate-text-flip-y");
                    flippedCards[0].classList.add(
                        "bg-slate-700",
                        "animate-flip-back-y"
                    );
                    flippedCards[0]
                        .getElementsByTagName("span")[0]
                        .classList.add("animate-text-flip-back-y");

                    flippedCards[1].classList.remove(
                        "bg-amber-500",
                        "animate-flip-y"
                    );
                    flippedCards[1]
                        .getElementsByTagName("span")[0]
                        .classList.remove("animate-text-flip-y");

                    flippedCards[1].classList.add(
                        "bg-slate-700",
                        "animate-flip-back-y"
                    );
                    flippedCards[1]
                        .getElementsByTagName("span")[0]
                        .classList.add("animate-text-flip-back-y");

                    flippedCards.length = 0;
                }, 1000);
            }
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    /* ... */
    return (
        card1.getElementsByTagName("span")[0].textContent ===
        card2.getElementsByTagName("span")[0].textContent
    );
}
