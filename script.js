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
    const swipeThreshold = 150;

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
        touchMoved = false;
    }

    function handleTouchMove(e) {
        const touchMoveX = e.changedTouches[0].screenX;
        const moveDistance = touchMoveX - touchStartX;
        touchMoved = Math.abs(moveDistance) >= swipeThreshold;
        const rotation = moveDistance / 20;
        flashcard.style.transform = `translateX(${moveDistance}px) rotate(${rotation}deg)`;
    }

    function handleTouchEnd() {
        if (!touchMoved) {
            flashcard.classList.toggle('flipped');
            flashcard.style.transform = 'none';
        } else {
            handleSwipeGesture();
        }
    }

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) >= swipeThreshold) {
            animateCardOut(swipeDistance < 0 ? 'left' : 'right');
        } else {
            resetCardPosition();
        }
    }

    function animateCardOut(direction) {
        const outPosition = direction === 'left' ? '-100vw' : '100vw';
        flashcard.style.transition = 'transform 0.3s ease-out';
        flashcard.style.transform = `translateX(${outPosition})`;

        flashcard.addEventListener('transitionend', () => {
            direction === 'left' ? showNextCard() : showPreviousCard();
            resetCardPosition();
        }, { once: true });
    }

    function resetCardPosition() {
        flashcard.style.transition = '';
        flashcard.style.transform = 'translateX(0px) rotate(0deg)';
        touchMoved = false; // Reset for the next interaction
    }

    // Initialize the first flashcard
    updateFlashcard();

    // Add touch event listeners
    flashcard.addEventListener('touchstart', handleTouchStart, false);
    flashcard.addEventListener('touchmove', handleTouchMove, false);
    flashcard.addEventListener('touchend', handleTouchEnd, false);

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNextCard();
        if (e.key === 'ArrowLeft') showPreviousCard();
    });
});
