
// try to elminate these global variables in your project, these are here just to start.
// How Can I remove these? I had trouble Trying to get all my functions to run while trying to remove the Global Functions:

var winningNumber = generateWinningNumber();
var playersGuesses = [];
var numberOfGuesses = 0;
var newGame = "<div class='activeGame'>Guess: <input type='text' name='fname' id='guess'><br></input><button type='button' onclick='playersGuessSubmission()' id='guess' class='submitButton'> Submit your guess! </button><script>var button = document.querySelector('#guess');button.addEventListener('keydown', function(event){if (event.keyCode == 13)playersGuessSubmission();});</script></div>";
var guessesRemaining = 5 - numberOfGuesses;
//I had trouble Trying to get all my functions to run while trying to remove the Global Functions:


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	var num = Math.floor(Math.random() * 101);
	return num;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = parseInt(document.getElementById("guess").value);
	document.getElementById("guess").value = "";
	guessesRemaining = 5 - numberOfGuesses;
	
	if(guessesRemaining > 0){
		checkGuess();
	} else {
		$('.activeGame').remove();
		$('.game').append("<p class='gameOver'> Game Over. The winning number was " +winningNumber+". </p>");
	}
}



// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var higherOrLower = '';
	var withinX = 0;
	
	if(playersGuess > winningNumber){
		higherOrLower = "higher";
		if(playersGuess - winningNumber <= 5){
			withinX = 5;
		} else if ((playersGuess - winningNumber > 5) && (playersGuess - winningNumber <= 10)){
			withinX = 10;
		} else if ((playersGuess - winningNumber > 10) && (playersGuess - winningNumber <= 20)){
			withinX = 20;
		} else {
			withinX= 100;
		}
		guessMessage();


	} else {
		higherOrLower = "lower";
		if(winningNumber - playersGuess <= 5){
			withinX = 5;
		} else if ((winningNumber - playersGuess > 5) && (winningNumber - playersGuess <= 10)){
			withinX = 10;
		} else if ((winningNumber - playersGuess > 10) && (winningNumber - playersGuess <= 20)){
			withinX = 20;
		} else {
			withinX= 100;
		}
		guessMessage();
	}

	function guessMessage(){
		$(document).ready(function(){
			var feedbackString = ('<p class="feedbackString"> Your guess is '+higherOrLower+' and within '+withinX+' digits of the winning number</p>')
			$(".activeGame").append(feedbackString);
		})
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	var winningString = "<p class='feedbackStringWinner'>You are a Winner! It took you " + numberOfGuesses + " guesses.</p>";
	var losingString = "<p class='feedbackString'>Try again. (" +guessesRemaining+ ")</p>";
	var repeatString = "<p class='feedbackString'>This Guess is a repeat.</p>";
	

	$(".string").remove();
	$('.feedbackString').remove();
	$('.feedbackStringWinner').remove();


	if(playersGuess === winningNumber){
		$(document).ready(function(){
			$('.activeGame').remove();
			$(".game").append(winningString);
		});
	} else {
		 if(playersGuesses.indexOf(playersGuess) != -1){
		 	$(document).ready(function(){
				$(".activeGame").append(repeatString);
			})
		 }else{
		 	$(document).ready(function(){
				$(".activeGame").append(losingString);
			})
			numberOfGuesses +=1;
			playersGuesses.push(playersGuess);
			lowerOrHigher();
		 }
	}
}


// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var hintNumbers = [winningNumber];

	for(var i = guessesRemaining-2; i>0; i--){
		var randNum = Math.floor(Math.random() * 101);
			if(randNum === winningNumber){
				randNum += 1;
			}
		hintNumbers.push(randNum);
	}

	if (guessesRemaining > 2){
		var hintString = ('<p class=provideHint> The winning number is one of the following numbers: '+hintNumbers.toString()+'.</p>')
	} else {
		var hintString = ('<p class=provideHint> You are out of hints.</p>')
	}
	$(".hint").append(hintString);

}

function shuffle(){

}

// Allow the "Player" to Play Again

function playAgain(){
	var newGame = "<div class='activeGame'>Guess: <input type='text' name='fname' id='guess'><br></input><button type='button' onclick='playersGuessSubmission()' id='guess' class='submitButton'> Submit your guess! </button><script>var button = document.querySelector('#guess');button.addEventListener('keydown', function(event){if (event.keyCode == 13)playersGuessSubmission();});</script></div>";

	winningNumber = generateWinningNumber();
	playersGuesses = [];
	numberOfGuesses = 0;


	$(".activeGame").remove();
	$(".gameOver").remove();
	$(".feedbackString").remove();
	$('.feedbackStringWinner').remove();
	$('.game').append(newGame);
};



