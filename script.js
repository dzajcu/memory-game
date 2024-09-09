const startButton = document.getElementById("startButton");
const newGameButton = document.getElementById("newGameButton");
const restartButton = document.getElementById("restarButton");
const newGameModal = document.getElementById("newGameModal");
const gameBoard = document.getElementById("gameBoard");
const scoreBoard = document.getElementById("scoreBoard");
let firstTry = true;
let theme, boardSize, playersNumber;
let activePlayer = 0;
const flippedCards = [];
const playersScore = [];
const playerScoreElements = [];
const playerScoreContainerElements = [];

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
/*             <div class="flex justify-between w-52 py-3 px-4 rounded-lg bg-slate-300 font-bold items-center">
                <p class="text-slate-500 tracking-wider text-sm">Player 1</p>
                <p class="text-slate-700 text-3xl">0</p>
            </div> */
function generateBoard(theme, boardSize, playersNumber) {
    gameBoard.innerHTML = "";

    playersScore.length = playersNumber;
    playersScore.fill(0);
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
        memoryCardText.classList.add("opacity-0", "select-none");
        memoryCard.appendChild(memoryCardText);
        gameBoard.appendChild(memoryCard);
        memoryCard.addEventListener("click", () => flipCard(memoryCard, number));
    });

    playersScore.forEach((_, i) => {
        const playerScoreContainer = document.createElement("div");
        playerScoreContainer.className =
            "flex justify-between w-52 py-3 px-4 rounded-lg font-bold items-center transition duration-500";
        activePlayer === i
            ? playerScoreContainer.classList.add("bg-amber-500", "text-white")
            : playerScoreContainer.classList.add("bg-slate-300");
        const playerName = document.createElement("p");
        playerName.className = "tracking-wider text-sm";
        playerName.textContent = `Player: ${i + 1}`;
        const playerScore = document.createElement("p");
        playerScore.className = "text-3xl";
        playerScore.textContent = "0";
        // playerScore.id = `playerScore${i}`;
        playerScoreContainer.appendChild(playerName);
        playerScoreContainer.appendChild(playerScore);
        scoreBoard.appendChild(playerScoreContainer);
        playerScoreElements.push(playerScore);
        playerScoreContainerElements.push(playerScoreContainer);
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
    if (
        flippedCards.length < 2 &&
        !flippedCards.includes(memoryCard) &&
        !memoryCard.classList.contains("matched")
    ) {
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
                flippedCards[0].classList.add(
                    "bg-slate-300",
                    "pointer-events:none",
                    "matched"
                );
                flippedCards[1].classList.remove("bg-amber-500");
                flippedCards[1].classList.add(
                    "bg-slate-300",
                    "pointer-events:none",
                    "matched"
                );
                flippedCards.length = 0;

                playersScore[activePlayer]++;
                updateScore();
            } else {
                setTimeout(() => {
                    animateCard();
                    changeActivePlayer();
                    flippedCards.length = 0;
                }, 1000);
            }
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    return (
        card1.getElementsByTagName("span")[0].textContent ===
        card2.getElementsByTagName("span")[0].textContent
    );
}

function changeActivePlayer() {
    activePlayer = (activePlayer + 1) % playersNumber;
    playerScoreContainerElements.forEach((el, i) => {
        if (activePlayer === i) {
            playerScoreContainerElements[i].classList.remove("bg-slate-300");
            playerScoreContainerElements[i].classList.add(
                "bg-amber-500",
                "text-white"
            );
        } else {
            playerScoreContainerElements[i].classList.remove(
                "bg-amber-500",
                "text-white"
            );
            playerScoreContainerElements[i].classList.add("bg-slate-300");
        }
    });
}

function animateCard() {
    flippedCards[0].getElementsByTagName("span")[0].textContent = "";
    flippedCards[1].getElementsByTagName("span")[0].textContent = "";
    flippedCards[0].getElementsByTagName("span")[0].classList.remove("opacity-100");
    flippedCards[1].getElementsByTagName("span")[0].classList.remove("opacity-100");
    flippedCards[0].classList.remove("bg-amber-500", "animate-flip-y");
    flippedCards[0]
        .getElementsByTagName("span")[0]
        .classList.remove("animate-text-flip-y");
    flippedCards[0].classList.add("bg-slate-700", "animate-flip-back-y");
    flippedCards[0]
        .getElementsByTagName("span")[0]
        .classList.add("animate-text-flip-back-y");

    flippedCards[1].classList.remove("bg-amber-500", "animate-flip-y");
    flippedCards[1]
        .getElementsByTagName("span")[0]
        .classList.remove("animate-text-flip-y");

    flippedCards[1].classList.add("bg-slate-700", "animate-flip-back-y");
    flippedCards[1]
        .getElementsByTagName("span")[0]
        .classList.add("animate-text-flip-back-y");
}

function updateScore() {
    playersScore.forEach((score, i) => {
        playerScoreElements[i].textContent = score;
    });
}
