
var Breakable = function(x,y,w,h,vx,vy,life){

	Corps.call(this,x,y,w,h,vx,vy)
	this.life=life;
	var image = new Image();
	image.src = "pictures/ice.png";
	this.image = image;

	this.deltaTime=0.05
	this.ax = 0
	this.ay = -9.8
	
}

Breakable.prototype = Object.create(Corps.prototype);
Breakable.prototype.constructor=Breakable;


Breakable.prototype.update = function(){
	

	this.x = this.x+ this.vx*this.deltaTime;
    this.y = this.y - this.vy*this.deltaTime;
    this.vx = this.vx + this.ax*this.deltaTime
    this.vy = this.vy + this.ay*this.deltaTime

} 

//Affichage du breakable + son image

Breakable.prototype.affichageR = function(context){

	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#b3d9ff';
	context.rect(this.x,this.y,this.w,this.h);
	context.fillStyle = '#cce6ff';
	context.fill();
	context.drawImage(this.image,this.x,this.y,this.w,this.h);
	context.stroke(); 

}




