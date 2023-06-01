// Функция рандома

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Поворот стрелки

function arrow_rotate() {
  let degs = arrow_index / 100 * 180;
  arrow.style.transform = "rotate(" + degs + "deg)";
  if (arrow_index < result) {
    arrow_index += 1;
  }
}

function result_changing() {
  total.textContent = "Выполнение " + result_index + "%";
  if (result_index < result) {
    result_index++;
  }
}

let arrow = document.querySelector(".main__total_arrow");
let total = document.querySelector(".main__total_text");

let result = localStorage["result"];
let result_index = 1;
let arrow_index = 1;

setInterval(arrow_rotate, 400 / result);
setInterval(result_changing, 1000 / result);

if (result == 100) {
  let congrat_window = document.createElement("div");
  let congrat_text = document.createElement("p");
  let congrat_btn = document.createElement("button");
  let congrat_background = document.createElement("div");

  congrat_window.style.width = "550px";
  congrat_window.style.height = "180px";
  congrat_window.style.backgroundImage = "linear-gradient(135deg, var(--main-color), var(--main-green))";
  congrat_window.style.border = "4.8px solid black";
  congrat_window.style.borderRadius = "20px";
  congrat_window.style.zIndex = "5";
  congrat_window.style.position = "fixed";
  congrat_window.style.top = "calc(50% - 100px)";
  congrat_window.classList.add("flex");
  congrat_window.style.flexDirection = "column";
  congrat_window.style.justifyContent = "space-between";
  congrat_window.style.alignItems = "center";
  congrat_window.style.padding = "10px";

  congrat_text.innerHTML = "Поздравляем!<br>Ты полностью прошёл тему!";
  congrat_text.style.fontSize = "30px";
  congrat_text.style.fontWeight = "600";
  congrat_text.style.textAlign = "center";

  congrat_btn.style.fontFamily = "\"Montserrat Alternates\", sans-serif";
  congrat_btn.style.fontSize = "calc(40px * var(--koef))";
  congrat_btn.style.fontWeight = "500";
  congrat_btn.style.width = "130px";
  congrat_btn.style.height = "calc(90px * var(--koef))";
  congrat_btn.style.color = "var(--main-color)";
  congrat_btn.style.backgroundColor = "black";
  congrat_btn.style.marginBottom = "5px";
  congrat_btn.innerHTML = "Спасибо!";
  congrat_btn.classList.add("btn");

  congrat_background.style.width = "100%";
  congrat_background.style.height = "100%";
  congrat_background.style.backgroundColor = "black";
  congrat_background.style.opacity = "60%";
  congrat_background.style.zIndex = "3";
  congrat_background.style.position = "fixed";

  congrat_btn.addEventListener("click", function() {
    congrat_window.style.opacity = "0%";
    congrat_background.style.opacity = "0%";

    congrat_window.style.transition = "opacity 0.5s";
    congrat_background.style.transition = "opacity 0.5s";

    setTimeout(() => {
      congrat_window.style.display = "none";
      congrat_background.style.display = "none";
    }, 500);
  });

  for (let smile_index = 0; smile_index <= 100; smile_index++) {
    let smile = document.createElement("img");

    let width_height = random(70, 100);
    let top = random(-500, -101);
    let left = random(-10, 110);
    let path = random(200, 1000);
    let opacity = random(70, 100);
    let time = random(2, 4);

    smile.src = "img/results_marks/6_colored.png";
    smile.style.width = width_height + "px";
    smile.style.height = width_height + "px";
    smile.style.position = "fixed";
    smile.style.left = left + "%";
    smile.style.top = top + "px";
    smile.style.border = "4px solid black";
    smile.style.borderRadius = "100%";
    smile.style.zIndex = "4";
    smile.style.opacity = opacity + "px";

    smile.animate(
      [
        {transform: "translateY(" + path + "px)", opacity: "0%"}
      ],
      {
        duration: time * 1000,
      }
    );

    document.querySelector("body").appendChild(smile);
  }

  document.querySelector("body").appendChild(congrat_background);
  document.querySelector("body").appendChild(congrat_window);
  congrat_window.appendChild(congrat_text);
  congrat_window.appendChild(congrat_btn);

  document.querySelector(".next_button").addEventListener("click", function() {
    window.location.href = "index-subjects.html";
  });
}
else {
  document.querySelector(".next_button").addEventListener("click", function() {
    window.location.href = "index-task.html";
  });
}


// Выделение оценок

document.querySelectorAll(".main__marks_mark").forEach(elem => {
  // Наведение на элемент
  
  elem.addEventListener("mouseover", function() {
    elem.style.transform = "scale(110%)";
    elem.style.boxShadow = "0 0 15px black";
  });

  // Покидание элемента 

  elem.addEventListener("mouseout", function() {
    elem.style.transform = "scale(100%)";
    elem.style.boxShadow = "unset";
  });

  // Зажатие элемента

  elem.addEventListener("mousedown", function() {
    elem.style.transform = "scale(100%)";
    elem.style.boxShadow = "unset";
  });

  // Отпускание элемента

  elem.addEventListener("mouseup", function() {
    elem.style.transform = "scale(110%)";
    elem.style.boxShadow = "0 0 15px black";
  });

  // Нажатие на элемент

  elem.addEventListener("click", function() {
    if (!elem.src.endsWith("_colored.png")) {
      elem.src = elem.src.slice(0, elem.src.length - 4) + "_colored.png";
      
      document.querySelectorAll(".main__marks_mark").forEach(cur_elem => {
        if ((cur_elem != elem)&&(cur_elem.src.endsWith("_colored.png"))) {
          cur_elem.src = cur_elem.src.slice(0, cur_elem.src.length - 12) + ".png";
        };
      });

      let text = document.querySelector(".main__marks_text-2");
      text.style.animation = "thanks_text 3s forwards";
      setTimeout(() => {text.style.animation = "unset";}, 3000);
    };
  });
});


// Смена иконки профиля

let data = JSON.stringify({
  "phone": localStorage["phone"],
  "password": localStorage["password"],
});

let req1 = new XMLHttpRequest();

req1.withCredentials = false;
req1.open("POST", "https://iknow2023.bsite.net/api/users/login");
req1.setRequestHeader("Content-Type", "application/json");

req1.send(data);

req1.onload = function () {
if (req1.status != 200) {
  console.log("Error");
}
else {

  // Получение данных пользователя

  let response = JSON.parse(req1.response);
  token = response.accessToken;
  
  let req2 = new XMLHttpRequest();

  req2.withCredentials = false;
  req2.open("GET", "https://iknow2023.bsite.net/api/users");

  var reqHeader = "Bearer " + token;
  req2.setRequestHeader("Authorization", reqHeader);

  req2.send();

  req2.onload = function () {
  if (req2.status != 200) {
      console.log("Error");
  }
  else {
      var cur_data = JSON.parse(req2.response);

      let photo_form = document.querySelector(".header__profile_icon");
      let edit_form = document.querySelector(".edit__photo");
      let edit_name = document.querySelector(".edit__name");

      photo_form.src = "img/profile/" + cur_data["pictureId"] + ".png";
      edit_form.src = "img/profile/" + cur_data["pictureId"] + ".png";
      edit_name.innerHTML = cur_data["nickname"];
      console.log(cur_data);
  };
  };
};
};


// Переход в профиль

document.querySelector(".edit__edit").addEventListener("click", function() {
  window.location.href = "index-profile.html";
});


// Выход из профиля

document.querySelector(".edit__exit").addEventListener("click", function() {
  let exit_data = JSON.stringify({
      "phone": localStorage["phone"],
      "password": localStorage["password"],
  });
    
  let req1 = new XMLHttpRequest();

  req1.withCredentials = false;
  req1.open("POST", "https://iknow2023.bsite.net/api/users/login");
  req1.setRequestHeader("Content-Type", "application/json");

  req1.send(exit_data);

  req1.onload = function () {
      if (req1.status != 200) {
      console.log("Error");
      }
      else {
          localStorage["phone"] = "";
          localStorage["password"] = "";

          window.location.href = "index.html";
      };
  };
});


// Открытие окна профиля

document.querySelector(".header__profile").addEventListener("click", function() {
  let edit_window = document.querySelector(".edit__window");
  
  if (edit_window.style.display == "flex") {
      edit_window.style.animation = "edit_window_vanishing 0.5s forwards";

      // Перемещение иконки профиля

      let edit_icon = document.querySelector(".edit__photo");
      let profile_icon = document.querySelector(".header__profile_icon");
      
      edit_icon.style.transform = "scale(72%)";
      edit_icon.style.top = "-108px";
      edit_icon.style.left = "230px";
      edit_icon.style.transition = "transform 0.5s, top 0.5s, left 0.5s";

      setTimeout(() => {
          edit_window.style.display = "none";
          profile_icon.style.opacity = "100%";
      }, 500);
  }
  else {
      edit_window.style.animation = "edit_window_appearance 0.5s forwards";
      edit_window.style.display = "flex";
      
      // Перемещение иконки профиля

      let edit_icon = document.querySelector(".edit__photo");
      let profile_icon = document.querySelector(".header__profile_icon");
      
      setTimeout(() => {
          edit_icon.style.transform = "scale(100%)";
          edit_icon.style.top = "0px";
          edit_icon.style.left = "0px";
          edit_icon.style.transition = "transform 0.5s, top 0.5s, left 0.5s";

          profile_icon.style.opacity = "0%";
      }, 1);
  };
});

window.addEventListener("wheel", function() {
  let edit_window = document.querySelector(".edit__window");
  edit_window.style.animation = "edit_window_vanishing 0.5s forwards";

  // Перемещение иконки профиля

  let edit_icon = document.querySelector(".edit__photo");
  let profile_icon = document.querySelector(".header__profile_icon");
  
  edit_icon.style.transform = "scale(72%)";
  edit_icon.style.top = "-108px";
  edit_icon.style.left = "230px";
  edit_icon.style.transition = "transform 0.5s, top 0.5s, left 0.5s";

  setTimeout(() => {
      edit_window.style.display = "none";
      profile_icon.style.opacity = "100%";
  }, 500);
});


// Плавное появление страницы

let body = document.querySelector("body");

body.style.display = "none";
body.style.opacity = "0%";

setTimeout(() => {
  body.style.display = "flex";
  body.style.animation = "body_appearance 0.5s forwards";
}, 1);