var yourLevel = 0;
var yourscore = 0;
var gamePattern = "";

$("body").keypress(function(event){
  if (yourLevel === 0){
    yourLevel = 1;
    $("#level-title").text("Level " + yourLevel);
    nextSequence();
  }
});

function playSound(colour){
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function nextSequence () {
   var buttonColours = ["red", "green", "yellow", "blue"];
   var randomSelector = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomSelector];
   gamePattern = randomChosenColour;
   var idTag = "#" + randomChosenColour;
   $(idTag).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

$(".btn").click(function(event){
    var pressedButtonColour = event.target.id;
    var pressedButtonId = "#" + pressedButtonColour;
    playSound(pressedButtonColour);
    $(pressedButtonId).addClass("pressed");
    setTimeout(function(){$(pressedButtonId).removeClass("pressed")}, 50);
    console.log(pressedButtonId);
    if (gamePattern === pressedButtonColour){
      yourscore += 1;
      $("#level-title").text("Level " + yourLevel + " (" + yourscore + " win)");
    }
  });
