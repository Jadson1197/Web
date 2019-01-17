let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let context = canvas.getContext("2d");

//OBJECT BIRD
function Bird(x,y,radius,gravity,lift,velocity){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.gravity = gravity;
	this.lift = lift;
	this.velocity = velocity;

	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
		context.fillStyle = "white";
		context.fill();
	}

	this.hits = function(){//Verifica se bateu no teto ou no chão
		return((this.y + (this.radius/2) > canvas.height)) || (this.y * this.radius < 0);
	}

	this.update = function(){
		this.draw();
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	this.up = function(){
		this.draw();
		this.velocity += this.lift;
		this.velocity *= 0.7;
		this.update();
	}
}

//OBJECT TUBE
function Tube(){
	this.x = canvas.width;
	this.top = Math.floor(Math.random()*(canvas.height*0.65));
	this.w = 20;
	this.speed = 3;
	this.bottom = this.top + 150;

	this.isOffScreen = function(){return this.x + this.w < 0;}

	this.hits = function(bird){//Verifica se bateu em alguma parte do tubo
		return ((bird.x > this.x && bird.x < this.x + this.w) && (bird.y < this.top || bird.y > this.bottom));
	}

	this.draw = function(){
		context.beginPath();
		context.rect(this.x,0,this.w,this.top);
		context.fillStyle = "white";
		context.fill();
		context.beginPath();
		context.rect(this.x,this.bottom, this.w, canvas.height);
		context.fill();
	}

	this.update = function(){
		this.x -= this.speed;
	}
}

let myBird = undefined;
let tubes = [];
let gameOver = false;
let time=0;
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