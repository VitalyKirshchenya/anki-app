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

    // Reset the flip state to ensure the front side is shown first
    flashcard.classList.remove('flipped');

    // Update the content of the flashcard
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
    // Initialize the first flashcard
    updateFlashcard();

    // Add event listener to flip the card on click
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    // Navigate to the next card
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', showNextCard);

    // Navigate to the previous card
    const prevButton = document.getElementById('prev'); // Ensure you have a button with id="prev" in your HTML
    if (prevButton) {
        prevButton.addEventListener('click', showPreviousCard);
    }

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNextCard();
        if (e.key === 'ArrowLeft') showPreviousCard();
    });
});
