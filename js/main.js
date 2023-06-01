window.onunload = function() {
  window.scrollTo(0, 0);
}

document.querySelector(".header__link-1").addEventListener("click", function() {
  window.scrollTo({
      top: 750,
      behavior: "smooth",
  })}
);

document.querySelector(".header__link-2").addEventListener("click", function() {
  window.scrollTo({
      top: 1550,
      behavior: "smooth",
  })}
);

document.querySelector(".header__link-3").addEventListener("click", function() {
  window.scrollTo({
      top: 2350,
      behavior: "smooth",
  })}
);


// Плавное появление страницы

let body = document.querySelector("body");

body.style.display = "none";
body.style.opacity = "0%";

setTimeout(() => {
  body.style.display = "flex";
  body.style.animation = "body_appearance 0.5s forwards";
}, 1);