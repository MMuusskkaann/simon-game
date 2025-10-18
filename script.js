let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        level = 0;
        gameseq = [];
        userseq = [];
        nextLevel();
    }
});

// Flash button animation
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// Generate next level
function nextLevel() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    gameseq.push(randomColor);

    // Flash the new button
    let randBtn = document.querySelector(`#${randomColor}`);
    btnFlash(randBtn);

    console.log("Game Sequence:", gameseq);
}

// Handle button press
function btnPress() {
    let userColor = this.getAttribute("id");
    userseq.push(userColor);
    btnFlash(this);

    checkAnswer(userseq.length - 1);
}

function checkAnswer(currentIndex) {
    if (userseq[currentIndex] === gameseq[currentIndex]) {
        if (userseq.length === gameseq.length) {
            setTimeout(nextLevel, 800);
        }
    } else {
        // Game over
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
           document.querySelector("body").style.backgroundColor = "white";
        },150);
        started = false;
        gameseq = [];
        userseq = [];
        level = 0;
    }
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
