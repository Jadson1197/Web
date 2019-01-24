let userScore = 0;
let computerScore = 0;

let userScore_span = document.getElementById('user-score'); //Pontuação do Usuario na Tela
let computerScore_span = document.getElementById('computer-score');//Pontuação do Computador na tela

let result = document.querySelector('.result > p'); //Diz o Resultado

let choices = document.querySelectorAll('.choice');//Alternativas

let user_option = undefined;
let selectedColor = "rgb(51, 204, 51)";
let normalColor = "#D8DBDA";
let mouseOverColor = "#FFD300";

let bt_play = document.getElementById('bt-play');
let bt_reset = document.getElementById('bt-reset');

let winner = undefined;

let running = false;

function changeColor(element,color,running){
	if(!running){//Se o jogo estiver em curso ele não permite a troca
		if(element.style.backgroundColor == color){//Caso o clique seja para desfazer a seleção
			element.style.backgroundColor = normalColor;
		}else{
			element.style.backgroundColor = color;
		}
	}
}

for(let i = 0; i < choices.length; i++){
	choices[i].addEventListener('click',function(){
			if(user_option == undefined){//Vai preencher a cor quando o usuario clicar
				user_option = this;
				changeColor(user_option,selectedColor,running);
			}else
				if(user_option == this){//Caso e opção já esteja selecionada e ele clicar, a seleção será desfeita
					changeColor(user_option,mouseOverColor,running);
					if(!running){user_option = undefined;}	////Se o jogo estiver em curso ele não permite a troca
				}
				else{
					changeColor(user_option,normalColor,running);//Caso ele clique em uma opção e resolva mudar de escolha
					if(!running){user_option = choices[i];} //Se o jogo estiver em curso ele não permite a troca
					changeColor(user_option,selectedColor,running);
				}
	})

	choices[i].addEventListener('mouseover', function(){//Muda de cor quando o mouse se aproxima
		if(this.style.backgroundColor != selectedColor){
			this.style.cursor = "pointer";
			changeColor(this,"#FFD300",running);
		}
	})

	choices[i].addEventListener('mouseout',function(){//Volta para a cor normal quando o mouse se afasta
		if(this.style.backgroundColor != selectedColor){
			changeColor(this,normalColor,running);
		}
	})
}

function counter(i){
	setInterval(function(){//Timer de 3 a 0 quando clica em Play
		if(i < 1){
			return;
		}
		else{
			result.innerHTML = i;
			--i;
		}
	},1000)
}

function play(){
	let computerOption = Math.floor(Math.random()*choices.length);
	if(user_option === undefined && seeWinner(user_option,choices[computerOption]) === undefined){//Caso o usuario não escolha nenhum
		alert("You must select one option");
	}else{
		running = true;
		counter(3);

		setTimeout(function(){changeColor(choices[computerOption],"blue",false);},3000)//Mostra qual a escolha do Computador
		
		setTimeout(function(){//Verifica quem ganhou e coloca na tela
			let answer = seeWinner(user_option,choices[computerOption]);
			userScore_span.innerHTML = userScore;
			computerScore_span.innerHTML = computerScore;
			result.innerHTML = answer;
		},4000);	
		setTimeout(function(){//Depois de mostrar o resultado, libera as opções para clique
			running = false;
			changeColor(choices[computerOption],normalColor,running);
			changeColor(user_option,normalColor,running);
		},5000);
	}
}

function seeWinner(player,computer){
	if(player == undefined){//Caso a pessoa não tenha selectionado nada
		winner = undefined;
		return undefined;
	}else 
	if(player == computer){
		winner = undefined;
		return "It's a Draw 😐";
	}else{
		let comp = computer.getAttribute("id");
		let user = player.getAttribute("id");;
		switch(player){
			case choices[0]://Rock
				switch(computer){
					case choices[2]://Rock vs Scissors
					case choices[3]://Rock vs Lizard
						userScore++;
						winner = player;
						return ` ${user} beats ${comp}.You win 🔥`;
					break;
					case choices[1]://Rock vs Paper
					case choices[4]://Rock vs Spock
						computerScore++;
						winner = computer
						return ` ${comp} beats ${user}.You lose 😞`;
					break;
				}
			break;

			case choices[1]://Paper
				switch(computer){
					case choices[0]://Paper vs Rock
					case choices[4]://Paper vs Spock
						userScore++;
						winner = player;
						return ` ${user} beats ${comp}.You win 🔥`;
						break;
					case choices[2]://Paper vs Scissors
					case choices[3]://Paper vs Lizard
						computerScore++;
						winner = computer;
						return ` ${comp} beats ${user}.You lose 😞`;
					break;
				}
			break;

			case choices[2]://Scissors
				switch(computer){
					case choices[1]://Scissors vs Paper
					case choices[3]://Scissors vs Lizard
						userScore++;
						winner = player;
						return ` ${user} beats ${comp}.You win 🔥`;
						break;
					case choices[0]://Scissors vs Rock
					case choices[4]://Scissors vs Spock
						computerScore++;
						winner = computer;
						return ` ${comp} beats ${user}.You lose 😞`;
					break;
				}
			break;

			case choices[3]://Lizard
				switch(computer){
					case choices[1]://Lizard vs Paper
					case choices[4]://Lizard vs Spock
						userScore++;
						winner = player;
						return ` ${user} beats ${comp}.You win 🔥`;
						break;
					case choices[2]://Lizard vs Scissors
					case choices[0]://Lizard vs Rock
						computerScore++;
						winner = computer;
						return ` ${comp} beats ${user}.You lose 😞`;
					break;
				}
			break;

			case choices[4]://Spock
				switch(computer){
					case choices[2]://Spock vs Scissors
					case choices[0]://Spock vs Rock
						userScore++;
						winner = player;
						return ` ${user} beats ${comp}.You win 🔥`;
						break;
					case choices[1]://Spock vs Paper
					case choices[3]://Spock vs Lizard
						computerScore++;
						winner = computer;
						return ` ${comp} beats ${user}.You lose 😞`;
					break;
				}
			break;
		}
	}
}

bt_play.addEventListener('click',function(){
	if(!running){play();} //Impede que o jogo inicie varias vezes ao mesmo tempo com vários cliques
});

bt_reset.addEventListener('click',function(){
	userScore = 0;
	computerScore = 0;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
})