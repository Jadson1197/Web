let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let context = canvas.getContext("2d");

let myBird = undefined;
let tubes = [];
let gameOver = false;
let time = 0;
let score = 0;

function init(){
	myBird = new Bird(80,300,10,0.6,-13,1);
	myBird.draw();
}

//APP
function animate(){
	if(gameOver){
		return;
	}
	requestAnimationFrame(animate);
	context.clearRect(0,0,canvas.width,canvas.height);
	context.font = "15px Arial";
	context.fillStyle = "yellow";
	context.fillText("SCORE: "+score, canvas.width - 150, 50);
	myBird.update();
	
	if(time % 60 == 0){
		tubes.push(new Tube());
	}	

	time++;
	for(let i = 0; i < tubes.length; i++){
		tubes[i].draw();
		tubes[i].update();
		if(tubes[i].isOffScreen()){
			tubes.shift();
			score++;
		}
	}

	if(tubes[0].hits(myBird) || myBird.hits()){
		alert("HITS\nSCORE: "+score);
		gameOver = true;
	}

}

window.addEventListener('keypress',function(event){
	if(event.charCode == 32 && !gameOver){
		myBird.up();
	}
})

init();
animate();
