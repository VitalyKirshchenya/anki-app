const flashcards = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is the largest mammal?", answer: "Blue Whale" }
];

let currentCardIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 150; // Minimum distance (in pixels) for a swipe to trigger a card change.

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

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchMove(e) {
    const touchMoveX = e.changedTouches[0].screenX;
    const moveDistance = touchMoveX - touchStartX;
    const flashcard = document.getElementById('flashcard');

    // Move the card with the finger
    flashcard.style.transform = `translateX(${moveDistance}px)`;

    // Optionally, you can add some rotation based on the move distance for a more dynamic effect
    const rotation = moveDistance / 20; // Adjust rotation sensitivity as needed
    flashcard.style.transform += ` rotate(${rotation}deg)`;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;

    // Check if it was a swipe or a click
    if (Math.abs(touchEndX - touchStartX) < swipeThreshold) {
        // It's a click, toggle the flip class
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        // Reset any transformations applied during swipe
        flashcard.style.transform = 'none';
    } else {
        // It's a swipe, handle the swipe gesture
        handleSwipeGesture();
    }
}

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) >= swipeThreshold) {
        if (swipeDistance < 0) {
            // Swipe left: Show next card with an animation
            animateCardOut('left');
        } else {
            // Swipe right: Show previous card with an animation
            animateCardOut('right');
        }
    } else {
        // Not a full swipe, return card to original position
        const flashcard = document.getElementById('flashcard');
        flashcard.style.transform = 'translateX(0px) rotate(0deg)';
    }
}

function animateCardOut(direction) {
    const flashcard = document.getElementById('flashcard');
    const outPosition = direction === 'left' ? '-100vw' : '100vw';
    flashcard.style.transition = 'transform 0.3s ease-out';
    flashcard.style.transform = `translateX(${outPosition})`;

    // Wait for the animation to finish before showing the next card
    flashcard.addEventListener('transitionend', () => {
        if (direction === 'left') {
            showNextCard();
        } else {
            showPreviousCard();
        }
        // Reset the card's position and remove the transition for instant update
        flashcard.style.transition = '';
        flashcard.style.transform = 'translateX(0px) rotate(0deg)';
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the first flashcard
    updateFlashcard();

    const flashcard = document.getElementById('flashcard');

    // Prevent the default behavior of the click event on mobile devices
    flashcard.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // Add touch event listeners for swipe functionality
    flashcard.addEventListener('touchstart', handleTouchStart, false);
    flashcard.addEventListener('touchmove', handleTouchMove, false);
    flashcard.addEventListener('touchend', handleTouchEnd, false);

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNextCard();
        if (e.key === 'ArrowLeft') showPreviousCard();
    });
});
