//OBJECT TUBE
class Tube{
	constructor(){
		this.x = canvas.width;
		this.top = Math.floor(Math.random()*(canvas.height*0.65));
		this.w = 20;
		this.speed = 3;
		this.bottom = this.top + 150;
	}

	isOffScreen(){return this.x + this.w < 0;}

	hits(bird){//Verifica se bateu em alguma parte do tubo
		return ((bird.x > this.x && bird.x < this.x + this.w) && (bird.y < this.top || bird.y > this.bottom));
	}

	draw(){
		context.beginPath();
		context.rect(this.x,0,this.w,this.top);
		context.fillStyle = "white";
		context.fill();
		context.beginPath();
		context.rect(this.x,this.bottom, this.w, canvas.height);
		context.fill();
	}

	update(){
		this.x -= this.speed;
	}
}