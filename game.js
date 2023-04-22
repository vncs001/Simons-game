
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;
//verifica numero do clique atual
var cliquer = 0;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("level" + level);
    nextSequence();
    started = true
  }
});


//Detecta botão clicado pelo usuario
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //toca som
  playSound(userChosenColour);

  //ANIMANDO
  animatePress(userChosenColour);

  //ultima do userClickedPattern
  var last = userClickedPattern[userClickedPattern.length - 1];
  //check de resposta
  checkAnswer(last);
});


//define proximo botão da sequencia aleatoria
function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //animando
    animatePress(randomChosenColour);
    // $("#" + gamePattern).fadeIn(100).fadeOut(100).fadeIn(100);

    //toca som
    playSound(randomChosenColour);
}

//toca som
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

//anima o click
function animatePress(currentColour) {
  // $(currentColour).addClass("pressed");
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


//checar as respostas

function checkAnswer(currentLevel){

  //verificando acertos enquanto user é menor que simon
  if (userClickedPattern.length < gamePattern.length){

    //acerto
    if(userClickedPattern[cliquer] == gamePattern[cliquer]){
      
      //atualizando cliquer
      cliquer++;
    }
    //erro
     else if (userClickedPattern[cliquer] != gamePattern[cliquer]){
      // playSound("wrong");
      //  $("#score").text("ERROU! Reinicie a pagina");
      errou();
     }
  }

  //proximo level quando user for igual a simon
  else if (userClickedPattern.length == gamePattern.length && userClickedPattern[cliquer] == gamePattern[cliquer]){ //Ele esta add o proximo se o tamanho do array for EXCLUSIVAMENTE IGUAL!
    $("#score").text("Acerto miseravi")
    //zerando array de usuario
    userClickedPattern = [];
    cliquer = 0;
    
    //mandando o proximo
    setTimeout(function(){
      nextSequence();
    }, 1000);

  }
  else{
    // playSound("wrong");
    // $("#score").text("EROUU! reinicie a pagina");
    errou();
  }

  //Escreve arrays para conferir
  console.log(userClickedPattern);
  console.log(gamePattern );

}

function errou(){
  playSound("wrong");
  $("#score").text("ERROU! reinicie a pagina");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  cliquer = 0;
  userClickedPattern = [];
  $("#score").text("pronto");
  
}
