var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

    $("#level-title").text("Level " + level);
}


$('.btn').on("click", function (event) {
    const userChoosenColor = event.target.id;
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}


function animatePress(currentColor) {
    // triggered which button is pressed and then added the class pressed
    $("." + currentColor).addClass("pressed");

    // removed the pressed class using setTimeout function
    setTimeout(function () {
        $("." + currentColor).removeClass('pressed');
    }, 100)

}

$(document).on("keypress", function (event) {
    if (!started) {
        nextSequence();
        started = true;
    }

})

$("#startBtn").on("click", function (event) {
    if (!started) {
        nextSequence();
        started = true;
    }
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");
        // triggered which button is pressed and then added the class pressed
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");;
        }, 200);
        $("#level-title").text("Game Over, Press Any Key or Start to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}