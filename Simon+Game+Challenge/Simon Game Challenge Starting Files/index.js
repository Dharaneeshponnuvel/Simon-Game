var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    var selectedButton = $("#" + randomChosenColour);
    selectedButton.fadeOut(100).fadeIn(100);

    var redSound = new Audio('./sounds/red.mp3');
    var blueSound = new Audio('./sounds/blue.mp3');
    var greenSound = new Audio('./sounds/green.mp3');
    var yellowSound = new Audio('./sounds/yellow.mp3');

    function playSound(color) {
        switch (color) {
            case "red":
                redSound.play().catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
                break;
            case "blue":
                blueSound.play().catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
                break;
            case "green":
                greenSound.play().catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
                break;
            case "yellow":
                yellowSound.play().catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
                break;
            default:
                console.log("No sound found for this color");
                break;
        }
    }

    var userClickedPattern = [];

    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    $(".btn").on("click", function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }

    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("Success!");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        } else {
            console.log("Wrong!");
            var wrongSound = new Audio('./sounds/wrong.mp3');
            wrongSound.play().catch(function(error) {
                console.error('Failed to play audio:', error);
            });

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    $(document).keypress(function(event) {
        if (!started) {
            started = true;
            $("#level-title").text("Level " + level);
            nextSequence();
        }
    });

    $("#level-title").text("Press Any Key to Start");
}

nextSequence();
