const player1 = "X";
const player2 = "O";

let playTime = player1;
let gameOver = false;
let jogadas = 0;

updateTime();
initializeSpace();


function updateTime(){
	if(gameOver){return;}

	if(playTime == player1){
		let player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", "imagens/x.png");
	}else{
		let player = document.querySelectorAll("div#mostrador img")[0];
		player.setAttribute("src", "imagens/o.png");
	}
}


function initializeSpace(){

	let spaces = document.getElementsByClassName("space");
	
	for (let i = 0; i < spaces.length; i++){

		spaces[i].addEventListener("click", function(){
			
			if(gameOver){return;}

			if(this.getElementsByTagName("img").length == 0){

				if(playTime == player1){
					this.innerHTML = "<img src ='imagens/x.png'>";
					this.setAttribute("jogada",player1);
					playTime = player2;

				}else{
					this.innerHTML = "<img src= 'imagens/o.png'>";
					this.setAttribute("jogada",player2);
					playTime = player1;
				}
				jogadas++;

				updateTime();
				if(jogadas > 4 ){
					seeWinner();
				}
				
			}
		});
	}
}

function seeWinner(){
	let winner = "";

	let a1 = document.getElementById("a1").getAttribute("jogada");
	let a2 = document.getElementById("a2").getAttribute("jogada");
	let a3 = document.getElementById("a3").getAttribute("jogada");

	let b1 = document.getElementById("b1").getAttribute("jogada");
	let b2 = document.getElementById("b2").getAttribute("jogada");
	let b3 = document.getElementById("b3").getAttribute("jogada");

	let c1 = document.getElementById("c1").getAttribute("jogada");
	let c2 = document.getElementById("c2").getAttribute("jogada");
	let c3 = document.getElementById("c3").getAttribute("jogada");


	if((a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "") || (a1 == b1 && a1 == c1 && a1 != "")){
		winner = a1;
	}else
		if((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == c1 && b2 == a3 && b2 != "")){
			winner = b2;
		}else
			if((c3 == b3 && c3 == a3 && c3 != "") || (c3 == c2 && c3 == c1 & c3 != "")){
				winner = c3;
			}

	if(winner != ""){
		gameOver = true;
		updateTime();
		alert("The Winner is : '" + winner + "'");
	}else
		if(jogadas == 9 && winner == ""){
			alert("Draw");
		}
}
