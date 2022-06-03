console.log("This is Piano Tlies Game.");

// These are ids given to each box.
var buttonId = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

var gamePattern = []; //here we store button chosen by computer.
var userClickedPattern = []; //here we store button chosen by user.

var started = false; 
var level = 0;
var myTimer ;
var timer = 0;
// here game starts.
function keyPressFunction() {
    if (!started){
    document.getElementById("level-title").textContent = "level " + level ;
    nextSequence();
    myTimer = setInterval(() => {
        document.querySelector(".timer").textContent = timer + " seconds";
        timer += 1;
    }, 1000);
    started = true ;
    } 
}

// storing id clicked by user.
function clickFunction(t) {
    var userChosenId = t.id ;
    userClickedPattern.push(userChosenId);

    playSound("correct");
    animatePress(userChosenId);

    checkAnswer(userClickedPattern.length-1);
};

// checking the elements of gamePattern and userClickedButton
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.getElementById("body").classList.add("game-over");
        document.getElementById("level-title").textContent = "Game Over, your score is " + level + " Press Any Key to Restart" ;
        
        setTimeout(() => {
            document.getElementById("body").classList.remove("game-over");
        }, 1000);
        startOver();
    }
}

// it's computer brain selecting random button in each level.
function nextSequence() {
    userClickedPattern = [];
    level++ ;
    document.getElementById("level-title").textContent = "level " + level ;
    var randomNumber = Math.floor(Math.random() * 16); 
    var randomChosenId = buttonId[randomNumber];
    gamePattern.push(randomChosenId);

    document.getElementById(randomChosenId).classList.add("fade-in");
    document.getElementById(randomChosenId).classList.add("fade-out");
    document.getElementById(randomChosenId).classList.add("fade-in");
    
    setTimeout(() => {
        document.getElementById(randomChosenId).classList.remove("fade-in");
        document.getElementById(randomChosenId).classList.remove("fade-out");
    }, 100);

    playSound("alert");
}

function animatePress(currentId) {
    document.getElementById(currentId).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentId).classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    clearInterval(myTimer);
    timer = 0;
    gamePattern = [];
    started = false;
}