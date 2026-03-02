// Переменные

let position = 0;
let imgBlockPosition = 0;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let direction = "right";
let hit = false;
let jump = false;
let heroImg = window.document.querySelector("#hero-img");
let imgBlock = window.document.querySelector("#img-block");
let canvas = window.document.querySelector("#canvas");
let fsBtn = window.document.querySelector("#fsBtn");
let jumpBlock = window.document.querySelector("#jump-block");
let hitBlock = window.document.querySelector("#hit-block");
jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;

// Функции

const start = () => {
  lifeCycle();
  for (let i = 0; i < window.screen.width / 32; i++) {
    addTiles(i);
  }
};

const rightHandler = () => {
  heroImg.style.transform = "scale(-1, 1)";
  heroImg.style.top = "-192px";
  position += 1;
  imgBlockPosition = imgBlockPosition + 1;
  if (position > 5) {
    position = 0;
  }
  heroImg.style.left = `-${position * 96}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = "scale(1, 1)";
  heroImg.style.top = "-192px";
  position -= 1;
  imgBlockPosition = imgBlockPosition - 1;
  if (position < 0) {
    position = 5;
  }
  heroImg.style.left = `-${position * 96}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const standHandler = () => {
  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1, 1)";
      if (position > 4) {
        position = 1;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (position > 3) {
        position = 0;
      }
      break;
    }
    default:
      break;
  }

  position = position + 1;
  heroImg.style.left = `-${position * 96}px`;
  heroImg.style.top = "0px";
};

const hitHandler = () => {
  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1, 1)";
      if (position > 4) {
        position = 1;
        hit = false;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (position > 3) {
        position = 0;
        hit = false;
      }
      break;
    }
    default:
      break;
  }

  position = position + 1;
  heroImg.style.left = `-${position * 96}px`;
  heroImg.style.top = "-288px";
};

const jumpHandler = () => {
  switch (direction) {
    case "right": {
      heroImg.style.transform = "scale(-1, 1)";
      if (position > 4) {
        position = 1;
        jump = false;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (position > 3) {
        position = 0;
        jump = false;
      }
      break;
    }
    default:
      break;
  }

  position = position + 1;
  heroImg.style.left = `-${position * 96}px`;
  heroImg.style.top = "-96px";
};

const onTouchStart = (event) => {
  clearInterval(timer);
  x = event.type === "mousedown" ? event.clientX : event.touches[0].screenX;
  timer = setInterval(() => {
    x > halfWidth
      ? ((direction = "right"), rightHandler())
      : ((direction = "left"), leftHandler());
  }, 130);
};
const onTouchEnd = (event) => {
  clearInterval(timer);
  lifeCycle();
};

// Обработчики событий

heroImg.onclick = (event) => {
  event.preventDefault();
};

fsBtn.onclick = () => {
  window.document.fullscreenElement
    ? ((fsBtn.src = "./assets/fullscreen.png"),
      window.document.exitFullscreen())
    : ((fsBtn.src = "./assets/cancel.png"), canvas.requestFullscreen());
};

jumpBlock.onclick = () => (jump = true);
hitBlock.onclick = () => (hit = true);

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

const addTiles = (items) => {
  let tile = window.document.createElement("img");
  tile.src = "./assets/textures/1 Tiles/Tile_02.png";
  tile.style.position = "absolute";
  tile.style.left = items * 32;
  tile.style.bottom = "32px";
  let tileBlack = window.document.createElement("img");
  tileBlack.src = "./assets/textures/1 Tiles/Tile_04.png";
  tileBlack.style.position = "absolute";
  tileBlack.style.left = items * 32;
  tileBlack.style.bottom = 0;
  canvas.appendChild(tile);
  canvas.appendChild(tileBlack);
};

const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit) {
      hitHandler();
    } else if (jump) {
      jumpHandler();
    } else {
      standHandler();
    }
  }, 150);
};

// Запуск
start();
