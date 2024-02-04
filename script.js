// /mnt/data/flashcard_app/script.js
document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const nextButton = document.getElementById('next');

    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    nextButton.addEventListener('click', () => {
        // TODO: Implement logic to load the next flashcard
    });
});
