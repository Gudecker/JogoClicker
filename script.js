let seconds = 0;
let score = 0;
let timerInterval;
let spawnInterval;
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const game_container = document.getElementById('game-container');

function getModoJogo() {
    const params = new URLSearchParams(window.location.search);
    return params.get('modo') || 'infinito';
}

function startGame() {
    const modo = getModoJogo();
    if (modo === 'tempo') {
        iniciarModoPorTempo();
    } else {
        iniciarModoInfinito();
    }
}

function iniciarModoPorTempo() {
    let tempo = 60;
    score = 0;
    scoreEl.textContent = 'Score: 0';
    timeEl.style.display = 'block';
    timeEl.textContent = `Tempo ${tempo < 10 ? '0' : ''}${tempo}`;
    game_container.innerHTML = "";

    spawnRandomly();

    timerInterval = setInterval(() => {
        tempo--;
        timeEl.textContent = `Tempo ${tempo < 10 ? '0' : ''}${tempo}`;
        if (tempo <= 0) {
            clearInterval(timerInterval);
            clearTimeout(spawnInterval);
            window.location.href = 'over.html';
        }
    }, 1000);
}

function iniciarModoInfinito() {
    score = 0;
    scoreEl.textContent = 'Score: 0';
    timeEl.style.display = 'none';
    game_container.innerHTML = "";

    spawnRandomly();
}

function spawnRandomly() {
    for (let i = 0; i < 3; i++) {
        createRandomObject();
    }
    const nextSpawn = Math.random() * 1100 + 700;
    spawnInterval = setTimeout(spawnRandomly, nextSpawn);
}

function createRandomObject() {
    const isCoin = Math.random() > 0.5;
    createObject(isCoin ? 'coin' : 'bomb');
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
    createRandomObject();
    createRandomObject();
}

function catchBomb() {
    window.location.href = 'over.html';
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
}
