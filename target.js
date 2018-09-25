var xt = 0 ;
var yt = 0 ;
var xm = 0 ;
var yt = 0 ;
var cp =0 ;
var cb = true ;
var Target = function(x,y,w,h,vx,vy){

	Corps.call(this,x,y,w,h,vx,vy)
	var image = new Image();
	image.src = "pictures/kung.png";
	this.image = image ;
	this.deltaTime=0.05
	this.ax = 0
	this.ay = -9.8


}


Target.prototype = Object.create(Corps.prototype);
Target.prototype.constructor=Target;


Target.prototype.update = function(){
	if(this.h == 71){
		this.h = 70 ;
		var image = new Image();
		image.src = "pictures/minionc.png";
		this.image = image ;

	}
if(level == 4){

	if(xt <= 0){
		xm = this.x ;
	  ym = this.y;
	 xt = this.x ;
	 yt = this.y;

	}

	console.log("level  "+level);



	if(cb ){
		cb = false ;
	var inter = setTimeout(function () {
		clearTimeout(inter);
		xm =  Math.floor(Math.random() * ((xt+100) - (xt-100)) + (xt-100));
		ym =  Math.floor(Math.random() * ((yt+100) - (yt-100)) + (yt-100));

		console.log("time"+xm,ym);
		if (cb == false){
			console.log("false");
			cb = true ;
		}

	}, 2000);



	}


	this.x = xm ;
	this.y = ym ;
}
else {
	this.x = this.x+ this.vx*this.deltaTime;
	this.y = this.y - this.vy*this.deltaTime;
	this.vx = this.vx + this.ax*this.deltaTime
	this.vy = this.vy + this.ay*this.deltaTime;

}
}


Target.prototype.affichageR = function(context){
//console.log("target affichage");
//	context.beginPath();
//	context.lineWidth = 1;
	//context.strokeStyle = '#1f5959';
//	context.rect(this.x,this.y,this.w,this.h);
//	context.fillStyle = '#006699';
//	context.fill();
	context.drawImage(this.image,this.x,this.y,this.w,this.h);
//	context.stroke();

}
