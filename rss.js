
//Ros hérite de corps avec les attributs x y w h v
var Ros = function(x,y,w,h,vx,vy){

	Corps.call(this,x,y,w,h,vx,vy)
	var image = new Image();
	image.src = "pictures/spring.png";  //dfinition de l'image d'un corps
	this.image = image;
	this.deltaTime=0.05
	

}

//Heritage prototypes

Ros.prototype = Object.create(Corps.prototype);
Ros.prototype.constructor=Ros;


Ros.prototype.update = function(){

//console.log("update rssss");

	  this.x = this.x ;
		this.y = this.y ;

}


//Affichage d'un solide

Ros.prototype.affichageR = function(context){

	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#1f5959';
	context.rect(this.x,this.y,this.w,this.h);
	context.fillStyle = '#8bb296';
	context.fill();
	context.drawImage(this.image,this.x,this.y,this.w,this.h);
	context.stroke();

}
