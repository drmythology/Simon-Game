// Start of code

// STEP 1

// Set-up variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;
var randomChosenColour = 0;

// Main Game Loop
function nextSequence() {
    // Increase level by 1
    level = level + 1;
    // Logic Set-up
    var randomNumber = Math.round(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Animation Set-up
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // Game Start function
    $("#level-title").text("Level " + level);
} 

// Handler function
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    gameCheck(userClickedPattern.length-1);
});

// Start over function
function startOver() {
    gameStart = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

// Game Checker function
function gameCheck(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; 
            }, 1000);
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over");

        setTimeout(function() {
        $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press any key to start a new game");

        startOver();
    }
}

// Sound Effect function
function playSound(name) {
    // Audio Set-up
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animation Effect function
function animatePress(currentColour) {
    setTimeout(function() {
    $("#" + currentColour).addClass("pressed")
    }, 1);
    setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
    }, 100);
}

// Keypress event function
$(document).keydown(function(){
    // One-way check valve
    if (gameStart == false) {
        gameStart = true;
        nextSequence();
    }
})

