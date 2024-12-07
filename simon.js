let gameSeq = [];
let userSeq = [];
let highscore=[];

let btns = ["purple", "yellow", "red", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h3");
let h3=document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 3);
    let ranCol = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    console.log(gameSeq);
    btnFlash(ranBtn);

}
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash")
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);

}
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        highscore.push(level);
        let max=Math.max(...highscore);
        h3.innerHTML=`Highest Score<b>${max}</b>`;
        console.log(max);
        h2.innerHTML = `Game Over! Your Score<b> ${level}</b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}