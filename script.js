document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        { question: "What is 2 + 2?", answer: "4" },
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is the largest mammal?", answer: "Blue Whale" }
    ];

    let currentCardIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchMoved = false;
    const swipeThreshold = 150; // Distance in pixels to consider as swipe

    const flashcard = document.getElementById('flashcard');

    function updateFlashcard() {
        const front = flashcard.querySelector('.front');
        const back = flashcard.querySelector('.back');
        flashcard.classList.remove('flipped');
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
        touchMoved = false; // Reset touchMoved on new touch sequence
    }

    function handleTouchMove(e) {
        const touchMoveX = e.changedTouches[0].screenX;
        // Determine the distance moved
        const moveDistance = touchMoveX - touchStartX;
        // Mark as moved if the distance is beyond the threshold
        if (Math.abs(moveDistance) >= swipeThreshold) {
            touchMoved = true;
        }
        e.preventDefault(); // Prevent scrolling during swipe
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;

        // Check for swipe gesture
        if (Math.abs(swipeDistance) >= swipeThreshold) {
            handleSwipeGesture(swipeDistance);
        } else if (!touchMoved) {
            // It was a tap, not a swipe
            flashcard.classList.toggle('flipped');
        }
        // Reset touchMoved for the next action
        touchMoved = false;
        e.preventDefault(); // Prevent additional actions on touch end
    }

    function handleSwipeGesture(swipeDistance) {
        if (swipeDistance < 0) {
            showNextCard();
        } else {
            showPreviousCard();
        }
    }

    // Initialize the first flashcard
    updateFlashcard();

    // Add touch event listeners for the flashcard
    flashcard.addEventListener('touchstart', handleTouchStart, false);
    flashcard.addEventListener('touchmove', handleTouchMove, false);
    flashcard.addEventListener('touchend', handleTouchEnd, false);

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showNextCard();
        } else if (e.key === 'ArrowLeft') {
            showPreviousCard();
        }
    });
});
