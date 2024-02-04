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
    const flashcard = document.getElementById('flashcard');

    if (Math.abs(swipeDistance) > 50) { // Swipe threshold
        const directionMultiplier = swipeDistance > 0 ? 1 : -1;
        const nextCardIndex = swipeDistance > 0 ? 
            (currentCardIndex - 1 + flashcards.length) % flashcards.length : 
            (currentCardIndex + 1) % flashcards.length;

        // Preload the next card content
        const front = flashcard.querySelector('.front');
        const back = flashcard.querySelector('.back');
        front.textContent = flashcards[nextCardIndex].question;
        back.textContent = flashcards[nextCardIndex].answer;

        // Apply the fly away effect
        flashcard.style.transition = 'transform 0.5s ease-out';
        flashcard.style.transform = `translateX(${directionMultiplier * window.innerWidth}px) rotate(${directionMultiplier * 20}deg)`;

        // Reset and update to the next card after the animation
        setTimeout(() => {
            flashcard.style.transition = 'none'; // Disable transition for instant reset
            flashcard.style.transform = 'none'; // Reset position
            currentCardIndex = nextCardIndex; // Update to the new card index
        }, 500); // Match the duration of the fly away effect
    }
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
    if (Math.abs(touchEndX - touchStartX) < 10) { // 10px threshold to distinguish click from swipe
        flashcard.classList.toggle('flipped');
        if (flashcard.classList.contains('flipped')) {
            flashcard.style.transform = 'rotateY(180deg)';
        } else {
            flashcard.style.transform = 'none'; // Reset to front side
        }
    });
    flashcard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    flashcard.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
});
