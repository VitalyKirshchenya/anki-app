// /mnt/data/flashcard_app/script.js
const flashcards = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest mammal?", answer: "Blue Whale" }
];

let currentCardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function updateFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const front = flashcard.querySelector('.front');
    const back = flashcard.querySelector('.back');

    // Ensure the front side is shown first when navigating cards
    flashcard.style.transform = 'rotateY(0deg)';
    flashcard.classList.remove('flipped');

    front.textContent = flashcards[currentCardIndex].question;
    back.textContent = flashcards[currentCardIndex].answer;
}

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) return; // Ignore short swipes

    if (swipeDistance > 0) {
        currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    } else {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    }
    updateFlashcard();
}

document.addEventListener('DOMContentLoaded', () => {
    updateFlashcard();

    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    flashcard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    flashcard.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
});
