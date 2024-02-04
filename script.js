// /mnt/data/flashcard_app/script.js
const flashcards = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest mammal?", answer: "Blue Whale" }
];

let currentCardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function updateFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const front = flashcard.querySelector('.front');
    const back = flashcard.querySelector('.back');

    // Reset the flip state and position to ensure the front side is shown first and the card is centered
    flashcard.classList.remove('flipped');
    flashcard.style.transform = 'rotateY(0deg) translateX(0px)';

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

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    // Prevent default swiping behavior to allow custom handling
    e.preventDefault();

    const touchMoveX = e.touches[0].clientX;
    const touchMoveY = e.touches[0].clientY;

    // Calculate how far we've swiped
    const moveX = touchMoveX - touchStartX;
    const moveY = touchMoveY - touchStartY;

    // Only apply movement along the X-axis to simulate a card swipe
    if (Math.abs(moveX) > Math.abs(moveY)) {
        const flashcard = document.getElementById('flashcard');
        flashcard.style.transition = 'none'; // Disable transitions to make movement track finger in real-time
        flashcard.style.transform = `translateX(${moveX}px)`;
    }
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;

    const moveX = touchEndX - touchStartX;
    const flashcard = document.getElementById('flashcard');

    // Apply a transition when the touch ends to smooth out the return movement or continue to the next card
    flashcard.style.transition = 'transform 0.3s ease-out';

    // Determine if the swipe was significant enough to change the card
    if (Math.abs(moveX) > 50) { // 50px threshold for swipe action
        if (moveX > 0) {
            showPreviousCard();
        } else {
            showNextCard();
        }
    } else {
        // Reset the card position if not swiped far enough
        flashcard.style.transform = 'rotateY(0deg) translateX(0px)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the first flashcard
    updateFlashcard();

    // Add event listeners for swipe functionality
    const flashcard = document.getElementById('flashcard');
    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });
    flashcard.addEventListener('touchstart', handleTouchStart, false);
    flashcard.addEventListener('touchmove', handleTouchMove, false);
    flashcard.addEventListener('touchend', handleTouchEnd, false);
});
