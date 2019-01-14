let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');

let mouse ={
	x: undefined,
	y: undefined
};
//
window.addEventListener('mousemove',function(event){//pega as posições do mouse para verificar a proximidade com a bolinha
	mouse.x = event.x;
	mouse.y = event.y;
})

//Recria as bolinhas quando a tela muda de tamanho
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})


let maxRadius = 100;


let colors = [
	'#112F41',
	'#068587',
	'#4FB99F',
	'#F2B134',
	'#ED553B',
	'#1C3341',
	'#008773',
	'#6BB983',
	'#F2C975',
	'#ED6353'
];


function Circle(x,y,radius,velx,vely){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.vely = vely;
	this.velx = velx;
	this.color = Math.floor(Math.random() * colors.length)-1;
	this.minRadius = radius;

	this.draw = function(){

		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
		context.fillStyle = colors[this.color];
		context.fill();
	}


	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){//Verifica se a bola bateu na lateral direita e faz ela andar na direção contrária
			this.velx = -this.velx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){//Verifica se a bola bateu na lateral esquerda e faz ela andar na direção contrária
			this.vely = -this.vely;
		}

		this.y+=this.vely;
		this.x+=this.velx;

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 
			&& mouse.y - this.y > -30 && this.radius < maxRadius){//Faz a bola aumentar de tamanho quando o mouse se aproxima
			this.radius+=5;
		}else
			if(this.radius > this.minRadius){//diminui o tamanho da bola quando o mouse se afasta
				--this.radius;
				console.log(this.radius);
			}

		this.draw();
	}
}

let circleArray = [];

function init(){
		circleArray = [];
		for(let i = 0;i < 800;i++){
			let radius = Math.random() * 4 + 1;
			let x = Math.random() * (innerWidth - radius * 2) + radius;
			let y = Math.random() * (innerHeight - radius * 2) + radius;
			let velx = Math.random() + 0.5;
			let vely = Math.random() + 0.5;

			circleArray.push(new Circle(x,y,radius,velx,vely));
		}
}

function animate(){
		requestAnimationFrame(animate);
		context.clearRect(0,0,innerWidth,innerHeight);
		for(let i = 0; i < circleArray.length;i++){
			circleArray[i].update();
		}
}

init();
animate();




