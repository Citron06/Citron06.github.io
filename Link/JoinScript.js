function OpenPwd(e) {
    var eye = e.target;

    if (eye.classList[1] == 'fa-eye') {
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
        document.getElementById('password').type = "text";
        document.getElementById('joinPassword').type = "text";
    } else if (eye.classList[1] == 'fa-eye-slash') {
        eye.classList.add('fa-eye');
        eye.classList.remove('fa-eye-slash');
        document.getElementById('password').type = "password";
        document.getElementById('joinPassword').type = "password";
    }
}

function mov_div() {
    var section1 = document.getElementById("section1");
    var section2 = document.getElementById("section2");
    var header = document.getElementById("header-title");

    section1.style.display = 'none';
    header.classList.add('mov-header');
    setTimeout(function () {
        section2.classList.add('mov-section');
        section2.style.display = 'inline';
    }, 1000);
}

document.getElementById("welcome").onsubmit = function (e) {
    var email = document.getElementById("userEmail").value;
    var pwd = document.getElementById("password").value;
    var welEmail = document.getElementById("wel-email");
    var welPwd = document.getElementById("wel-pwd");

    var flag = 0;

    var users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length) {
        for(var i = 0; i < users.length; i++){
            if(inEmail(users[i].email, email, welEmail) != false){
                if( inPwd(users[i].pwd, pwd, welPwd) != false) {
                    flag++;
                    alert(users[i].name + ' 님 로그인 되셨습니다.');
                    document.getElementById("welcome").action = "http://127.0.0.1:5500/KimHansung/index.html";
                }
            }
        }
        flag(flag);
    }
    else {
        welEmail.innerText = "유효하지 않은 이메일입니다."
        welEmail.style.color = 'red';
        return false;
    }
};

function flag(f){
    if(f == 1){
        return true;
    }
    return false;
}

function inEmail(userEmail, email, welEmail){
    if((userEmail != email)){
        welEmail.innerText = "유효하지 않은 이메일입니다.";
        welEmail.style.color = 'red';
        return false;
    } else {
        welEmail.innerText = "";
    }
}

function inPwd(userPwd, pwd, welPwd){
    if((userPwd != pwd)){
        welPwd.innerText = "유효하지 않은 비밀번호입니다.";
        welPwd.style.color = 'red';
        return false;
    } else{
        welPwd.innerText = "";
    }
}

document.getElementById("join").onsubmit = function () {
    var email = document.getElementById("joinEmail").value;
    var pwd = document.getElementById("joinPassword").value;
    var joinEmail = document.getElementById("join-email");
    var joinPwd = document.getElementById("join-pwd");

    if(CheckEmail(email, joinEmail) || CheckPwd(pwd, joinPwd) == false){
        return false;
    } else {
        saveEntry(email, pwd);
        alert('가입되셨습니다.');
    }
};

function CheckEmail(email, joinEmail){
    var re = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (re.test(email) == false) {
        joinEmail.innerText = "유효하지 않은 이메일입니다.";
        joinEmail.style.color = 'red';
        return false;
    } else {
        joinEmail.innerText = "";
    }
}

function CheckPwd(pwd, joinPwd){
    if (/^.{8,12}$/.test(pwd) == false) {
        joinPwd.innerText = "비밀번호는 8~12자리여야 합니다.";
        joinPwd.style.color = 'red';
        return false;
    } else {
        joinPwd.innerText = "";
    }

    if (((/[a-zA-Z]/.test(pwd)) && (/[0-9]/.test(pwd)) && (/[*!^/@$]/.test(pwd))) == false) {
        joinPwd.innerText = "비밀번호는 영문자 / 숫자 / 특수문자 *!^/@$ 하나이상 포함해야 합니다.";
        joinPwd.style.color = 'red';
        return false;
    } else {
        joinPwd.innerText = "";
    }

    if (/^[a-zA-Z]/.test(pwd) == false) {
        joinPwd.innerText = "비밀번호는 영문자로 시작해야 합니다.";
        joinPwd.style.color = 'red';
        return false;
    } else {
        joinPwd.innerText = "";
    }
}

function saveEntry(userEmail, userPwd) {
    var userName = document.getElementById("userName").value;

    var user = {
        name: userName,
        email: userEmail,
        pwd: userPwd
    };

    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);

    var jsonEntries = JSON.stringify(users);

    localStorage.setItem("users", jsonEntries);
}