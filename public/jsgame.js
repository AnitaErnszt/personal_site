var yourLevel = -1;
var gamePattern = "";
$('#getPlayerName').modal({ show: false});
$('#gameRules').modal({ show: false});

window.onload = function(event){
  var windowWidth = event.currentTarget.innerWidth;
  if (windowWidth < 1121){
    alert("This website is not responsive yet. Open on desktop to play with the game.");;
  } else {
    $('#gameRules').modal('show');
  };
};

$("#startGame").click(function(event){
  if (yourLevel === -1){
    yourLevel = 0;
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
   if (yourLevel < 10){
     $(idTag).fadeIn(100).fadeOut(100).fadeIn(100);
   } else if (yourLevel < 15){
     $(idTag).fadeIn(50).fadeOut(50).fadeIn(50);
   } else {
     $(idTag).fadeIn(25).fadeOut(25).fadeIn(25);
   };
   playSound(randomChosenColour);
}

$(".game-btn").click(function(event){
    var pressedButtonColour = event.target.id;
    var pressedButtonId = "#" + pressedButtonColour;
    playSound(pressedButtonColour);
    $(pressedButtonId).addClass("pressed");
    setTimeout(function(){$(pressedButtonId).removeClass("pressed")}, 50);
    console.log(pressedButtonId);
    if (gamePattern === pressedButtonColour){
      yourLevel += 1;
      $("#level-title").text("Level " + yourLevel);
      nextSequence();
    } else {
      $("#level-title").text("GAME OVER");
      $("#getPlayerName").modal("show");
      var player = $("#playerNameId");
      console.log(player);
      $("#submitGameData").click(function(event){
      const Url="https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/game/addgame";
      const data=JSON.stringify({player_name: "Anonymous"});
      $.post(Url,data,function(data, status){
        console.log("Test POST")
      });
    });
    }
  });
