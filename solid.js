

//Solide hérite de corps avec les attributs x y w h v
var Solid = function(x,y,w,h,vx,vy,lives){

	Corps.call(this,x,y,w,h,vx,vy)
	var image = new Image();
	image.src = "pictures/wood.png";
	this.image = image ;
	this.w = w ;

	this.lives=lives

	this.deltaTime=0.05
	this.ax = 0
	this.ay = -9.8

}

//Heritage prototypes

Solid.prototype = Object.create(Corps.prototype);
Solid.prototype.constructor=Solid;


Solid.prototype.update = function(){


if(this.lives == 2){
var img = new Image()
	img.src = "pictures/wood.png";
		this.image = img;
		this.w = 25 ;
	//	this.x = this.x + 25;
}




	  this.x = this.x+ this.vx*this.deltaTime;
    this.y = this.y - this.vy*this.deltaTime;
    this.vx = this.vx + this.ax*this.deltaTime
    this.vy = this.vy + this.ay*this.deltaTime




}


//Affichage d'un solide

Solid.prototype.affichageR = function(context){

	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#1f5959';
	context.rect(this.x,this.y,this.w,this.h);
	context.fillStyle = '#8bb296';
	context.fill();
	context.drawImage(this.image,this.x,this.y,this.w,this.h);
	context.stroke();

}
