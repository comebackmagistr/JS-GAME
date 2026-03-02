// Переменные

let position = 0;
let imgBlockPosition = 0;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let direction = "right";
let hit = false;
let jump = false;
let fall = false;
let heroImg = window.document.querySelector("#hero-img");
let imgBlock = window.document.querySelector("#img-block");
let canvas = window.document.querySelector("#canvas");
let fsBtn = window.document.querySelector("#fsBtn");
let jumpBlock = window.document.querySelector("#jump-block");
let hitBlock = window.document.querySelector("#hit-block");
let info = window.document.querySelector("#info");

let tileArray = [];

jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`;

let heroX = Math.floor((Number.parseInt(imgBlock.style.left) + 32) / 32);
let heroY = Math.floor(Number.parseInt(imgBlock.style.bottom) / 32);

// Функции

const start = () => {
  lifeCycle();
  for (let i = 0; i < window.screen.width / 32; i++) {
    if (i > 10 && i < 17) {
      continue;
    }
    addTiles(i);
  }

  createTilesPlatform(10, 10, 10);
  createTilesPlatform(15, 5, 10);
};

const updateHeroXY = () => {
  heroX = Math.ceil((Number.parseInt(imgBlock.style.left) + 32) / 32);
  heroY = Math.ceil(Number.parseInt(imgBlock.style.bottom) / 32);

  info.innerText = `heroX: ${heroX} heroY: ${heroY}`;
};

const checkFalling = () => {
  updateHeroXY();
  let isFalling = true;
  for (let i = 0; i < tileArray.length; i++) {
    tileArray[i][0];
    if (tileArray[i][0] === heroX && tileArray[i][1] + 1 === heroY) {
      isFalling = false;
    }
  }
  if (isFalling) {
    info.innerText = info.innerText + ", Falling";
    fall = true;
  } else {
    info.innerText = info.innerText + ", Not Falling";
    fall = false;
  }
};

const fallHandler = () => {
  heroImg.style.top = "-96px";
  imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) - 40}px`;
  checkFalling();
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

  checkFalling();
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

  checkFalling();
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

  checkFalling();
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
        imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) + 160}px`;
        imgBlockPosition = imgBlockPosition + 10;
        imgBlock.style.left = `${imgBlockPosition * 20}px`;
      }
      break;
    }
    case "left": {
      heroImg.style.transform = "scale(1, 1)";
      if (position > 3) {
        position = 0;
        jump = false;
        imgBlock.style.bottom = `${Number.parseInt(imgBlock.style.bottom) + 160}px`;
        imgBlockPosition = imgBlockPosition - 10;
        imgBlock.style.left = `${imgBlockPosition * 20}px`;
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

const createTile = (x, y = 1) => {
  let tile = window.document.createElement("img");
  tile.src = "./assets/textures/1 Tiles/Tile_02.png";
  tile.style.position = "absolute";
  tile.style.left = x * 32;
  tile.style.bottom = y * 32;
  canvas.appendChild(tile);

  tileArray.push([x, y]);
};

const createTilesPlatform = (startX, startY, length) => {
  for (let i = 0; i < length; i++) {
    createTile(startX + i, startY);
  }
};

const addTiles = (items) => {
  createTile(items);
  let tileBlack = window.document.createElement("img");
  tileBlack.src = "./assets/textures/1 Tiles/Tile_04.png";
  tileBlack.style.position = "absolute";
  tileBlack.style.left = items * 32;
  tileBlack.style.bottom = 0;
  canvas.appendChild(tileBlack);
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

const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit) {
      hitHandler();
    } else if (jump) {
      jumpHandler();
    } else if (fall) {
      fallHandler();
    } else {
      standHandler();
    }
  }, 150);
};

// Запуск
start();
