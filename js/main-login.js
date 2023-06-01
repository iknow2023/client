// Появление и исчезание окна входа

document.querySelector(".header__btn").addEventListener("click", function() {
  let modal_background = document.querySelector(".modal__background");
  let modal_window = document.querySelector(".modal__window");

  modal_background.style.display = "unset";
  modal_window.style.display = "flex";
 
  modal_background.style.animation = "modal_background_appearance 0.5s forwards";
  modal_window.style.animation = "modal_window_appearance 0.5s forwards";
});

document.querySelector(".modal__exit_btn").addEventListener("click", function() {
  // Исчезание окна входа
  
  let modal_background = document.querySelector(".modal__background");
  let modal_window = document.querySelector(".modal__window");

  modal_background.style.animation = "modal_background_vanishing 0.5s forwards";
  modal_window.style.animation = "modal_window_vanishing 0.5s forwards";

  setTimeout(() => {
    // Обнуление окна входа
    
    let modal_login = document.querySelector(".modal__login");
    let modal_reg = document.querySelector(".modal__reg");
    let exit_btn = document.querySelector(".modal__exit_btn");
    let modal_window_background = document.querySelector(".modal__window_background");

    modal_reg.style.animation = "modal_reg_vanishing 0.5s forwards";
    modal_reg.style.width = "870px";
    modal_reg.style.height = "450px";
    modal_reg.style.transition = "width 0.5s, height 0.5s";

    modal_login.style.animation = "modal_login_appearance 0.5s forwards";
    modal_login.style.display = "flex";
    modal_login.style.width = "870px";
    modal_login.style.height = "450px";
    modal_login.style.transition = "width 0.5s, height 0.5s";

    exit_btn.style.top = "144px";
    exit_btn.style.right = "250px";
    exit_btn.style.transition = "top 0.5s, right 0.5s, transform 0.3s, box-shadow 0.3s";

    modal_window_background.style.width = "870px";
    modal_window_background.style.height = "450px";
    modal_window_background.style.transition = "width 0.5s, height 0.5s";

    modal_reg.style.display = "none";

    // Обнуление параметров окна входа

    document.querySelector(".modal__login_phone").value = "";
    document.querySelector(".modal__login_password").value = "";
    document.querySelector(".modal__reg_phone").value = "";
    document.querySelector(".modal__reg_name").value = "";
    document.querySelector(".modal__reg_password-1").value = "";
    document.querySelector(".modal__reg_password-2").value = "";

    // Прочее

    modal_background.style.display = "none";
    modal_window.style.display = "none";
  }, 1000);
});


// Смена окон

document.querySelector(".modal__login_link").addEventListener("click", function() {
  let modal_login = document.querySelector(".modal__login");
  let modal_reg = document.querySelector(".modal__reg");
  let exit_btn = document.querySelector(".modal__exit_btn");
  let modal_background = document.querySelector(".modal__window_background");

  modal_login.style.animation = "modal_login_vanishing 0.5s forwards";
  modal_login.style.width = "730px";
  modal_login.style.height = "480px";
  modal_login.style.transition = "width 0.5s, height 0.5s";

  modal_reg.style.animation = "modal_reg_appearance 0.5s forwards";
  modal_reg.style.display = "flex";
  modal_reg.style.width = "730px";
  modal_reg.style.height = "480px";
  modal_reg.style.transition = "width 0.5s, height 0.5s";

  exit_btn.style.top = "129px";
  exit_btn.style.right = "320px";
  exit_btn.style.transition = "top 0.5s, right 0.5s, transform 0.3s, box-shadow 0.3s";

  modal_background.style.width = "730px";
  modal_background.style.height = "480px";
  modal_background.style.transition = "width 0.5s, height 0.5s";

  setTimeout(() => {
    modal_login.style.display = "none";
  }, 1000);
});

document.querySelector(".modal__reg_link").addEventListener("click", function() {
  let modal_login = document.querySelector(".modal__login");
  let modal_reg = document.querySelector(".modal__reg");
  let exit_btn = document.querySelector(".modal__exit_btn");
  let modal_background = document.querySelector(".modal__window_background");

  modal_reg.style.animation = "modal_reg_vanishing 0.5s forwards";
  modal_reg.style.width = "870px";
  modal_reg.style.height = "450px";
  modal_reg.style.transition = "width 0.5s, height 0.5s";

  modal_login.style.animation = "modal_login_appearance 0.5s forwards";
  modal_login.style.display = "flex";
  modal_login.style.width = "870px";
  modal_login.style.height = "450px";
  modal_login.style.transition = "width 0.5s, height 0.5s";

  exit_btn.style.top = "144px";
  exit_btn.style.right = "250px";
  exit_btn.style.transition = "top 0.5s, right 0.5s, transform 0.3s, box-shadow 0.3s";

  modal_background.style.width = "870px";
  modal_background.style.height = "450px";
  modal_background.style.transition = "width 0.5s, height 0.5s";

  setTimeout(() => {
    modal_reg.style.display = "none";
  }, 1000);
});


// Вход

document.querySelector(".modal__login_btn").addEventListener("click", function() {
  let phone_input = document.querySelector(".modal__login_phone");
  let password_input = document.querySelector(".modal__login_password");

  if (phone_input.value == "") {
    alert("Введите номер телефона и повторите попытку входа!");
  }
  else if (password_input.value == "") {
    alert("Введите пароль и повторите попытку входа!");
  }
  else {
    let cur_phone = phone_input.value.replace("+7", "8").replace(" ", "").replace("(", "").replace(")", "").replace("-", "");

    let login_data = JSON.stringify({
      "phone": cur_phone,
      "password": password_input.value,
    });

    let req1 = new XMLHttpRequest();

    req1.withCredentials = false;
    req1.open("POST", "https://iknow2023.bsite.net/api/users/login");
    req1.setRequestHeader("Content-Type", "application/json");

    req1.send(login_data);
  
    req1.onload = function () {
      if (req1.status != 200) {
        alert("Неверный номер телефона или пароль!\nПовторите попытку.")
      }
      else {

        localStorage["phone"] = cur_phone;
        localStorage["password"] = password_input.value;

        alert("Вы успешно вошли в аккаунт!");

        window.location.href = "index-subjects.html"
      };
    };
  };
});


// Регистрация

document.querySelector(".modal__reg_btn").addEventListener("click", function() {
  let phone_input = document.querySelector(".modal__reg_phone");
  let name_input = document.querySelector(".modal__reg_name");
  let password_input_1 = document.querySelector(".modal__reg_password-1");
  let password_input_2 = document.querySelector(".modal__reg_password-2");

  let phone_pattern_1 = new RegExp("^(8|\\+7)( |\-){0,1}9[0-9]{2}( |\-){0,1}[0-9]{3}( |\-){0,1}[0-9]{2}( |\-){0,1}[0-9]{2}$");
  let phone_pattern_2 = new RegExp("^(8|\\+7) {0,1}[(]9[0-9]{2}[)] {0,1}[0-9]{3}( |\-){0,1}[0-9]{2}( |\-){0,1}[0-9]{2}$");

  if (phone_input.value == "") {
    alert("Введите номер телефона и повторите попытку!");
  }
  else if (password_input_1.value == "") {
    alert("Введите пароль и повторите попытку!");
  }
  else if (password_input_2.value == "") {
    alert("Подтвердите пароль и повторите попытку!");
  }
  else if ((!phone_pattern_1.test(phone_input.value))&&(!phone_pattern_2.test(phone_input.value))) {
    alert("Введённый номер телефона некорректен!\nПовторите попытку.")
  }
  else if (password_input_1.value.length < 8) {
    alert("Введённый пароль слишком длинный/короткий!\nВведите новый пароль и повторите попытку.\n\nP.S. Пароль должен содержать от 8 до 20 символов.")
  }
  else if (password_input_1.value != password_input_2.value) {
    alert("Введённые пароли не совпадают!\nПовторите попытку.")
  }
  else {
    let cur_phone = phone_input.value.replace("(", "").replace(")", "").replace(" ", "").replace("+7", "8").replace("-", "");
    let reg_data = JSON.stringify({
      "phone": cur_phone,
      "password": password_input_1.value,
      "nickname": name_input.value,
    });

    let req1 = new XMLHttpRequest();

    req1.withCredentials = false;
    req1.open("POST", "https://iknow2023.bsite.net/api/users/register");
    req1.setRequestHeader("Content-Type", "application/json");

    req1.send(reg_data);
  
    req1.onload = function () {
      if (req1.status != 200) {
        alert("Пользователь с таким номером телефона уже существует!\nПовторите попытку или войдите в аккаунт.")
      }
      else {
        localStorage["phone"] = cur_phone;
        localStorage["password"] = password_input_1.value;
        
        alert("Вы успешно зарегистрировались!");

        window.location.href = "index-subjects.html"
      };
    };
  };
});


// Переход на страницу с предметами

document.querySelector(".main_button").addEventListener("click", function() {
  if ((localStorage["phone"] != "")&&(localStorage["password"] != "")) {
    window.location.href = "index-subjects.html";
  }
  else {
    let modal_background = document.querySelector(".modal__background");
    let modal_window = document.querySelector(".modal__window");
  
    modal_background.style.display = "unset";
    modal_window.style.display = "flex";
   
    modal_background.style.animation = "modal_background_appearance 0.5s forwards";
    modal_window.style.animation = "modal_window_appearance 0.5s forwards";
  };
});


// Проверка входа

if (((!("phone" in localStorage))&&(!("password" in localStorage)))) {
  localStorage["phone"] = "";
  localStorage["password"] = "";
}
else if ((localStorage["phone"] != "")&&(localStorage["password"] != "")) {
  document.querySelector(".header__btn").style.display = "none";
  document.querySelector(".header__profile").style.display = "flex";

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

          if (cur_data["nickname"].length > 9) {
            edit_name.innerHTML = cur_data["nickname"].slice(0, 8) + "...";
          }
          else {
            edit_name.innerHTML = cur_data["nickname"];
          }
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
}
else {
  document.querySelector(".header__profile").style.display = "none";
  document.querySelector(".edit__window").style.display = "none";
};
