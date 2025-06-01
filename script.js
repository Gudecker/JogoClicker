let seconds = 0;
let score = 0;
let timerInterval;

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const game_container = document.getElementById('game-container');

function startGame() {
    if (!timerInterval) {
        timerInterval = setInterval(increaseTime, 1000);
    }
    createObject('coin');
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createRandomObject() {
    const isCoin = Math.random() > 0.5;
    if (isCoin) {
        createObject('coin');
    } else {
        createObject('bomb');
    }
}

function createObject(type) {
    const object = document.createElement('div');
    object.classList.add(type);
    const { x, y } = getRandomLocation();
    object.style.top = `${y}px`;
    object.style.left = `${x}px`;
    object.style.position = 'absolute';

    if (type === 'coin') {
        object.innerHTML = `<img src="./coin.png" alt="Coin" style="transform: rotate(${Math.random() * 360}deg)" />`;
        object.addEventListener('click', catchCoin);
    } else if (type === 'bomb') {
        object.innerHTML = `<img src="./bomb.png" alt="Bomb" style="transform: rotate(${Math.random() * 360}deg)" />`;
        object.addEventListener('click', catchBomb);
    }

    game_container.appendChild(object);
}

function getRandomLocation() {
    const containerRect = game_container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 100);
    const y = Math.random() * (containerRect.height - 100);
    return { x, y };
}

function catchCoin() {
    increaseScore();
    this.remove();
    spawnNewObjects();
}

function catchBomb() {
    alert('Game Over!');
    window.location.href = 'index.html';
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
}

function spawnNewObjects() {
    createObject('coin');
    const isCoin = Math.random() > 0.5;
    if (isCoin) {
        createObject('coin');
    } else {
        createObject('bomb');
    }
}
