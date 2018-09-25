

//Classe "mere" de target ball solide, etc
var Corps = function(x,y,w,h,vx,vy){

    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.vx=vx;
    this.vy=vy;

}


Corps.prototype.update = function(){

	this.x = this.x + this.vx;
	this.y = this.y + this.vy;

} 


//Si collision return vrai

Corps.prototype.collision = function(other){

	var collision = Math.abs(other.x + 0.5*other.w - (this.x + 0.5*this.w)) < 0.5*(other.w + this.w) 
    var collision2 = Math.abs(other.y + 0.5*other.h - (this.y + 0.5*this.h)) < 0.5*(other.h + this.h) 


	return collision && collision2 

}
