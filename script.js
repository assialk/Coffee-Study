// Sélection des éléments de la page
const bunny = document.querySelector('.bunny'); // Vérifie si .bunny existe avant de l'utiliser
const timer = document.querySelector('.timer'); 
const coinsDisplay = document.querySelector('.coins'); 
const studyButton = document.getElementById('studyButton'); 

// Variables d'état
let isStudying = false;
let time = 0;
let coins = parseInt(localStorage.getItem('coins')) || 0; // Charger les coins sauvegardés ou démarrer à 0
let interval;

// Affiche les coins sauvegardés dès le chargement de la page
coinsDisplay.textContent = `Coins: ${coins}`;

// Fonction pour formater le temps en mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer/arrêter l'étude
function toggleStudy() {
    isStudying = !isStudying;
    if (isStudying) {
        // Vérification si l'élément bunny existe avant de le manipuler
        if (bunny) {
            bunny.classList.add('studying');
        }
        studyButton.textContent = 'Stop Studying';
        
        // Démarre le chronomètre
        interval = setInterval(() => {
            time++;
            timer.textContent = formatTime(time);
            
            // Chaque minute, on gagne un coin
            if (time % 60 === 0) {
                coins++;
                coinsDisplay.textContent = `Coins: ${coins}`;
                localStorage.setItem('coins', coins); // Enregistre les coins dans le localStorage
            }
        }, 1000);
    } else {
        // Arrête l'étude
        if (bunny) {
            bunny.classList.remove('studying');
        }
        studyButton.textContent = 'Start Studying';
        clearInterval(interval);
    }
}

// Attache l'événement au bouton
studyButton.addEventListener('click', toggleStudy);

// Fonction pour créer les étincelles (sparkles)
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Position aléatoire sur l'écran
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    
    document.body.appendChild(sparkle);
    
    // Supprimer l'étincelle après la fin de l'animation
    setTimeout(() => {
        sparkle.remove();
    }, 3000); // Durée de l'animation (ajustable)
}

// Crée des étincelles à intervalles réguliers
setInterval(createSparkle, 500);
