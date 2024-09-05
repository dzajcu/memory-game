const startButton = document.getElementById("startButton");
const newGameButton = document.getElementById("newGameButton");
const restartButton = document.getElementById("restarButton");
const newGameModal = document.getElementById("newGameModal");
let firstTry = true;

document.addEventListener("DOMContentLoaded", () => {
    newGameModal.showModal();
});
newGameModal.addEventListener("keydown", (e) => {
    if (firstTry && e.key === "Escape") e.preventDefault();
});
newGameModal.addEventListener("close", () => (firstTry = false));

newGameButton.addEventListener("click", () => newGameModal.showModal());

function getSelectedOptions() {
    const selectedOption1 = document.querySelector('input[name="option1"]:checked')
        .nextElementSibling.textContent;
    const selectedOption2 = document.querySelector('input[name="option2"]:checked')
        .nextElementSibling.textContent;
    const selectedOption3 = document.querySelector('input[name="option3"]:checked')
        .nextElementSibling.textContent;

    console.log(selectedOption1, selectedOption2, selectedOption3);
}

startButton.addEventListener("click", getSelectedOptions);
