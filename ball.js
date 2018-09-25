
var Ball = function(x,y,w,h,vx,vy){

	Corps.call(this,x,y,w,h,vx,vy)
	var image = new Image();
	image.src = "pictures/8286.png";
	this.image = image;
	this.deltaTime=0.05
	this.ax = 0
	this.ay = 0

}



Ball.prototype = Object.create(Corps.prototype);
Ball.prototype.constructor=Ball;



//Mise à jour de la position de la balle x et y en fonction des vitesse vx et vy et ay
Ball.prototype.update = function(){


	this.x = this.x+ this.vx*this.deltaTime;
    this.y = this.y - this.vy*this.deltaTime;
    this.vx = this.vx + this.ax*this.deltaTime
    this.vy = this.vy + this.ay*this.deltaTime

}


//Affichage balle

Ball.prototype.affichage = function(context){
	var image = new Image();
	image.src = "pictures/Slingshot.png";
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#1f5959';
	context.drawImage(image,180-20,450,this.w+30,this.h+200);
	context.drawImage(this.image,this.x,this.y,this.w,this.h);

	context.fillStyle = '#930000';
	context.fill();
	context.stroke();

}
