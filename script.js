// Переменные
let heroImg = window.document.querySelector("#hero-img");
let leftButton = window.document.querySelector("#left");
let imgBlock = window.document.querySelector("#img-block");
let position = 0;
let imgBlockPosition = 0;
// Функции
const rightHandler = () => {
  position += 1;
  imgBlockPosition = imgBlockPosition + 1;
  if (position > 5) {
    position = 0;
  }
  heroImg.style.left = `-${position * 288}px`;
  imgBlock.style.left = `${imgBlockPosition * 20}px`;
};
// Обработчики событий

let timer = null;
const onTouchStart = (event) => {
  timer = setInterval(() => {
    rightHandler();
  }, 130);
};
const onTouchEnd = (event) => {
    clearInterval(timer);
};

window.onmousedown = onTouchStart;
window.ontouchstart = onTouchStart;

window.onmouseup = onTouchEnd;
window.ontouchend = onTouchEnd;
