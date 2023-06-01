const koef = 1519/3072;

window.onunload  = function() {
    window.scrollTo(0, 0);
};

document.querySelectorAll(".circle").forEach(elem =>
    elem.addEventListener("click", () => window.scrollTo({
        top: 1700,
        behavior: "smooth",
    }))
);


// Вывод списка тем и подтем

function showThemes(subject_name){

    document.querySelector(".main__themes").style.display = "flex";
    
    let subjects_name = ["russian", "math", "world", "lsf"];

    for (let cur_name of subjects_name) {
        if (cur_name == subject_name) {
            document.querySelector(".main__themes_" + subject_name).style.display = "flex";
        }
        else {
            document.querySelector(".main__themes_" + cur_name).style.display = "none";
        }
    };

    document.querySelector(".footer").style.marginTop = (150 * koef) + "px";
    document.querySelector(".spot__container").style.overflow = "visible";

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
    
        // Получение данных
    
        const response = JSON.parse(req1.response);
        token = response.accessToken;
        
        const req2 = new XMLHttpRequest();
            
        var themes_id = {
            "russian": 1,
            "math": 2,
            "world": 3,
            "lsf": 4,
        };

        req2.withCredentials = false;
        req2.open("GET", "https://iknow2023.bsite.net/api/topics/get-topics/" + themes_id[subject_name]);
    
        var reqHeader = "Bearer " + token;
        req2.setRequestHeader("Authorization", reqHeader);
    
        req2.send();
    
        req2.onload = function () {
            if (req2.status != 200) {
                console.log("Error");
            }
            else {
                let cur_data = JSON.parse(req2.response);
                console.log(cur_data);

                document.querySelector(".themes__ul").style.display = "unset";
                document.querySelector(".lines_2").style.display = "unset";

                document.querySelectorAll(".notDeleted").forEach(
                    elem => elem.remove()
                );
                
                let general_height = (1173 + 59 + 17) * koef;

                for (let theme_index = 0; theme_index < cur_data.length; theme_index++) {
                    var black_li = document.createElement("li");
                    var black_text = document.createElement("div");
                    var black_progress = document.createElement("div");
                    
                    black_li.id = subject_name + "li" + theme_index;
                    black_li.classList.add("notDeleted");
                    black_li.style.width = (2228 * koef) + "px";
                    black_li.style.height = (230 * koef) + "px";
                    black_li.style.backgroundColor = "#000";
                    black_li.style.listStyleType = "none";
                    black_li.style.marginBottom = (59 * koef) + "px";
                    black_li.style.marginTop = (87 * koef) + "px";
                    black_li.style.borderRadius = (20 * koef) + "px";
                    black_li.style.display = "flex";
                    black_li.style.flexDirection = "row";
                    black_li.style.justifyContent = "space-between";
                    black_li.style.alignItems = "center";

                    black_text.style.color = "#FDF9EE";
                    black_text.style.fontSize = (80 * koef) + "px";
                    black_text.style.paddingLeft = (75 * koef) + "px";
                    black_text.innerHTML = cur_data[theme_index]["title"];

                    black_progress.style.color = "#FDF9EE";
                    black_progress.style.fontSize = (80 * koef) + "px";
                    black_progress.style.paddingRight = (75 * koef) + "px";
                    black_progress.innerHTML = cur_data[theme_index]["progress"] + "%";

                    document.getElementById("themes_ul").appendChild(black_li);
                    document.getElementById(black_li.id).appendChild(black_text);
                    document.getElementById(black_li.id).appendChild(black_progress);

                    general_height += (230 + 87) * koef;

                    for (let subtheme_index = 0; subtheme_index < cur_data[theme_index]["subtopics"].length; subtheme_index++) {
                        var green_li = document.createElement("a");
                        var green_text = document.createElement("div");
                        var green_progress = document.createElement("div");

                        green_li.id = "id_" + cur_data[theme_index]["subtopics"][subtheme_index]["id"];
                        green_li.classList.add("subtopic_btn");
                        green_li.classList.add("notDeleted");
                        green_li.style.width = (1886 * koef) + "px";
                        green_li.style.height = (230 * koef) + "px";
                        green_li.style.backgroundColor = "#B8EA7B";
                        green_li.style.marginBottom = (59 * koef) + "px";
                        green_li.style.marginLeft = (342 * koef) + "px";
                        green_li.style.borderRadius = (20 * koef) + "px";
                        green_li.style.border = "none";
                        green_li.style.display = "flex";
                        green_li.style.flexDirection = "row";
                        green_li.style.justifyContent = "space-between";
                        green_li.style.alignItems = "center";

                        green_text.style.color = "#000";
                        green_text.style.fontSize = (80 * koef) + "px";
                        green_text.style.paddingLeft = (75 * koef) + "px";
                        green_text.innerHTML = cur_data[theme_index]["subtopics"][subtheme_index]["title"];

                        if (cur_data[theme_index]["subtopics"][subtheme_index]["state"] == "IsOpen") {
                            green_li.href = "index-task.html";
                            green_li.classList.add("li_hover");
                            green_li.style.cursor = "pointer";

                            green_progress = document.createElement("div");

                            green_progress.style.color = "#000";
                            green_progress.style.fontSize = (80 * koef) + "px";
                            green_progress.style.paddingRight = (75 * koef) + "px";
                            green_progress.innerHTML = cur_data[theme_index]["subtopics"][subtheme_index]["progress"] + "%";
                        }
                        else {
                            green_li.style.cursor = "default";

                            green_progress = document.createElement("img");

                            green_progress.src = "img/subjects/locker.png"
                            green_progress.style.width = (100 * koef) + "px";
                            green_progress.style.height = (105.5 * koef) + "px";
                            green_progress.style.paddingRight = (75 * koef) + "px";
                        };
                        
                        document.getElementById("themes_ul").appendChild(green_li);
                        document.getElementById(green_li.id).appendChild(green_text);
                        document.getElementById(green_li.id).appendChild(green_progress);

                        general_height += (230 + 59) * koef;
                    };
                };
                
                document.querySelectorAll(".subtopic_btn").forEach(elem =>
                    elem.addEventListener("click", function() {
                        let subtheme_id = elem.id.slice(3, elem.id.length);
                        localStorage["subtheme_id"] = subtheme_id;

                        if (elem.lastChild.innerHTML == "100%") {
                            elem.removeAttribute("href");
                            alert("Вы уже прошли эту тему!\nПожалуйста, выберите другую.")
                        };
                    })
                );
                
                document.querySelector(".spot__container").style.overflow = "hidden";
                document.querySelector(".spot_3").style.display = "unset";
                document.querySelector(".spot__container").style.height = (3561 * koef + general_height) + "px";
            };
        };
        }
    };
}; 


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