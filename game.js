// alert("hi");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []; //clicked user pattern
var level = 0; //gamelevel

gameStart()
//start game only called once
function gameStart() {
  $(document).one("keydown", function(event) {
  // console.log(event.key);
  $("#level-title").text("Level " + level + 1);
  nextSequence();
})
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor)
  animatePress(userChosenColor)
  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

//checking user input
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4); //randon number 0-3
  var randomChosenColor = buttonColors[randomNumber]; //select a colour
  gamePattern.push(randomChosenColor); //adds new random colour to sequence
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //falsh button
  // i.e ("#"+red)
  playSound(randomChosenColor)
  $("#level-title").text("level " + (level++))
}

//sound function for both click and generated sequence
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//click btn animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // console.log(currentColour);

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

//start over
function startOver() {
  level = 0
  gamePattern =[]
  gameStart()
}
