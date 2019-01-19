//OBJECT BIRD
class Bird{
	constructor(x,y,radius,gravity,lift,velocity){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.gravity = gravity;
		this.lift = lift;
		this.velocity = velocity;
	}

	draw(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
		context.fillStyle = "white";
		context.fill();
	}

	hits(){//Verifica se bateu no teto ou no chão
		return((this.y + (this.radius/2) > canvas.height)) || (this.y * this.radius < 0);
	}

	update(){
		this.draw();
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	up(){
		this.draw();
		this.velocity += this.lift;
		this.velocity *= 0.7;
		this.update();
	}
}