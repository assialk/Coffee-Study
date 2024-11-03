const bunny = document.querySelector('.bunny');
const timer = document.querySelector('.timer');
const coinsDisplay = document.querySelector('.coins');
const studyButton = document.getElementById('studyButton');

let isStudying = false;
let time = 0;
let coins = parseInt(localStorage.getItem('coins')) || 0; // Load saved coins or start with 0
let interval;

// Display the saved coins when the page loads
coinsDisplay.textContent = `Coins: ${coins}`;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function toggleStudy() {
    isStudying = !isStudying;
    if (isStudying) {
        bunny.classList.add('studying');
        studyButton.textContent = 'Stop Studying';
        interval = setInterval(() => {
            time++;
            timer.textContent = formatTime(time);
            if (time % 60 === 0) {
                coins++;
                coinsDisplay.textContent = `Coins: ${coins}`;
                localStorage.setItem('coins', coins); // Save coins to localStorage
            }
        }, 1000);
    } else {
        bunny.classList.remove('studying');
        studyButton.textContent = 'Start Studying';
        clearInterval(interval);
    }
}

studyButton.addEventListener('click', toggleStudy);

    
// Function to create sparkles
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Set random position
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 3000); // Adjust duration as needed
    }
    
    // Create sparkles at intervals
    setInterval(createSparkle, 500);

