function start() {
    var start_card = document.querySelectorAll("div.start");
    var circle = document.querySelectorAll("div#circle");
    var header = document.querySelectorAll("div.header");
    start_card[0].classList.add('end');
    start_card[0].classList.remove('start');
    circle[0].classList.add('circleEnd');

    setTimeout(function () {
        document.getElementById("start").style.display = "none";
        document.getElementById("circle").style.display = "none";
        header[0].style.display = "none";
    }, 3000);

    setTimeout(function () {
        var boardBG = document.querySelector("div#board");
        boardBG.classList.add('board_bg');
        Door_Card();
    }, 3000);
}

function Door_Card() {
    var cards = document.querySelectorAll("div.dack");

    var str = "";
    for (var i = 0; i < 22; i++) {
        str += '<div class="card taro' + (i + 1) + '" onclick="TaroSelect(event);"><img class="taro-img" src="images/taroCard.png" alt=""></div>';
    }
    cards[0].innerHTML = str;
}

var count = 0;

function TaroSelect(e) {
    CheckOut(count);
    e.currentTarget.classList.add('selectedTaro');
    setTimeout(function () {
        e.currentTarget.style.display = "none";
    }, 2500);

    var selected = document.querySelectorAll("div.point> div.card");

    setTimeout(function () {
        selected[count].classList.remove('down');
        count++;
        if (count == 3) {
            NextPage();
        }
    }, 2000);
}

function CheckOut(c){
    if(c == 3){
        console.log('wewr');
        var selected = document.querySelectorAll("div.point> div.card");
        selected.removeEventListener('click', TaroSelect);
    }
}

function NextPage() {
    var selectedCard = document.querySelectorAll("div.point> div.card");
    var taroCard = document.querySelectorAll("div.dack> div.card");
    var header = document.querySelectorAll("div.header");

    setTimeout(function () {
        for (var i = 0; i < taroCard.length; i++) {
            (function (s) {
                setTimeout(function () {
                    taroCard[s].classList.add('disappear');
                }, 100 * s);
            })(i);
        }

        setTimeout(function () {
            for (var i = 0; i < selectedCard.length; i++) {
                (function (s) {
                    setTimeout(function () {
                        selectedCard[s].classList.add('comeDown');
                    }, 100 * s);
                })(i);
            }

            setTimeout(function () {
                header[0].style.display = "inline";

                var innerC_str = '<div class="innerCircle" id="innerCircle"><a href="http://127.0.0.1:5500/KimHansung/TaroInfo.html">결과를 확인하기</a></div>';
                header[0].innerHTML += innerC_str;
            }, 2300);
        }, 4000);
    }, 3000);
}