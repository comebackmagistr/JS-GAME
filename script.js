// Переменные
let heroImg = window.document.querySelector("#hero-img");
let imgBlock = window.document.querySelector("#img-block");
let canvas = window.document.querySelector("#canvas");
let fsBtn = window.document.querySelector("#fsBtn");
let position = 0;
let imgBlockPosition = 0;
let timer = null;
let x = 0;
let halfWidth = window.screen.width / 2;
let direction = "right";

// Функции

const start = () => {
  lifeCycle();
};

const rightHandler = () => {
  heroImg.style.transform = "scale(-1, 1)";
  heroImg.style.top = "-576px";
  position += 1;
  imgBlockPosition = imgBlockPosition + 1;
  if (position > 5) {
    position = 0;
  }
  heroImg.style.left = `-${position * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const leftHandler = () => {
  heroImg.style.transform = "scale(1, 1)";
  heroImg.style.top = "-576px";
  position -= 1;
  imgBlockPosition = imgBlockPosition - 1;
  if (position < 0) {
    position = 5;
  }
  heroImg.style.left = `-${position * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};

const lifeCycle = () => {
  timer = setInterval(() => {
    standHandler();
  }, 150);
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
  heroImg.style.left = `-${position * 288}px`;
  heroImg.style.top = "0px";
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

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;

// Запуск
start();
