let playerScore = 0;
let opponentScore = 0;
let totalPoints = 0;
let gameStarted = false;
let playerCards = [];
let opponentCards = [];
let isChoosingOption = false; // Variabile per tracciare se l'utente sta già scegliendo una carta

function startGame() {
    document.querySelector('.score').classList.add('hidden');

    totalPoints = parseInt(document.getElementById('points').value);
    playerScore = 0;
    opponentScore = 0;
    gameStarted = true;
    updateScore();
    initializePlayerCards();
    initializeOpponentCards();
    distributeCards();
    document.getElementById('choose-points').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    document.querySelector('.score').classList.remove('hidden'); 
    alert('Game started!');
}

function initializePlayerCards() {
    const options = ['rock', 'paper', 'scissors'];
    for (let i = 0; i < 3; i++) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        playerCards.push(randomOption);
    }
    displayPlayerOptions();
}

function displayPlayerOptions() {
    const playerOptionsDiv = document.getElementById('player-options');
    playerOptionsDiv.innerHTML = '';
    for (let i = 0; i < playerCards.length; i++) {
        const card = createCard(playerCards[i]);
        card.onclick = createChooseOptionHandler(playerCards[i]);
        playerOptionsDiv.appendChild(card);
    }
}

function createChooseOptionHandler(option) {
    return function() {
        if (!gameStarted || isChoosingOption) {
            alert('Please start the game first!');
            return;
        }
        chooseOption(option);
        const index = playerCards.indexOf(option);
        if (index !== -1) {
            playerCards.splice(index, 1);
        }
        displayPlayerOptions();
        if (playerCards.length === 0) {
            initializePlayerCards(); // Genera nuove carte se il giocatore ha esaurito le carte precedenti
        }
        resetCardTransform();
    };
}

function initializeOpponentCards() {
    const opponentOptionsDiv = document.getElementById('opponent-options');
    opponentOptionsDiv.innerHTML = '';
} if (gameStarted) {
    const options = ['rock', 'paper', 'scissors'];
    for (let i = 0; i < 3; i++) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        opponentCards.push(randomOption);
        resetCardTransform();
    }
    // Visualizza la carta dell'opponente solo se il gioco è in corso
    if (gameStarted) {
        const opponentCard = createCard(opponentCards[0]);
        opponentOptionsDiv.appendChild(opponentCard);
    }
}


function createCard(option) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = option.charAt(0).toUpperCase() + option.slice(1);
    return card;
}

function chooseOption(playerOption) {
    isChoosingOption = true;
    const options = ['rock', 'paper', 'scissors'];
    const opponentOption = options[Math.floor(Math.random() * options.length)];
    const result = getResult(playerOption, opponentOption);
    displayResult(result, opponentOption);
    if (playerScore === totalPoints || opponentScore === totalPoints) {
        endGame();
    } else if (playerCards.length === 0) {
        initializePlayerCards();
    }
    isChoosingOption = false;
}

function getResult(playerOption, opponentOption) {
    if (playerOption === opponentOption) {
        return 'It\'s a tie!';
    } else if ((playerOption === 'rock' && opponentOption === 'scissors') ||
               (playerOption === 'paper' && opponentOption === 'rock') ||
               (playerOption === 'scissors' && opponentOption === 'paper')) {
        playerScore++;
        return 'You win!';
    } else {
        opponentScore++;
        return 'You lose!';
    }
}

function displayResult(result, opponentOption) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
    const opponentOptionsDiv = document.getElementById('opponent-options');
    opponentOptionsDiv.innerHTML = '';
    const opponentCard = createCard(opponentOption);
    opponentOptionsDiv.appendChild(opponentCard);
    updateScore();
}

function updateScore() {
    const playerScoreElement = document.getElementById('player-score');
    playerScoreElement.textContent = playerScore;
    const opponentScoreElement = document.getElementById('opponent-score');
    opponentScoreElement.textContent = opponentScore;
}

function endGame() {
    gameStarted = false;
    let winner = '';
    if (playerScore === totalPoints) {
        winner = 'You win the game!';
    } else {
        winner = 'Opponent wins the game!';
    }
    const resultElement = document.getElementById('result');
    resultElement.textContent = '';
    alert(`Game Over! ${winner}`);
    document.getElementById('restart-btn').classList.remove('hidden');
    hideCards();
}

function restartGame() {
    document.getElementById('choose-points').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('restart-btn').classList.add('hidden');
    playerScore = 0;
    opponentScore = 0;
    playerCards = [];
    opponentCards = [];
    updateScore();
    distributeCards();
}


function openModal() {
    var modal = document.getElementById("tutorial-modal");
    modal.style.display = "block"; // Visualizza il modale
}

// Funzione per chiudere il modale cliccando sull'icona di chiusura
document.querySelector(".close").addEventListener("click", function() {
    var modal = document.getElementById("tutorial-modal");
    modal.style.display = "none"; // Nasconde il modale\
});

// Funzione per chiudere il modale cliccando al di fuori del contenuto del modale
window.addEventListener("click", function(event) {
    var modal = document.getElementById("tutorial-modal");
    if (event.target === modal) {
        modal.style.display = "none"; // Nasconde il modale se si clicca al di fuori del contenuto
    }
});

// Aggiungi un event listener al bottone "Tutorial" per aprire il modale
document.getElementById("tutorial-btn").addEventListener("click", openModal);

function distributeCards() {
    const playerCardsDiv = document.getElementById('player-options');
    const cards = playerCardsDiv.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)'; // Anima le carte verso l'alto
        }, index * 100); // Aggiungi un ritardo graduale per distribuire le carte una dopo l'altra
    });
}

function hideCards() {
    const playerCardsDiv = document.getElementById('player-options');
    const cards = playerCardsDiv.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('hidden');
        }, index * 100); // Aggiungi un ritardo graduale per nascondere le carte una dopo l'altra
    });
}1

function resetCardTransform() {
    const playerCardsDiv = document.getElementById('player-options');
    const opponentCardsDiv = document.getElementById('opponent-options');
    const playerCards = playerCardsDiv.querySelectorAll('.card');
    const opponentCards = opponentCardsDiv.querySelectorAll('.card');

    playerCards.forEach(card => {
        card.style.transform = 'translateY(0)';
    });

    opponentCards.forEach(card => {
        card.style.transform = 'translateY(0)';
    });
}