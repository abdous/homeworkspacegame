const KEY_CODE_SPACE = 32;
const KEY_CODE_LEFT = 37;
const KEY_CODE_UP = 38;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_DOWN = 40;

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const GAME_STATE = {
    spacePressed: false,
    leftPressed: false,
    rightPressed: false,
    //upPressed: false,
    //downPressed: false,
    playerX: 0,
    playerY: 0,
};

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function clamp(v, min, max) {
    //return v < min ? min : v > max ? max : v;
    if (v < min) {
       return min;
     } else if (v > max) {
       return max;
     } else {
        return v;
     }
}

function createPlayer($container) {
    GAME_STATE.playerX = GAME_WIDTH / 2;
    GAME_STATE.playerY = GAME_HEIGHT - 50;
    const $player = document.createElement("img");
    $player.src = "img/player-blue-1.png";
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function updatePlayer() {
    if (GAME_STATE.leftPressed) {
        GAME_STATE.playerX -= 5;
    }
    if (GAME_STATE.rightPressed) {
        GAME_STATE.playerX += 5;
    }
    // if (GAME_STATE.upPressed) {
    //     GAME_STATE.playerY -= 5;
    // }
    // if (GAME_STATE.downPressed) {
    //     GAME_STATE.playerY += 5;
    // }
    GAME_STATE.playerX = clamp(
        GAME_STATE.playerX,
        PLAYER_WIDTH,
        GAME_WIDTH - PLAYER_WIDTH,
    );
    GAME_STATE.playerY = clamp(
        GAME_STATE.playerY,
        PLAYER_HEIGHT,
        GAME_HEIGHT - PLAYER_HEIGHT,
    );
    const $player = document.querySelector(".player");
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function update(e) {
    updatePlayer();
    window.requestAnimationFrame(update);
}

function init() {
    const $container = document.querySelector(".game");
    createPlayer($container);
}

function onKeyPress(e) {
    if (e.key === 'a') {
        GAME_STATE.playerX -= 15;
        const $player = document.querySelector(".player");
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    } else if (e.key === 'd') {
        GAME_STATE.playerX += 15;
        const $player = document.querySelector(".player");
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    } else if (e.key === 'w') {
        GAME_STATE.playerY -= 15;
        const $player = document.querySelector(".player");
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    } else if (e.key === 's') {
        GAME_STATE.playerY += 15;
        const $player = document.querySelector(".player");
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }
}

function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT) {
        GAME_STATE.leftPressed = false;
    } else if (e.keyCode === KEY_CODE_RIGHT) {
        GAME_STATE.rightPressed = false;
    // } else if (e.keyCode === KEY_CODE_UP) {
    //     GAME_STATE.upPressed = false;
    // } else if (e.keyCode === KEY_CODE_DOWN) {
    //     GAME_STATE.downPressed = false;
    } else if (e.keyCode === KEY_CODE_SPACE) {
        GAME_STATE.spacePressed = false;
    }
}

function onKeyDown(e) {
    if (e.keyCode === KEY_CODE_LEFT) {
        GAME_STATE.leftPressed = true;
    } else if (e.keyCode === KEY_CODE_RIGHT) {
        GAME_STATE.rightPressed = true;
    } else if (e.keyCode === KEY_CODE_UP) {
        GAME_STATE.upPressed = true;
    } else if (e.keyCode === KEY_CODE_DOWN) {
        GAME_STATE.downPressed = true;
    } else if (e.keyCode === KEY_CODE_SPACE) {
        GAME_STATE.spacePressed = true;
    }
}

init();
window.addEventListener("keypress", onKeyPress);
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);