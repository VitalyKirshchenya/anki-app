// /mnt/data/flashcard_app/script.js
const flashcards = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest mammal?", answer: "Blue Whale" }
];

let currentCardIndex = 0;

function updateFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const front = flashcard.querySelector('.front');
    const back = flashcard.querySelector('.back');

    // Reset the flip state
    flashcard.classList.remove('flipped');

    // Set new content
    front.textContent = flashcards[currentCardIndex].question;
    back.textContent = flashcards[currentCardIndex].answer;
}

function showNextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    updateFlashcard();
}

function showPreviousCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    updateFlashcard();
}

document.addEventListener('DOMContentLoaded', () => {
    updateFlashcard(); // Initialize the first flashcard

    document.getElementById('flashcard').addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    document.getElementById('next').addEventListener('click', showNextCard);

    // Add previous button event listener
    document.getElementById('prev').addEventListener('click', showPreviousCard);

    // Optional: Implement keyboard shortcuts for navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNextCard();
        if (e.key === 'ArrowLeft') showPreviousCard();
    });
});
