// Функция рандома

function random(min, max) {
  return Math.random() * (max - min) + min;
};

// Функция перемешивания массива

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Функция FirstLetterUpper

var capitalize = function(str) {
  let first_symb = str.slice(0, 1);
  first_symb = first_symb.toUpperCase();
  let other_symb = str.slice(1, str.length);
  str = first_symb + other_symb; 
  return str;
}

// Проверка ответа

var check_answer = function(answer, theme_id, cur_id, ex_id, topic_id, cur_diff, reqHeader) {
  let background = document.createElement("div");

  background.style.width = "100%";
  background.style.height = "100%";
  background.style.backgroundColor = "transparent";
  background.style.zIndex = "5";
  background.style.position = "fixed";
  background.style.display = "unset";

  document.querySelector("body").appendChild(background);

  let cur_data_1 = JSON.stringify({
    "type": "Exercise",
    "answer": answer,
  });

  let cur_req = new XMLHttpRequest();

  cur_req.withCredentials = false;
  cur_req.open("POST", "https://iknow2023.bsite.net/api/exercises/check-answer/" + cur_id);
  cur_req.setRequestHeader("Content-Type", "application/json");
  cur_req.setRequestHeader("Authorization", reqHeader);

  cur_req.send(cur_data_1);

  cur_req.onload = function () {
    if (cur_req.status != 200) {
      console.log("Error");
      background.style.display = "none";
    }
    else {
      let cheking = JSON.parse(cur_req.response);

      if (cheking) {
        let cur_req_2 = new XMLHttpRequest();

        cur_req_2.withCredentials = false;
        cur_req_2.open("GET", "https://iknow2023.bsite.net/api/topics/get-topics/" + topic_id);
        cur_req_2.setRequestHeader("Authorization", reqHeader);

        cur_req_2.send();

        cur_req_2.onload = function () {
          if (cur_req_2.status != 200) {
            console.log("Error");
          }
          else {
            let cur_data_2 = JSON.parse(cur_req_2.response);
            let result = cur_data_2[theme_id]["subtopics"][ex_id - cur_diff]["progress"];
            console.log(result);

            localStorage["result"] = result;
            localStorage["subtheme_result"] = result;

            alert("Задание решено правильно!");
            background.style.display = "none";
            window.location.href = "index-results.html";
          };
        };
      }
      else{ 
        alert("Задание выполнено неверно!\nПопробуй снова!");
        background.style.display = "none";
      }
    };
  };
};

// Русский язык

var russian_func = function(ex_id, cur_data, reqHeader) {
  if (ex_id == 1) {
    let cur_task = cur_data["exercise"]["question"];
   
    if(cur_data["exercise"]["id"] >= 1 && cur_data["exercise"]["id"] <= 5){
      let cur_right = cur_task.slice(cur_task.indexOf("_") + 1, cur_task.length);
      let cur_left = cur_task.slice(0, cur_task.indexOf("_"));
     
      let cur_inner = "Какая буква пропущена?";
      let cur_inner_2 = 
      `<div class="letter">
          <p>` + capitalize(cur_left) + `</p>
          <form>
            <input name="text" class="answer" maxlength="1">
          </form>
          <p>` + cur_right + `</p>
        </div>
      `;

      document.querySelector(".main__task_text").innerHTML = cur_inner;
      document.querySelector(".main__task_task").innerHTML = cur_inner_2;
      
      document.querySelector(".answer").style.padding = "0 15px";
      document.querySelector(".answer").style.width = "120px";
      document.querySelector(".answer").style.textAlign = "right";
      document.querySelector(".answer").style.fontSize = "135px";

      document.querySelector(".footer__ready_button").addEventListener("click", function() {
        let cur_answer = document.querySelector(".answer").value;
        check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 1, 1, reqHeader);
      });
    } 
    else if (cur_data["exercise"]["id"] > 5 && cur_data["exercise"]["id"] <= 15){
      let cur_elements = cur_task.split("; ");

      let cur_inner;
      if(cur_data["exercise"]["id"] > 5 && cur_data["exercise"]["id"] <= 10){
        cur_inner = "В каком слове гласную нельзя проверить подбором однокоренного слова?";
      } else if(cur_data["exercise"]["id"] > 10 && cur_data["exercise"]["id"] <= 15){
        cur_inner = "В каком слове можно проверить гласную подбором однокоренного слова?";
      }
      
      let cur_inner_2 = 
      `<table class="table">
        <tr>
          <td>
            <div class="form_radio_btn">
            <input id="radio-1" type="radio" name="radio">
            <label for="radio-1">` + cur_elements[0] + `</label>
            </div>
          </td> 
          <td>
            <div class="form_radio_btn">
            <input id="radio-2" type="radio" name="radio">
            <label for="radio-2">` + cur_elements[1] + `</label>
            </div>
          </td>
        </tr>
        <tr> 
          <td> 
            <div class="form_radio_btn">
            <input id="radio-3" type="radio" name="radio">
            <label for="radio-3">` + cur_elements[2] + `</label>
            </div>
          </td>
          <td> 
            <div class="form_radio_btn">
            <input id="radio-4" type="radio" name="radio">
            <label for="radio-4">` + cur_elements[3] + `</label>
            </div>
          </td>
        </tr>
      </table>
      `;

       //let cur_inner_3 = "Непроверяемые гласные в корне слова.";
     /* let cur_inner_4 = 
      ` <div>
        <p class = "theory__theme">
        Непроверяемые гласные в корне слова нельзя проверить.
        Написание таких слов нужно просто запомнить.
        Правильную форму всегда можно найти в словаре.
        </p>
        </div>
      `;*/
      document.querySelector(".main__task_text").innerHTML = cur_inner;
      document.querySelector(".main__task_task").innerHTML = cur_inner_2;
      //document.querySelector(".theory__theme").innerHTML = cur_inner_3;
     //document.querySelector(".theory__container main").innerHTML = cur_inner_4;
    

      document.querySelector(".footer__ready_button").addEventListener("click", function() {
        let cur_answer;
        if(document.getElementById("radio-1").checked){
          cur_answer = cur_elements[0].toLowerCase();
        } else if(document.getElementById("radio-2").checked){
          cur_answer = cur_elements[1].toLowerCase();
        } else if(document.getElementById("radio-3").checked){
          cur_answer = cur_elements[2].toLowerCase();
        } else if(document.getElementById("radio-4").checked){
          cur_answer = cur_elements[3].toLowerCase();
        };
        check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 1, 1, reqHeader);
      });
    }     
  } 
  else if (ex_id == 2 || ex_id == 3 || ex_id == 4) {
    let cur_task = cur_data["exercise"]["question"];
  
    let cur_right = cur_task.slice(cur_task.indexOf("_") + 1, cur_task.length);
    let cur_left = cur_task.slice(0, cur_task.indexOf("_"));

    let cur_inner;
    if (ex_id == 2 || ex_id == 3) {
      cur_inner = "Какая буква пропущена? Если буква не нужна, поставьте прочерк.";
    } else if (ex_id == 4) {
      cur_inner = "Какая буква пропущена?";
      if(cur_data["exercise"]["id"] >= 56 && cur_data["exercise"]["id"] <= 61) {
        cur_right = cur_task.slice(cur_task.indexOf("_") + 2, cur_task.length);
        cur_left = cur_task.slice(0, cur_task.indexOf("_"));
  
        if(cur_data["exercise"]["id"] >= 56 && cur_data["exercise"]["id"] <= 57){
          cur_inner = "Что нужно вставить, ча или ща?";
        } 
        else if(cur_data["exercise"]["id"] >= 58 && cur_data["exercise"]["id"] <= 59){
          cur_inner = "Что нужно вставить, жи или ши?";
        } 
        else if(cur_data["exercise"]["id"] >= 60 && cur_data["exercise"]["id"] <= 61){
          cur_inner = "Что нужно вставить, чу или щу?";
          //61 слово - щупальца, какая-то проблема , нужно под две буквы окошко
        }
      }
    }
   
    let cur_inner_2 = 
    `<div class="letter">
        <p>` + capitalize(cur_left) + `</p>
        <form>
          <input name = "text" class = "answer" maxlength="1">
        </form>
        <p>` + cur_right + `</p>
      </div>
    `;

    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;

    document.querySelector(".answer").style.padding = "0 15px";
    document.querySelector(".answer").style.width = "120px";
    document.querySelector(".answer").style.textAlign = "right";
    document.querySelector(".answer").style.fontSize = "135px";
    
    if (cur_data["exercise"]["id"] >= 56 && cur_data["exercise"]["id"] <= 61) {
      document.querySelector(".answer").setAttribute("maxlength", "2");
      document.querySelector(".answer").style.width = "250px";
    };

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = document.querySelector(".answer").value.toLowerCase();
      console.log(cur_answer);
      check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 1, 1, reqHeader);
    });
  } 
  else if (ex_id == 5) {
    let cur_task = cur_data["exercise"]["question"];
    let cur_elements = cur_task.split("; ");
    let new_cur_elements = ["", ""];

    for (let letter of cur_elements[0]) {
      if (letter == letter.toLowerCase()) {
        new_cur_elements[0] += letter;
      }
      else {
        new_cur_elements[0] += letter.toLowerCase() + "&#769;";
      };
    };

    for (let letter of cur_elements[1]) {
      if (letter == letter.toLowerCase()) {
        new_cur_elements[1] += letter;
      }
      else {
        new_cur_elements[1] += letter.toLowerCase() + "&#769;";
      };
    };

    let cur_inner = "В каком слове правильно выделено ударение?";
    let cur_inner_2 = 
    `<table class="table">
      <tr>
        <td>
          <div class="form_radio_btn">
          <input id="radio-1" type="radio" name="radio" value="1">
          <label for="radio-1">` + new_cur_elements[0] + `</label>
          </div>
        </td> 
        <td>
          <div class="form_radio_btn">
          <input id="radio-2" type="radio" name="radio" value="2">
          <label for="radio-2">` + new_cur_elements[1] + `</label>
          </div>
        </td>
      </tr>
    </table>
    `;

    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;
    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "100%";

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer;
      if(document.getElementById("radio-1").checked){
        cur_answer = document.getElementById("radio-1").value;
      } else if(document.getElementById("radio-2").checked){
        cur_answer = document.getElementById("radio-2").value;
      } 
      check_answer(cur_answer, 1, cur_data["exercise"]["id"], ex_id, 1, 5, reqHeader);
    });
  } 
  else if (ex_id == 6) {
    let cur_task = cur_data["exercise"]["question"];
   
    let cur_word = cur_task.slice(cur_task.indexOf("(") + 1, cur_task.indexOf(")"));
    let cur_left = cur_task.slice(0, cur_task.indexOf("("));
    let cur_right = cur_task.slice(cur_task.indexOf(")") + 1, cur_task.length);
    
    let cur_inner = "Поставьте слово, указанное в скобках, в правильную форму.";
    let cur_inner_2 = 
    `<div class="case">
        <p>`+ capitalize(cur_left) + `</p>
        <form>
          <input name="word" id ="word" class = "answer" pattern="\d[А-Яа-яЁё]" placeholder="`+ cur_word + `">
        </form>
        <p> `+ cur_right + `</p>
      </div>
    `;

    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;
    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "100%";

    document.querySelector(".answer").style.width = cur_word.length * 55 + "px";

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = document.querySelector(".answer").value.toLowerCase();
      check_answer(cur_answer, 2, cur_data["exercise"]["id"], ex_id, 1, 6, reqHeader);
    });
  };
};

// Математика

var math_func = function(ex_id, cur_data, reqHeader) {
  if ((ex_id >= 7)&&(ex_id <= 18)) {
    // Примеры

    cur_data = cur_data["exercise"];

    let cur_task = cur_data["question"];
    let cur_left = cur_task.slice(0, cur_task.indexOf("?")).replace("*", "&#215;").replace(":", "&#247;");
    let cur_right = cur_task.slice(cur_task.indexOf("?") + 1, cur_task.length).replace("*", "&#215;").replace(":", "&#247;");

    document.querySelector(".main__task_text").innerHTML = "Вставь в окошко подходящую цифру:";

    let cur_inner = `
    <div class="letter flex">
      <p class="left_text">` + cur_left + `</p>

      <form>
        <input name="text" maxlength="2" class="cur_task">
      </form>

      <p class="right_text">` + cur_right + `</p>
    </div>
    `;

    document.querySelector(".main__task_task").innerHTML = cur_inner;

    if (cur_left.length > 0) {
      document.querySelector(".left_text").style.marginRight = "50px";
    };
    if (cur_right.length > 0) {
      document.querySelector(".right_text").style.marginLeft = "50px";
    };

    document.querySelector(".cur_task").style.width = "220px";
    document.querySelector(".cur_task").style.height = "160px";
    document.querySelector(".cur_task").style.fontSize = "135px";
    document.querySelector(".cur_task").style.textAlign = "right";
    document.querySelector(".cur_task").style.padding = "0 calc(45px * var(--koef))";

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = document.querySelector(".cur_task").value;
      check_answer(cur_answer, 0, cur_data["id"], ex_id, 2, 7, reqHeader);
    });
  }
  else if ((ex_id >= 19)&&(ex_id <= 21)) {
    cur_data = cur_data["exercise"];
    console.log(cur_data);

    let cur_task = cur_data["question"];
    let options = cur_data["options"].split("; ");

    
    document.querySelector(".main__task_text").innerHTML = "Попробуй понять смысл и выбери правильный ответ:";

    let cur_inner = `
      <p class="main__task_task-text">` + cur_task + `</p>

      <table class="table">
        <tr>
          <td>
            <div class="form_radio_btn_math">
            <input id="radio-1" type="radio" name="radio">
            <label for="radio-1">` + options[0] + `</label>
            </div>
          </td> 
          <td>
            <div class="form_radio_btn_math">
            <input id="radio-2" type="radio" name="radio">
            <label for="radio-2">` + options[1] + `</label>
            </div>
          </td>
        </tr>
        <tr> 
          <td> 
            <div class="form_radio_btn_math">
            <input id="radio-3" type="radio" name="radio">
            <label for="radio-3">` + options[2] + `</label>
            </div>
          </td>
          <td> 
            <div class="form_radio_btn_math">
            <input id="radio-4" type="radio" name="radio">
            <label for="radio-4">` + options[3] + `</label>
            </div>
          </td>
        </tr>
      </table>
    `;

    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.justifyContent = "space-evenly";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "calc(700px * var(--koef))";
    document.querySelector(".main__task_task").innerHTML = cur_inner;

    document.querySelector(".main__task_task-text").style.fontSize = "calc(70px * var(--koef))";
    document.querySelector(".main__task_task-text").style.textAlign = "center";
    document.querySelector(".main__task_task-text").style.letterSpacing = "0px";
    document.querySelector(".main__task_task-text").style.lineHeight = "60px";
    document.querySelector(".main__task_task-text").style.width = "60%";
    document.querySelector(".main__task_task-text").style.marginTop = "60px";

    for (let option of options) {
      if ((option + "").length > 1) {
        document.querySelectorAll(".form_radio_btn_math label").forEach(elem => {
          elem.style.width = "120px";
        });
      };
    };

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer;
      
      for (let radio_name of ["radio-1", "radio-2", "radio-3", "radio-4"]) {
        if (document.getElementById(radio_name).checked) {
          cur_answer = options[parseInt(radio_name.slice(radio_name.length - 1, radio_name.length)) - 1]; 
        };
      };

      check_answer(cur_answer, 1, cur_data["id"], ex_id, 2, 19, reqHeader);
    });
  };
};

// Окружающий мир

var world_func = function(ex_id, cur_data, reqHeader) {
  if ((ex_id >= 22)&&(ex_id <= 24)) {
    cur_data = cur_data["constellation"];
    console.log(cur_data);

    let task_text = document.querySelector(".main__task_text")
    let con_name = cur_data["name"];
    task_text.innerHTML = "Соедини звёзды и получи созвездие \"" + con_name + "\":";

    let right_path = [];

    // Создание звёзд

    for (let cur_star of cur_data["stars"]) {
      let star = document.createElement("img");
      let star_in = document.createElement("img");
      let star_in_right = document.createElement("img");
      let star_in_wrong = document.createElement("img");
      let star_number = document.createElement("div");
      let star_hover = document.createElement("img");
      
      star.src = "img/task_task/word/stars/black_star.png";
      star.style.width = "41px";
      star.style.height = "41px";
      star.style.position = "absolute";
      star.style.left = "calc(" + cur_star["x"] + "px * var(--koef))";
      star.style.top = "calc(" + (cur_star["y"] - 70) + "px * var(--koef))";
      star.style.zIndex = "3";

      star_in.style.width = "30px";
      star_in.style.height = "30px";
      star_in.style.backgroundImage = "white";
      star_in.style.position = "absolute";
      star_in.style.left = "calc(" + (cur_star["x"] - 9) + "px * var(--koef) + 10px)";
      star_in.style.top = "calc(" + (cur_star["y"] - 79) + "px * var(--koef) + 10px)";
      star_in.style.zIndex = "4";
      star_in.style.opacity = "100%";
      
      star_in_right.src = "img/task_task/word/stars/yellow_star.png";
      star_in_right.style.width = "30px";
      star_in_right.style.height = "30px";
      star_in_right.style.backgroundImage = "white";
      star_in_right.style.position = "absolute";
      star_in_right.style.left = "calc(" + (cur_star["x"] - 9) + "px * var(--koef) + 10px)";
      star_in_right.style.top = "calc(" + (cur_star["y"] - 79) + "px * var(--koef) + 10px)";
      star_in_right.style.zIndex = "4";
      star_in_right.style.opacity = "0%";

      star_in_wrong.src = "img/task_task/word/stars/red_star.png";
      star_in_wrong.style.width = "30px";
      star_in_wrong.style.height = "30px";
      star_in_wrong.style.backgroundImage = "white";
      star_in_wrong.style.position = "absolute";
      star_in_wrong.style.left = "calc(" + (cur_star["x"] - 9) + "px * var(--koef) + 10px)";
      star_in_wrong.style.top = "calc(" + (cur_star["y"] - 79) + "px * var(--koef) + 10px)";
      star_in_wrong.style.zIndex = "4";
      star_in_wrong.style.opacity = "0%";

      if (cur_star["isClicked"]) {
        right_path[cur_star["number"] - 1] = "star_" + cur_star["number"];

        star.style.cursor = "pointer";

        star_in.src = "img/task_task/word/stars/white_star.png";
        star_in.style.cursor = "pointer";

        star_in_right.style.cursor = "pointer";

        star_in_wrong.style.cursor = "pointer";

        star_number.innerHTML = (cur_star["number"]) + "";
        star_number.style.color = "black";
        star_number.style.position = "absolute";
        star_number.style.display = "flex";
        star_number.style.justifyContent = "center";
        star_number.style.alignItems = "center";
        star_number.style.letterSpacing = "0px";
        star_number.style.fontSize = "calc(30px * var(--koef))";
        star_number.style.padding = "0";
        star_number.style.width = "30px";
        star_number.style.height = "30px";
        star_number.style.left = "calc(" + (cur_star["x"] + 11) + "px * var(--koef))";
        star_number.style.top = "calc(" + (cur_star["y"] - 59) + "px * var(--koef))";
        star_number.style.zIndex = "5";
        star_number.style.cursor = "pointer";

        star_hover.src = "img/task_task/word/stars/black_star.png";
        star_hover.style.width = "41px";
        star_hover.style.height = "41px";
        star_hover.style.position = "absolute";
        star_hover.style.left = "calc(" + cur_star["x"] + "px * var(--koef))";
        star_hover.style.top = "calc(" + (cur_star["y"] - 70) + "px * var(--koef))";
        star_hover.style.zIndex = "6";
        star_hover.style.cursor = "pointer";
        star_hover.style.opacity = "0%";
        star_hover.classList.add("star_hover");
        star_hover.id = "star_" + cur_star["number"];

        star_number.style.transition = "transform 0.3s";
        star_hover.style.transition = "transform 0.3s";

        star_hover.addEventListener("mouseover", function() {
          star.style.transform = "scale(110%)";
          star_in.style.transform = "scale(110%)";
          star_in_right.style.transform = "scale(110%)";
          star_in_wrong.style.transform = "scale(110%)";
          star_number.style.transform = "scale(110%)";
          star_hover.style.transform = "scale(110%)";
        });
  
        star_hover.addEventListener("mouseout", function() {
          star.style.transform = "scale(100%)";
          star_in.style.transform = "scale(100%)";
          star_in_right.style.transform = "scale(100%)";
          star_in_wrong.style.transform = "scale(100%)";
          star_number.style.transform = "scale(100%)";
          star_hover.style.transform = "scale(100%)";
        });
  
        star_hover.addEventListener("mousedown", function() {
          star.style.transform = "scale(100%)";
          star_in.style.transform = "scale(100%)";
          star_in_right.style.transform = "scale(100%)";
          star_in_wrong.style.transform = "scale(100%)";
          star_number.style.transform = "scale(100%)";
          star_hover.style.transform = "scale(100%)";
  
          if ((star_hover.id == right_path[0])&&(star_in.style.opacity == "1")) {
            star_in.style.opacity = "0%";
            star_in_right.style.opacity = "100%";
  
            console.log(right_path[0]);
  
            if (right_path[0] != "star_1") {
              document.getElementById("line_" + right_path[0].slice(5, right_path[0].length)).style.opacity = "100%";
            };
  
            right_path = right_path.slice(1, right_path.length);
          }
          else if (star_in_right.style.opacity != "1") {
            star_in.style.opacity = "0%";
            star_in_wrong.style.opacity = "100%";
            setTimeout(() => {
              star_in.style.opacity = "100%";
              star_in_wrong.style.opacity = "0%";
            }, 500);
          };
        });
  
        star_hover.addEventListener("mouseup", function() {
          star.style.transform = "scale(110%)";
          star_in.style.transform = "scale(110%)";
          star_in_right.style.transform = "scale(110%)";
          star_in_wrong.style.transform = "scale(110%)";
          star_number.style.transform = "scale(110%)";
          star_hover.style.transform = "scale(110%)";
        });
      }
      else {
        star_in.src = "img/task_task/word/stars/yellow_star.png";
      }

      star.style.transition = "transform 0.3s";
      star_in.style.transition = "transform 0.3s, opacity 0.3s";
      star_in_right.style.transition = "transform 0.3s, opacity 0.3s";
      star_in_wrong.style.transition = "transform 0.3s, opacity 0.3s";

      document.querySelector(".main__task_task").appendChild(star);
      document.querySelector(".main__task_task").appendChild(star_in);
      document.querySelector(".main__task_task").appendChild(star_in_right);
      document.querySelector(".main__task_task").appendChild(star_in_wrong);
      document.querySelector(".main__task_task").appendChild(star_number);
      document.querySelector(".main__task_task").appendChild(star_hover);
    };

    // Создание проведённых линий

    for (let cur_line of cur_data["lines"]) {
      let line = document.createElement("div");

      line.style.height = "3px";
      line.style.backgroundColor = "black";
      line.style.position = "absolute";
      line.style.zIndex = "2";

      let first_star;
      let second_star;

      if (cur_data["stars"][cur_line["starLeftNumber"] - 1]["x"] < cur_data["stars"][cur_line["starRightNumber"] - 1]["x"]) {
        first_star = cur_data["stars"][cur_line["starLeftNumber"] - 1];
        second_star = cur_data["stars"][cur_line["starRightNumber"] - 1];
      }
      else {
        first_star = cur_data["stars"][cur_line["starRightNumber"] - 1];
        second_star = cur_data["stars"][cur_line["starLeftNumber"] - 1];
      }

      let hyp = (Math.sqrt(Math.pow(second_star["x"] - first_star["x"], 2) + Math.pow(second_star["y"] - first_star["y"], 2)));
      let hyp_half = hyp / 2;
      let h = second_star["y"] - first_star["y"];
      let h_half = h / 2;
      let alpha = Math.asin(h_half / hyp_half) * 57.3;

      let start_y = first_star["y"] + h_half;
      let hyp_half_part_2 = Math.sqrt(Math.pow(hyp_half, 2) - Math.pow(h_half, 2));
      let hyp_half_part_1 = hyp_half - hyp_half_part_2;
      let start_x = first_star["x"] - hyp_half_part_1;
      
      line.style.width = "calc(" + hyp + "px * var(--koef))";
      line.style.transform = "rotate(" + alpha + "deg)";
      line.style.left = "calc(" + (start_x + 40) + "px * var(--koef))";
      line.style.top = "calc(" + (start_y - 30) + "px * var(--koef))";
      line.style.opacity = "100%";

      document.querySelector(".main__task_task").appendChild(line);
    };

    // Создание непроведённых линий

    for (let cur_line_index = 1; cur_line_index < cur_data["stars"].length; cur_line_index++) {
      let line = document.createElement("div");

      line.style.height = "3px";
      line.style.backgroundColor = "black";
      line.style.position = "absolute";
      line.style.zIndex = "2";

      let first_star;
      let second_star;

      if (cur_data["stars"][cur_line_index - 1]["x"] < cur_data["stars"][cur_line_index]["x"]) {
        first_star = cur_data["stars"][cur_line_index - 1];
        second_star = cur_data["stars"][cur_line_index];
      }
      else {
        first_star = cur_data["stars"][cur_line_index];
        second_star = cur_data["stars"][cur_line_index - 1];
      }

      let hyp = (Math.sqrt(Math.pow(second_star["x"] - first_star["x"], 2) + Math.pow(second_star["y"] - first_star["y"], 2)));
      let hyp_half = hyp / 2;
      let h = second_star["y"] - first_star["y"];
      let h_half = h / 2;
      let alpha = Math.asin(h_half / hyp_half) * 57.3;
     
      let start_y = first_star["y"] + h_half;
      let hyp_half_part_2 = Math.sqrt(Math.pow(hyp_half, 2) - Math.pow(h_half, 2));
      let hyp_half_part_1 = hyp_half - hyp_half_part_2;
      let start_x = first_star["x"] - hyp_half_part_1;

      line.style.width = "calc(" + hyp + "px * var(--koef))";
      line.style.transform = "rotate(" + alpha + "deg)";
      line.style.left = "calc(" + (start_x + 40) + "px * var(--koef))";
      line.style.top = "calc(" + (start_y - 30) + "px * var(--koef))";
      line.style.opacity = "0%";
      line.style.transition = "opacity 0.5s";
      line.id = "line_" + (cur_line_index + 1);

      document.querySelector(".main__task_task").appendChild(line);
    };

    // Проверка решения

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let background = document.createElement("div");

      background.style.width = "100%";
      background.style.height = "100%";
      background.style.backgroundColor = "transparent";
      background.style.zIndex = "5";
      background.style.position = "fixed";
      background.style.display = "unset";

      document.querySelector("body").appendChild(background);

      if (right_path.length == 0) {
        let cur_data_1 = JSON.stringify({
          "type": "Constellation",
          "answer": "true",
        });

        let cur_req = new XMLHttpRequest();

        cur_req.withCredentials = false;
        cur_req.open("POST", "https://iknow2023.bsite.net/api/exercises/check-answer/" + cur_data["id"]);
        cur_req.setRequestHeader("Content-Type", "application/json");
        cur_req.setRequestHeader("Authorization", reqHeader);

        cur_req.send(cur_data_1);

        cur_req.onload = function () {
          if (cur_req.status != 200) {
            console.log("Error");
          }
          else {
            let cur_req_2 = new XMLHttpRequest();

            cur_req_2.withCredentials = false;
            cur_req_2.open("GET", "https://iknow2023.bsite.net/api/topics/get-topics/3");
            cur_req_2.setRequestHeader("Authorization", reqHeader);

            cur_req_2.send();

            cur_req_2.onload = function () {
              if (cur_req_2.status != 200) {
                console.log("Error");
              }
              else {
                let cur_data_2 = JSON.parse(cur_req_2.response);
                let result = cur_data_2[0]["subtopics"][ex_id - 22]["progress"];
                localStorage["result"] = result;

                alert("Задание решено правильно!");
                background.style.display = "none";
                window.location.href = "index-results.html";
              };
            };
          };
        };
      }
      else {
        alert("Созвездие ещё не дорисовано!\nПопробуй ещё раз.");
        background.style.display = "none";
      };
    });
  }
  else if(ex_id == 25) {
    cur_data = cur_data["exercise"];
    console.log(cur_data);

    let cur_task = cur_data["question"];
    let options = cur_data["options"].split("; ");

    
    document.querySelector(".main__task_text").innerHTML = "Узнай страну/материк по очертанию:";

    let cur_inner = `
      <div class="left_slf1">
        <div class="slf_radio_btn">
          <input id="radio-1" type="radio" name="radio">
          <label for="radio-1">` + options[0] + `</label>
        </div>

        <div class="slf_radio_btn">
          <input id="radio-2" type="radio" name="radio">
          <label for="radio-2">` + options[1] + `</label>
        </div>		

        <div class="slf_radio_btn">
          <input  id="radio-3" type="radio" name="radio">
          <label for="radio-3">` + options[2] + `</label>
        </div>
      </div>

      <div class="main__task_img_slf">
        <img src="img/task_task/word/countries/` + cur_task + `.png" class="task_photo">
      </div>
    `;

    document.querySelector(".main__task_task").innerHTML = cur_inner;

    document.querySelector(".task_photo").classList.add("no_pointer_events");

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer;
      
      for (let radio_name of ["radio-1", "radio-2", "radio-3"]) {
        if (document.getElementById(radio_name).checked) {
          cur_answer = options[parseInt(radio_name.slice(radio_name.length - 1, radio_name.length)) - 1]; 
        };
      };

      check_answer(cur_answer, 1, cur_data["id"], ex_id, 3, 25, reqHeader);
    });
  }
  else if(ex_id == 26) {
    cur_data = cur_data["exercise"];
    console.log(cur_data);

    let cur_task = cur_data["question"].split("; ");
    let options = cur_data["options"].split("; ");
    
    document.querySelector(".main__task_text").innerHTML = "Соотнеси названия стран с соответствующим флагом:";

    let choising = [0, 1, 2];
    shuffle(choising);

    let cur_inner = `
      <div class="flag">
        <ul class="tasks__list2 flex">
          <li class="li_img"><img class="tasks__img" src="img/task_task/word/flag/` + cur_task[0] + `.png"></li>
          <li class="li_img"><img class="tasks__img" src="img/task_task/word/flag/` + cur_task[1] + `.png"></li>
          <li class="li_img"><img class="tasks__img" src="img/task_task/word/flag/` + cur_task[2] + `.png"></li>
        </ul>
      </div>

      <div class="country">
        <ul class="tasks__list">
          <li class="tasks__item">` + options[choising[0]] + `</li>
          <li class="tasks__item">` + options[choising[1]] + `</li>
          <li class="tasks__item">` + options[choising[2]] + `</li>
        </ul>
      </div>
    `;

    document.querySelector(".main__task_task").innerHTML = cur_inner;
    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.flexDirection = "column";
    document.querySelector(".main__task_task").style.justifyContent = "center";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "100%";

    document.querySelector(".tasks__list").style.justifyContent = "center";
    document.querySelector(".tasks__list").style.alignItems = "center";
    document.querySelector(".tasks__list").style.padding = "0";

    document.querySelector(".tasks__list2").style.padding = "0";
    document.querySelector(".tasks__list2").style.margin = "50px 0 30px 50px";

    document.querySelectorAll(".tasks__item").forEach(elem => {
      elem.style.lineHeight = "60px";
    });

    document.querySelectorAll(".li_img:not(:last-child)").forEach(elem => {
      elem.style.marginRight = "200px";
    });

    // Осуществление Drag'n'drop

    let items_list = document.querySelector(".tasks__list");
    let items = document.querySelectorAll(".tasks__item");
    
    items.forEach(item => {
      item.draggable = "true";

      item.addEventListener("dragstart", function() {
        setTimeout(() => {
          item.classList.add("dragging");
        }, 0);
      });

      item.addEventListener("dragend", function() {
        item.classList.remove("dragging");
      });
    });

    items_list.addEventListener("dragover", function(event) {
      let dragging_item = document.querySelector(".dragging");

      let siblings = [...items_list.querySelectorAll(".tasks__item:not(.dragging)")];

      let next_sibling = siblings.find(sibling => {
        return event.clientX <= sibling.offsetLeft + sibling.offsetWidth;
      });

      items_list.insertBefore(dragging_item, next_sibling);
    });

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = cur_task[0] + document.querySelectorAll(".tasks__item")[0].textContent + "; ";
      cur_answer += cur_task[1] + document.querySelectorAll(".tasks__item")[1].textContent + "; ";
      cur_answer += cur_task[2] + document.querySelectorAll(".tasks__item")[2].textContent;

      console.log(cur_answer);

      check_answer(cur_answer, 1, cur_data["id"], ex_id, 3, 25, reqHeader);
    });
  }
  else if(ex_id == 27) {
    cur_data = cur_data["exercise"];
    console.log(cur_data);

    let cur_task = cur_data["question"].split("; ");
    let options = cur_data["options"].split("; ");
    
    document.querySelector(".main__task_text").innerHTML = "Соотнеси географический объект с интересным фактом о нём:";

    let cur_inner;

    if (options.length == 2) {
      let choising = [0, 1];
      shuffle(choising);
  
      cur_inner = `
        <div class="fact">
          <ul class="tasks__list2">
            <li class="tasks__fact">` + cur_task[0] + `</li>
            <li class="tasks__fact">` + cur_task[1] + `</li>
          </ul>
        </div>

        <div class="object">
          <ul class="tasks__list" id="objects">
            <li class="tasks__item" id="object1">` + options[choising[0]] + `</li>
            <li class="tasks__item" id="object2">` + options[choising[1]] + `</li>
          </ul>
        </div>
      `;
    }
    else {
      let choising = [0, 1, 2];
      shuffle(choising);

      cur_inner = `
        <div class="fact">
          <ul class="tasks__list2">
            <li class="tasks__fact">` + cur_task[0] + `</li>
            <li class="tasks__fact">` + cur_task[1] + `</li>
            <li class="tasks__fact">` + cur_task[2] + `</li>
          </ul>
        </div>

        <div class="object">
          <ul class="tasks__list" id="objects">
            <li class="tasks__item" id="object1">` + options[choising[0]] + `</li>
            <li class="tasks__item" id="object2">` + options[choising[1]] + `</li>
            <li class="tasks__item" id="object3">` + options[choising[2]] + `</li>
          </ul>
        </div>
      `;
    };

    document.querySelector(".main__task_task").innerHTML = cur_inner;
    document.querySelector(".main__task_task").style.paddingTop = "50px";
    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.justifyContent = "center";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "100%";

    document.querySelector(".tasks__list").style.margin = "0 50px 0 0";

    document.querySelector(".tasks__list2").style.margin = "0 100px 60px 0";
    document.querySelector(".tasks__list2").style.textAlign = "center";
    document.querySelector(".tasks__list2").style.display = "flex";
    document.querySelector(".tasks__list2").style.flexDirection = "column";
    document.querySelector(".tasks__list2").style.justifyContent = "center";
    document.querySelector(".tasks__list2").style.alignItems = "center";

    document.querySelectorAll(".tasks__fact").forEach(elem => {
      elem.style.margin = "0";
    });

    document.querySelectorAll(".tasks__fact:not(:last-child)").forEach(elem => {
      elem.style.marginBottom = "90px";
    });

    document.querySelectorAll(".tasks__item").forEach(elem => {
      elem.style.margin = "0 0 60px";
    });

    
    // Осуществление Drag'n'drop

    let items_list = document.querySelector(".tasks__list");
    let items = document.querySelectorAll(".tasks__item");
    
    items.forEach(item => {
      item.draggable = "true";

      item.addEventListener("dragstart", function() {
        setTimeout(() => {
          item.classList.add("dragging");
        }, 0);
      });

      item.addEventListener("dragend", function() {
        item.classList.remove("dragging");
      });
    });

    items_list.addEventListener("dragover", function(event) {
      let dragging_item = document.querySelector(".dragging");

      let siblings = [...items_list.querySelectorAll(".tasks__item:not(.dragging)")];

      let next_sibling = siblings.find(sibling => {
        return event.clientY - 300 <= sibling.offsetTop + sibling.offsetHeight;
      });

      items_list.insertBefore(dragging_item, next_sibling);
    });

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer;
      
      if (options.length == 2) {
        cur_answer = document.querySelectorAll(".tasks__item")[0].textContent + "; ";
        cur_answer += document.querySelectorAll(".tasks__item")[1].textContent;
      }
      else {
        cur_answer = document.querySelectorAll(".tasks__item")[0].textContent + "; ";
        cur_answer += document.querySelectorAll(".tasks__item")[1].textContent + "; ";
        cur_answer += document.querySelectorAll(".tasks__item")[2].textContent;
      };

      check_answer(cur_answer, 1, cur_data["id"], ex_id, 3, 25, reqHeader);
    });
  };
};

// ОБЖ

var lsf_func = function(ex_id, cur_data, reqHeader) {
  if (ex_id == 28 || ex_id == 32 || ex_id == 33 || ex_id == 34) {
    let cur_pic = cur_data["exercise"]["question"];
    let cur_options = cur_data["exercise"]["options"];
    cur_options = cur_options.split("; ");

    let cur_inner;
    if (ex_id == 28){
      cur_inner = `Найдите на картинке предмет, который может стать причиной пожара:`;
    } else if (ex_id == 32 || ex_id == 33 || ex_id == 34) {
      cur_inner = `Какой знак изображен на картинке?`;
    }
     
    let folder_name;
    if(ex_id == 28){
      folder_name = "flammable/";
    } else { 
      folder_name = "";
    }

    let cur_inner_2;
      if(ex_id == 28 || ex_id == 32){
        cur_inner_2 = `
          <div class="radio_container">
            <div class="slf_radio_btn">
              <input id="radio-1" type="radio" name="radio">
              <label for="radio-1">` + capitalize(cur_options[0]) + `</label>
            </div>

            <div class="slf_radio_btn">
              <input id="radio-2" type="radio" name="radio">
              <label for="radio-2">` + capitalize(cur_options[1]) + `</label>
            </div>
          
            <div class="slf_radio_btn">
              <input id="radio-3" type="radio" name="radio">
              <label for="radio-3">`+ capitalize(cur_options[2]) + `</label>
            </div>

            <div class="slf_radio_btn">
              <input id="radio-4" type="radio" name="radio">
              <label for="radio-4">`+ capitalize(cur_options[3]) + `</label>
            </div>
          </div>
          
          <div class="main__task_img_slf">
            <img src="img/task_task/lsf/` + folder_name + cur_pic + `.png" class="cur_main__task_img">
          </div>
        `;
        
      } 
      else if (ex_id == 33 || ex_id == 34) {
        cur_inner_2 = `
        <div class="radio_container">
          <div class="slf_radio_btn">
            <input id="radio-1" type="radio" name="radio">
            <label for="radio-1">` + capitalize(cur_options[0]) + `</label>
          </div>

          <div class="slf_radio_btn">
            <input id="radio-2" type="radio" name="radio">
            <label for="radio-2">` + capitalize(cur_options[1]) + `</label>
          </div>

          <div class="slf_radio_btn">
            <input id="radio-3" type="radio" name="radio">
            <label for="radio-3">`+ capitalize(cur_options[2]) + `</label>
          </div>
        </div>

        <div class="main__task_img_slf">
          <img src="img/task_task/lsf/` + folder_name + cur_pic + `.png" class="cur_main__task_img">
        </div>
        `;
      };
     
      document.querySelector(".main__task_text").innerHTML = cur_inner;
      document.querySelector(".main__task_task").innerHTML = cur_inner_2;

      document.querySelector(".cur_main__task_img").classList.add("no_pointer_events");

      if (ex_id == 28) {
        document.querySelectorAll(".slf_radio_btn").forEach(elem => {
          elem.style.padding = "0 35px 120px 0";
        });

        document.querySelector(".radio_container").style.display = "flex";
        document.querySelector(".radio_container").style.flexDirection = "row";
        document.querySelector(".radio_container").style.flexWrap = "wrap";
        document.querySelector(".radio_container").style.justifyContent = "center";
        document.querySelector(".radio_container").style.alignItems = "center";
        document.querySelector(".radio_container").style.width = "50%";
      }
      else if (ex_id == 32 || ex_id == 33 || ex_id == 34) {
        document.querySelectorAll(".slf_radio_btn").forEach(elem => {
          elem.style.padding = "0 35px 120px 0";
        });

        document.querySelector(".radio_container").style.display = "flex";
        document.querySelector(".radio_container").style.flexDirection = "row";
        document.querySelector(".radio_container").style.flexWrap = "wrap";
        document.querySelector(".radio_container").style.justifyContent = "center";
        document.querySelector(".radio_container").style.alignItems = "center";
        document.querySelector(".radio_container").style.width = "70%";

        document.querySelector(".main__task_task").style.height = "100%";
      };

      document.querySelector(".footer__ready_button").addEventListener("click", function() {
        let cur_answer;
        if(document.getElementById("radio-1").checked){
          cur_answer = cur_options[0].toLowerCase();
        } else if(document.getElementById("radio-2").checked){
          cur_answer = cur_options[1].toLowerCase();
        } else if(document.getElementById("radio-3").checked){
          cur_answer = cur_options[2].toLowerCase();
        } else if(document.getElementById("radio-4").checked){
          cur_answer = cur_options[3].toLowerCase();
        };

        if (ex_id == 28){
          check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 4, 28, reqHeader);
        } else if (ex_id == 32 || ex_id == 33 || ex_id == 34) {
          console.log(cur_data);
          check_answer(cur_answer, 1, cur_data["exercise"]["id"], ex_id, 4, 31, reqHeader);
        }
      });
  } 
  else if (ex_id == 29) { 
    let cur_task = cur_data["exercise"]["question"];
    let cur_options = cur_data["exercise"]["options"];
    cur_options = cur_options.split("; ");
    console.log(cur_options);
    
    let cur_inner = cur_task;

    let cur_inner_2 = "";

    for (let cur_index = 1; cur_index < cur_options.length + 1; cur_index++) {
      cur_inner_2 += `
        <div class="slf_checkbox_btn">
          <input id="custom-checkbox` + cur_index + `" class="custom-checkbox" type="checkbox">
          <label for="custom-checkbox` + cur_index + `">` + capitalize(cur_options[cur_index - 1]) + `</label>
        </div>
      `;
    };

    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;

    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.justifyContent = "center";
    document.querySelector(".main__task_task").style.flexWrap = "wrap";
    document.querySelector(".main__task_task").style.height = "100%";

    document.querySelectorAll(".slf_checkbox_btn label").forEach(elem => {
      elem.style.fontSize = "35px";
    });

  
    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = "";
      for(let i = 1; i <= cur_options.length; i++){
        if(document.getElementById("custom-checkbox" + i).checked){
          cur_answer += cur_options[i-1].toLowerCase() + "; ";
        };
      }
      cur_answer = cur_answer.slice(0, cur_answer.length - 2);
      check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 4, 28, reqHeader);
    })

  } 
  else if (ex_id == 30) { 
    let cur_task = cur_data["exercise"]["question"];
    
    let cur_inner = cur_task;
    let cur_inner_2 = 
      `<div class="main__task_stress">
      <table class="table">
        <tr>
          <td>
            <div class="form_radio_btn">
            <input id="radio-1" type="radio" name="radio" value = "да">
            <label for="radio-1">Да</label>
            </div>
          </td> 
          <td>
            <div class="form_radio_btn">
            <input id="radio-2" type="radio" name="radio"  value = "нет">
            <label for="radio-2">Нет</label>
            </div>
          </td>
        </tr>
      </table>
      </div>
      `;

    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer;
      if(document.getElementById("radio-1").checked){
        cur_answer = document.getElementById("radio-1").value;
      } else if (document.getElementById("radio-2").checked){
        cur_answer = document.getElementById("radio-2").value;
      }
      check_answer(cur_answer, 0, cur_data["exercise"]["id"], ex_id, 4, 28, reqHeader);
    });
  } 
  else if (ex_id == 31) { 
    let cur_task = cur_data["exercise"]["question"];
    let cur_options = cur_data["exercise"]["options"];
    cur_options = cur_options.split("; ");
    
    let cur_inner = cur_task;
    let str = "";
    str +=  `<div class="main__task_slf">`; 
    for(let i = 1; i <= cur_options.length; i++){
      str +=  `<div class="slf_radio_btn">
                  <input id="radio-` + i + `" type="radio" name="radio">
                  <label for="radio-` + i + `">` + capitalize(cur_options[i-1]) + `</label>
                </div>
              `
    }
    str +=  `</div>`; 
    let cur_inner_2 = str;
    
    document.querySelector(".main__task_text").innerHTML = cur_inner;
    document.querySelector(".main__task_task").innerHTML = cur_inner_2;

    document.querySelector(".main__task_task").style.display = "flex";
    document.querySelector(".main__task_task").style.justifyContent = "center";
    document.querySelector(".main__task_task").style.alignItems = "center";
    document.querySelector(".main__task_task").style.height = "100%";
    document.querySelector(".main__task_task").style.lineHeight = "0";

    document.querySelector(".main__container").style.padding = "0";

    document.querySelector(".main__task_slf").style.display = "flex";
    document.querySelector(".main__task_slf").style.justifyContent = "center";
    document.querySelector(".main__task_slf").style.alignItems = "center";
    document.querySelector(".main__task_slf").style.flexDirection = "row";
    document.querySelector(".main__task_slf").style.flexWrap = "wrap";
    document.querySelector(".main__task_slf").style.height = "100%";
    
    document.querySelectorAll(".slf_radio_btn").forEach(elem => {
      elem.style.marginRight = "40px";
      elem.style.padding = "0";
    });
  
    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = "";
      for(let i = 1; i <= cur_options.length; i++){
        if(document.getElementById("radio-" + i).checked){
          cur_answer += cur_options[i-1].toLowerCase() + "; ";
        };
      }
      cur_answer = cur_answer.slice(0, cur_answer.length - 2);
      check_answer(cur_answer, 1, cur_data["exercise"]["id"], ex_id, 4, 31, reqHeader);
    });
  } 
  else if (ex_id == 35) { 
    let cur_task = cur_data["exercise"]["question"];
    let cur_pics = cur_data["exercise"]["options"].split("; ");

    let cur_inner = "";

    if (cur_pics.length == 4) {
      for (let pic of cur_pics) {
        let cur_pic = parseInt(pic);
        cur_inner += `
          <div class="slf_checkbox_btn flex">
            <input id="custom-checkbox` + (cur_pic % 4 + 1) + `" class="custom-checkbox" type="checkbox">
            <label for="custom-checkbox` + (cur_pic % 4 + 1) + `">` + (cur_pic % 4 + 1) + `</label>

            <img src="img/task_task/lsf/behavior/` + cur_pic + `.png" class="no_pointer_events">
          </div>
        `;
      };
    }
    else {
      cur_inner+= `<div class="input_container">`;

      for (let cur_num = 1; cur_num <= cur_pics[0].split(".")[1]; cur_num++) {
        cur_inner += `
          <div class="slf_checkbox_btn">
            <input id="custom-checkbox` + cur_num + `" class="custom-checkbox" type="checkbox">
            <label for="custom-checkbox` + cur_num + `">` + cur_num + `</label>
          </div>
        `;
      }

      cur_inner += `
      </div>
      <img src="img/task_task/lsf/behavior/` + cur_pics[0].split(".")[0] + `.png" class="no_pointer_events">
      `;
    };
    
    document.querySelector(".main__task_text").innerHTML = cur_task;
    document.querySelector(".main__task_task").innerHTML = cur_inner;

    if (cur_pics.length == 4) {
      document.querySelectorAll(".slf_checkbox_btn img").forEach(elem =>{
        elem.style.width = "200px";
        elem.style.marginRight = "20px";
        elem.style.boxShadow = "0 0 15px black";
      });

      document.querySelectorAll(".slf_checkbox_btn label").forEach(elem =>{
        elem.style.width = "80px";
        elem.style.lineHeight = "40px";
        elem.style.height = "80px";
        elem.style.marginRight = "20px";
      });

      document.querySelectorAll(".slf_checkbox_btn input").forEach(elem =>{
        elem.style.position = "relative";
        elem.style.display = "none";
      });

      document.querySelectorAll(".slf_checkbox_btn").forEach(elem =>{
        elem.style.padding = "50px 0 0";
        elem.style.margin = "0";
        elem.style.width = "auto";
        elem.style.height = "100%";
        elem.style.justifyContent = "center";
        elem.style.alignItems = "center";
      });

      document.querySelectorAll(".slf_checkbox_btn:nth-child(2n+1) label, .slf_checkbox_btn:nth-child(2n+1) img").forEach(elem =>{
        elem.style.alignSelf = "start";
      });
      document.querySelectorAll(".slf_checkbox_btn:nth-child(2n) label, .slf_checkbox_btn:nth-child(2n) img").forEach(elem =>{
        elem.style.alignSelf = "end";
      });

      document.querySelectorAll(".slf_checkbox_btn:nth-child(2n+1) label").forEach(elem =>{
        elem.style.marginTop = "26px";
      });
      document.querySelectorAll(".slf_checkbox_btn:nth-child(2n) label").forEach(elem =>{
        elem.style.marginBottom = "26px";
      });

      document.querySelector(".main__task_task").style.display = "flex";
      document.querySelector(".main__task_task").style.flexWrap = "wrap";
      document.querySelector(".main__task_task").style.justifyContent = "center";
      document.querySelector(".main__task_task").style.alignItems = "center";
      document.querySelector(".main__task_task").style.width = "100%";
      document.querySelector(".main__task_task").style.height = "100%";
      document.querySelector(".main__task_task").style.lineHeight = "0";
    }
    else {
      document.querySelector(".main__task_task").style.display = "flex";
      document.querySelector(".main__task_task").style.justifyContent = "center";
      document.querySelector(".main__task_task").style.alignItems = "center";
      document.querySelector(".main__task_task").style.height = "100%";
      document.querySelector(".main__task_task").style.marginTop = "40px";

      document.querySelector(".main__task_task img").style.height = "310px";
      document.querySelector(".main__task_task img").style.boxShadow = "0 0 15px black";

      document.querySelector(".input_container").style.display = "flex";
      document.querySelector(".input_container").style.justifyContent = "center";
      document.querySelector(".input_container").style.alignItems = "center";
      document.querySelector(".input_container").style.flexWrap = "wrap";
      document.querySelector(".input_container").style.width = "60%";
      document.querySelector(".input_container").style.paddingRight = "70px";

      document.querySelectorAll(".slf_checkbox_btn label").forEach(elem => {
        elem.style.width = "40px";
        elem.style.height = "40px";
        elem.style.display = "block";
        elem.style.lineHeight = "40px";
        elem.style.textAlign = "center";
        elem.style.margin = "30px";
      });

      document.querySelectorAll(".slf_checkbox_btn").forEach(elem => {
        elem.style.all = "unset";
      });
    };

    document.querySelector(".footer__ready_button").addEventListener("click", function() {
      let cur_answer = "";

      document.querySelectorAll(".slf_checkbox_btn input").forEach(elem => {
        if (elem.checked) {
          cur_answer += elem.nextElementSibling.textContent + "; ";
        }
      });

      cur_answer = cur_answer.slice(0, cur_answer.length - 2);
      check_answer(cur_answer, 1, cur_data["exercise"]["id"], ex_id, 4, 31, reqHeader);
    });
  };
};


// Авторизация

let task_data = JSON.stringify({
  "phone": localStorage["phone"],
  "password": localStorage["password"],
});

let req1 = new XMLHttpRequest();

req1.withCredentials = false;
req1.open("POST", "https://iknow2023.bsite.net/api/users/login");
req1.setRequestHeader("Content-Type", "application/json");

req1.send(task_data);

req1.onload = function () {
  if (req1.status != 200) {
    console.log("Error");
  }
  else {

    // Получение данных пользователя

    let response = JSON.parse(req1.response);
    token = response.accessToken;
    
    let req4 = new XMLHttpRequest();

    req4.withCredentials = false;
    req4.open("GET", "https://iknow2023.bsite.net/api/users");

    let reqHeader = "Bearer " + token;
    req4.setRequestHeader("Authorization", reqHeader);

    req4.send();

    req4.onload = function () {
      if (req4.status != 200) {
        console.log("Error");
      }
      else {

        // Cмена иконки профиля

        let cur_data = JSON.parse(req4.response);

        let photo_form = document.querySelector(".header__profile_icon");
        let edit_form = document.querySelector(".edit__photo");
        let edit_name = document.querySelector(".edit__name");

        photo_form.src = "img/profile/" + cur_data["pictureId"] + ".png";
        edit_form.src = "img/profile/" + cur_data["pictureId"] + ".png";
        edit_name.innerHTML = cur_data["nickname"];
      };
    };


    // Получение теории

    let ex_id = localStorage["subtheme_id"];

    let req3 = new XMLHttpRequest();

    req3.withCredentials = false;
    req3.open("GET", "https://iknow2023.bsite.net/api/topics/get-theory/" + ex_id);

    req3.setRequestHeader("Authorization", reqHeader);

    req3.send();

    req3.onload = function () {
      if (req3.status != 200) {
        console.log("Error");
      }
      else {
        let cur_theory = JSON.parse(req3.response)["theory"].split(" (&&) ");
        let cur_title = localStorage["subtheme"];

        document.querySelector(".theory__theme").innerHTML = cur_title;
        document.querySelector(".theory__theme").style.textDecoration = "underline 3px";
        document.querySelector(".theory__theme").style.fontSize = "40px";
        
        if (cur_theory[0] == "") {
          let theory_img = document.createElement("img");

          theory_img.style.height = "100%";
          theory_img.style.maxWidth = "1200px";
          theory_img.src = "img/theory/" + cur_theory[1] + ".png";
          
          document.querySelector(".theory__main").appendChild(theory_img);

          document.querySelector(".theory__main").style.padding = "30px 50px 200px";
        }
        else if(cur_theory[1] == "") {
          let theory_text = cur_theory[0];

          document.querySelector(".theory__main").innerHTML = theory_text;
          
          document.querySelector(".theory__main").style.fontSize = "40px";
          document.querySelector(".theory__main").style.lineHeight = "70px";
          document.querySelector(".theory__main").style.padding = "30px 50px 130px";
        }
        else {
          let theory_img = document.createElement("img");
          let theory_text = document.createElement("p");

          theory_img.style.height = "100%";
          theory_img.style.maxWidth = "50%";
          theory_img.style.marginRight = "50px";
          theory_img.src = "img/theory/" + cur_theory[1] + ".png";

          theory_text.innerHTML = cur_theory[0];

          document.querySelector(".theory__main").appendChild(theory_img);
          document.querySelector(".theory__main").appendChild(theory_text);

          document.querySelector(".theory__main").style.fontSize = "30px";
          document.querySelector(".theory__main").style.lineHeight = "50px";
          document.querySelector(".theory__main").style.padding = "30px 50px 200px";
        };

        document.querySelector(".theory__main").style.width = "100%";
        document.querySelector(".theory__main").style.height = "100%";
        document.querySelector(".theory__main").style.justifyContent = "space-evenly";
        document.querySelector(".theory__main").style.alignItems = "center";
        document.querySelector(".theory__main").style.textAlign = "center";
        document.querySelector(".theory__main").style.fontWeight = "400";
      };
    };


    // Получение задач

    let req2 = new XMLHttpRequest();

    req2.withCredentials = false;
    req2.open("GET", "https://iknow2023.bsite.net/api/exercises/get-exercise/" + ex_id);

    req2.setRequestHeader("Authorization", reqHeader);

    req2.send();

    req2.onload = function () {
      if (req2.status != 200) {
        console.log("Error");
      }
      else {
        let cur_data = JSON.parse(req2.response);

        if ((ex_id >= 1)&&(ex_id <= 6)) {
          russian_func(ex_id, cur_data, reqHeader);
        }
        else if ((ex_id >= 7)&&(ex_id <= 21)) {
          math_func(ex_id, cur_data, reqHeader);
        }
        else if ((ex_id >= 22)&&(ex_id <= 27)) {
          world_func(ex_id, cur_data, reqHeader);
        }
        else if ((ex_id >= 28)&&(ex_id <= 35)) {
          lsf_func(ex_id, cur_data, reqHeader);
        }
        else {
          alert("Произошла какая-то непредвиденная ошибка!\nПожалуйста, сообщите об этом разработчикам.");
        };
      };
    };
  };
};


// Поведение checkBox панелей по ОБЖ

document.querySelectorAll(".slf_checkbox_behavior").forEach(elem =>
  elem.addEventListener("click", function () {
    if (elem.style.scale == "0.8") {
      elem.style.scale = "1";
      elem.style.transition = "scale 0.3s";
    }
    else {
      elem.style.scale = "0.8";
      elem.style.transition = "scale 0.3s";
    }
  })
);

document.querySelectorAll(".slf_checkbox_behavior").forEach(elem =>
  elem.addEventListener("mouseover", function () {
    elem.style.boxShadow = "0 0 15px black";
    elem.style.transition = "box-shadow 0.3s";
  })
);

document.querySelectorAll(".slf_checkbox_behavior").forEach(elem =>
  elem.addEventListener("mouseout", function () {
    elem.style.boxShadow = "unset";
    elem.style.transition = "box-shadow 0.3s";
  })
);

// Появление и исчезание окна с теорией

document.querySelector(".footer__theory_button").addEventListener("click", function() {
  var task = document.querySelector(".task");
  var theory = document.querySelector(".theory");

  task.style.display = "none";
  theory.style.display = "unset";

  task.style.animation = "task_vanishing 1s forwards";
  theory.style.animation = "theory_appearance 1s forwards";
});

document.querySelector(".theory__button").addEventListener("click", function() {
  var task = document.querySelector(".task");
  var theory = document.querySelector(".theory");

  theory.style.display = "none";
  task.style.display = "unset";

  theory.style.animation = "theory_vanishing 1s forwards";
  task.style.animation = "task_appearance 1s forwards";
});

if (localStorage["subtheme_result"] != "0") {
  var task = document.querySelector(".task");
  var theory = document.querySelector(".theory");

  theory.style.display = "none";
  task.style.display = "unset";
  task.style.opacity = "100%";
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
    
  let req5 = new XMLHttpRequest();

  req5.withCredentials = false;
  req5.open("POST", "https://iknow2023.bsite.net/api/users/login");
  req5.setRequestHeader("Content-Type", "application/json");

  req5.send(exit_data);

  req5.onload = function () {
      if (req5.status != 200) {
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