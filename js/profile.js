// Появление и исчезание частей страниц

document.querySelector(".main__photo_background").addEventListener("click", function() {
  var main = document.querySelector(".profile__main");
  var choice = document.querySelector(".profile__choice");

  main.style.display = "none";
  choice.style.display = "unset";

  main.style.animation = "profile__main_vanishing 1s forwards";
  choice.style.animation = "profile__main_appearance 1s forwards";
});

document.querySelector(".save_button").addEventListener("click", function() {
  // Появление части станицы с выбором фото

  var main = document.querySelector(".profile__main");
  var choice = document.querySelector(".profile__choice");

  choice.style.display = "none";
  main.style.display = "unset";

  choice.style.animation = "profile__choice_vanishing 1s forwards";
  main.style.animation = "profile__choice_appearance 1s forwards";


  // Изменение фото

  let chosen_photo_id;
  let chosen_photo_src;

  for (let index = 0; index <= 22; index++) {
    let cur_elem = document.getElementById("profile_photo_" + index);

    if (cur_elem.style.scale == "0.8") {
      chosen_photo_id = index;
      chosen_photo_src = cur_elem.src;
    }
  }

  let cur_photo = document.querySelector(".main__photo");
  cur_photo.id = chosen_photo_id;
  cur_photo.src = chosen_photo_src;
});


// Выбор фото

for (let index = 0; index <= 22; index++) {
  document.getElementById("profile_photo_" + index).addEventListener("click", function() {
    let elem = document.getElementById("profile_photo_" + index);

    if (elem.style.scale != "0.8") {
      elem.style.scale = "0.8";
      elem.style.transition = "scale 0.3s";
    }

    for (let inside_index = 0; inside_index <= 22; inside_index++) {
      let inside_elem = document.getElementById("profile_photo_" + inside_index);

      if ((inside_elem.style.scale == "0.8")&&(inside_elem.id != elem.id)) {
        inside_elem.style.scale = "1";
        inside_elem.style.transition = "scale 0.3s";
      }
    }
  });

  document.getElementById("profile_photo_" + index).addEventListener("mouseover", function() {
    let elem = document.getElementById("profile_photo_" + index);
    
    elem.style.boxShadow = "0 0 15px black";
    elem.style.transition = "box-shadow 0.3s";
  });

  document.getElementById("profile_photo_" + index).addEventListener("mouseout", function() {
    let elem = document.getElementById("profile_photo_" + index);
    
    elem.style.boxShadow = "unset";
    elem.style.transition = "box-shadow 0.3s";
  });
};


// Получение информаци из БД

// Авторизация

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

        let name_form = document.querySelector(".main__name_input");
        let phone_form = document.querySelector(".main__phone_input");
        let password_form = document.querySelector(".main__password_input");
        let photo_form = document.querySelector(".main__photo");

        name_form.value = cur_data["nickname"];
        phone_form.value = cur_data["phone"];
        password_form.value = "";
        photo_form.src = document.getElementById("profile_photo_" + cur_data["pictureId"]).src;
        photo_form.id = cur_data["pictureId"];

        let chosen_photo = document.getElementById("profile_photo_" + document.querySelector(".main__photo").id);
        chosen_photo.style.scale = "0.8";
      };
    };
  };
};


// Изменение данных пользователя

document.querySelector(".footer__save_button").addEventListener("click", function() {

  // Авторизация

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
  
      let response_1 = JSON.parse(req1.response);
      let token = response_1.accessToken;
      
      let req2 = new XMLHttpRequest();
  
      req2.withCredentials = false;
      req2.open("GET", "https://iknow2023.bsite.net/api/users");
  
      var reqHeader_1 = "Bearer " + token;
      req2.setRequestHeader("Authorization", reqHeader_1);
      req2.setRequestHeader("Content-Type", "application/json");
  
      req2.send();
  
      req2.onload = function () {
        if (req2.status != 200) {
          console.log("Error");
        }
        else {

          // Изменение данных пользователя
          
          let response_2 = JSON.parse(req2.response);
          var reqHeader_2 = "Bearer " + token;

          let name_form = document.querySelector(".main__name_input");
          let phone_form = document.querySelector(".main__phone_input");
          let password_form = document.querySelector(".main__password_input");
          let photo_form = document.querySelector(".main__photo");
          let user_id = response_2["userId"];

          let phone_pattern_1 = new RegExp("^(8|\\+7)( |\-){0,1}9[0-9]{2}( |\-){0,1}[0-9]{3}( |\-){0,1}[0-9]{2}( |\-){0,1}[0-9]{2}$");
          let phone_pattern_2 = new RegExp("^(8|\\+7) {0,1}[(]9[0-9]{2}[)] {0,1}[0-9]{3}( |\-){0,1}[0-9]{2}( |\-){0,1}[0-9]{2}$");

          if (password_form.value.length < 8) {
            alert("Пароль некорректен!\nВведите существующий пароль (чтобы подтвердить изменения) или новый (чтобы изменить его).\n\nP.S. Пароль должен содержать от 8 до 20 символов.");
          }
          else if ((!phone_pattern_1.test(phone_form.value))&&(!phone_pattern_2.test(phone_form.value))) {
            alert("Введённый номер телефона некорректен!\nПовторите попытку.");
          }
          else {
            let cur_phone = phone_form.value.replace("(", "").replace(")", "").replace(" ", "").replace("+7", "8").replace("-", "");

            let new_data = JSON.stringify({
              "userId": user_id + "",
              "pictureId": photo_form.id,
              "nickname": name_form.value,
              "phone": cur_phone,
              "password": password_form.value
            });
  
            let req3 = new XMLHttpRequest();
        
            req3.withCredentials = false;
            req3.open("PUT", "https://iknow2023.bsite.net/api/users");
  
            req3.setRequestHeader("Authorization", reqHeader_2);
            req3.setRequestHeader("Content-Type", "application/json");
        
            req3.send(new_data);
        
            req3.onload = function () {
              if (req3.status != 200) {
                console.log("Error");
              }
              else {
                localStorage["phone"] = phone_form.value;
                localStorage["password"] = password_form.value;

                alert("Данные пользователя успешно обновлены!");
              };
            };
          };
        };
      };
    };
  };
});


// Удаление профиля

document.querySelector(".footer__delete_button").addEventListener("click", function() {

  // Авторизация

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

      // Удаление профиля пользователя

      var cur_choice = confirm("Вы уверены, что хотите удалить свой профиль?\nПри удалении профиля весь ваш прогресс исчезнет навсегда.")
      
      if (cur_choice) {
        let response = JSON.parse(req1.response);
        let token = response.accessToken; 

        let req2 = new XMLHttpRequest();
        
        req2.withCredentials = false;
        var reqHeader = "Bearer " + token;

        req2.open("DELETE", "https://iknow2023.bsite.net/api/users");

        req2.setRequestHeader("Authorization", reqHeader);
        req2.setRequestHeader("Content-Type", "application/json");
        
        req2.send();
        
        req2.onload = function () {
          if (req2.status != 200) {
            alert("Произошла непредвиденная ошибка!\nПовторите попытку позже.");
          }
          else {
            alert("Ваш аккаунт успешно удалён!\n\nСпасибо, что были с нами!\nКоманда iKnow.");
            localStorage["phone"] = "";
            localStorage["password"] = "";
            window.location.href = "index.html";
          };
        };
      };
    };
  };
});


// Плавное появление страницы

let body = document.querySelector("body");

body.style.display = "none";
body.style.opacity = "0%";

setTimeout(() => {
  body.style.display = "flex";
  body.style.animation = "body_appearance 0.5s forwards";
}, 1);