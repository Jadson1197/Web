let userScore = 0;
let computerScore = 0;

let userScore_span = document.getElementById('user-score');
let computerScore_span = document.getElementById('computer-score');

let result = document.querySelector('.result');

let choices = document.querySelectorAll('.choice');

let user_option = undefined;
let selectedColor = "rgb(51, 204, 51)";

let bt_play = document.getElementById('bt-play');
let bt_reset = document.getElementById('bt-reset');

let winner = undefined;


function changeColor(element,color){
	if(element.style.backgroundColor == color){
		element.style.backgroundColor = "#D8DBDA";
	}else{
		element.style.backgroundColor = color;
	}
}

for(let i = 0; i < choices.length; i++){
	choices[i].addEventListener('click',function(){
		if(user_option == undefined){//Vai preencher a cor quando o usuario clicar
			user_option = this;
			changeColor(user_option,selectedColor);
		}else
			if(user_option == this){//Caso e opção já esteja selecionada e ele clicar, a seleção será desfeita
				changeColor(user_option,"#FFD300");
				user_option = undefined;	
			}
			else{
				changeColor(user_option,"#D8DBDA");//Caso ele clique em uma opção e resolva mudar de escolha
				user_option = choices[i];
				changeColor(user_option,selectedColor);
			}
	})

	choices[i].addEventListener('mouseover', function(){
		if(this.style.backgroundColor != selectedColor){
			this.style.cursor = "pointer";
			changeColor(this,"#FFD300");
		}
	})

	choices[i].addEventListener('mouseout',function(){
		if(this.style.backgroundColor != selectedColor){
			changeColor(this,"#D8DBDA");
		}
	})
}

function play(){
	let computerOption = Math.floor(Math.random()*choices.length);
	if(user_option === undefined){
		alert("You must select one option");
	}else{
		
	}
}

function winner(player,computer){
	if(player == undefined){
		winner = undefined;
		return undefined;
	}else 
	if(player == computer){
		winner = undefined;
		return "It's a Draw";
	}else{
		switch(player){
			case choices[0]://Rock
				switch(computer){
					case choices[2]://Rock vs Scissors
					case choices[3]://Rock vs Lizard
						userScore++;
						winner = player;
						return "You win";
					break;
					case choices[1]://Rock vs Paper
					case choices[4]://Rock vs Spock
						computerScore++;
						winner = computer
						return "You lose";
					break;
				}
			break;

			case choices[1]://Paper
				switch(computer){
					case choices[0]://Paper vs Rock
					case choices[4]://Paper vs Spock
						console.log("You win");
						userScore++;
						winner = player;
						return "You win";
						break;
					case choices[2]://Paper vs Scissors
					case choices[3]://Paper vs Lizard
						computerScore++;
						winner = computer;
						return "You lose";
					break;
				}
			break;

			case choices[2]://Scissors
				switch(computer){
					case choices[1]://Scissors vs Paper
					case choices[3]://Scissors vs Lizard
						userScore++;
						winner = player;
						return "You win";
						break;
					case choices[0]://Scissors vs Rock
					case choices[4]://Scissors vs Spock
						computerScore++;
						winner = computer;
						return "You lose";
					break;
				}
			break;

			case choices[3]://Lizard
				switch(computer){
					case choices[1]://Lizard vs Paper
					case choices[4]://Lizard vs Spock
						userScore++;
						winner = player;
						return "You win";
						break;
					case choices[2]://Lizard vs Scissors
					case choices[0]://Lizard vs Rock
						computerScore++;
						winner = computer;
						return "You lose";
					break;
				}
			break;

			case choices[4]://Spock
				switch(computer){
					case choices[2]://Spock vs Scissors
					case choices[0]://Spock vs Rock
						userScore++;
						winner = player;
						return "You win";
						break;
					case choices[1]://Spock vs Paper
					case choices[3]://Spock vs Lizard
						computerScore++;
						winner = computer;
						return "You lose";
					break;
				}
			break;
		}
	}
}

bt_play.addEventListener('click',function(){
	userScore_span.innerHTML = "10";
})