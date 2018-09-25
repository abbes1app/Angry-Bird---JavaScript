var by = 0 ;
var bx = 0 ;
var vx = 0 ;
var vy = 0;
var ay = 0 ;
var ressort = false;
var time = true ;
var allmove = false ;
var lastmove = false ;
var haut = false ;
var fin = false ;
var es = true ;
var pt = true ;

var over = true;


var Engine = function(ball,solides,breakable,rossort,targets,essais,score){

	  this.solides = solides;
    this.ball = ball;
    this.targets = targets;
    this.breakable = breakable;
		this.rossort = rossort;
    this.essais = essais;
    this.win = false;
    this.defeat = false;
    this.objets = this.solides.concat(this.breakable)
   	this.objets = this.objets.concat(this.rossort)
    this.objets = this.objets.concat(this.targets)
    this.score = score

}



//Methode gestion collision entre les corps
Engine.prototype.collisionE = function(context){

	/// pour garder la balle sur le sol

if(this.ball.y +this.ball.h > 600){
	this.ball.vx = 0 ;
	this.ball.vy = 0 ;
}
// pour garder les objets sur le sol
	for(let i=0;i<this.objets.length;++i){

		if(this.objets[i].y + this.objets[i].h > 580){
	if(this.objets[i] instanceof Target){
		this.objets[i].h = 71 ;
	}
	else {
		if((-(this.objets[i].vy ) >   0.99) &&
	//	(this.objets[i].h + this.objets[i].y < this.ball.y ) &&
		((this.ball.x < this.objets[i].x ) || (this.ball.x > this.objets[i].x + this.objets[i].w ))
	){
		var audio = new Audio('wooddamage.mp3');
		audio.play();
			this.objets[i].lives -= 1 ;

		}

		else if (((this.ball.x > this.objets[i].x )
		&& (this.ball.x < this.objets[i].x + this.objets[i].w )) &&
   (this.objets[i].h + this.objets[i].y < this.ball.y + this.ball.h  )
	){
			this.ball.x = x4 ;
			this.ball.y = y4 ;
			this.ball.vy = 0 ;
		//	this.ball.vx = 0;
			this.ball.ay = 0 ;
			var audio = new Audio('hurt.mp3');
			audio.play();

		}
		   }
		this.objets[i].vy = 0
		this.objets[i].vx = 0;
	}

		for(let j=0;j<this.objets.length;++j){
			if(i!=j){
// pour garder un objet sur l'autre
				if(this.objets[i].collision(this.objets[j]) && this.objets[j].y > this.objets[i].y){
					this.objets[i].vy = 0
				}

			}
		}

}
	for(let i=0;i<this.objets.length;++i){
/// colison objet solid
		if(this.ball.collision(this.objets[i]) &&  (ball.x+ball.w)-this.objets[i].x<10){

			if(this.objets[i] instanceof Solid){
				var audio = new Audio('wooddamage.mp3');
				audio.play();
				if((this.objets[i].h < 30)|| (this.objets[i].w < 26)){
					console.log(this.ball.vx);
					console.log("petit bois");
					pt = false ;
				  this.objets.splice(i,1)
					this.ball.x = this.ball.x - 10
					this.ball.vx= 0
				}


				else {
				this.objets[i].vx = this.ball.vx / 9
    		this.ball.x = this.ball.x - 10
				this.ball.vx= 0
				this.objets[i].lives = this.objets[i].lives - 1
				if((this.objets[i].lives==0) ){
					this.objets.splice(i,1)
				}

			}
	this.restart();
}

// toucher rossort
					if(this.objets[i] instanceof Ros){
						ressort = true ;
					//	this.objets[i].life = this.objets[i].life - 1

					//	if(this.objets[i].life==0){this.objets.splice(i,1)}
					if (this.ball.vx > 0){
						var audio = new Audio('ressort.mp3');
						audio.play();


					if (ressort == false){
					this.ball.x  = bx ;
					this.ball.y  = by ;
					this.ball.ay = 0 ;
					this.ball.vx = 0 ;
					this.ball.vy = 0 ;

					}

					if((ressort)){
						time  = false ;

						var audio = new Audio('ressort.mp3');
						audio.play();


						ball.vy = 0 ;

					ball.vx = 80 * -1.7

					}

					}

			if (ball.vx == 0 ){
						ball.x = ball.x - (this.objets[i].w)/2 +23
					}

					}



		 	else if(this.objets[i] instanceof Breakable){

		 		this.x = this.x - 5
				this.ball.vx = this.ball.vx / 2
				this.objets.splice(i,1)
				var audio = new Audio('glass.mp3');
				audio.play();


			}

			else	if((this.objets[i] instanceof Target)&& (this.ball.x + this.ball.w >= this.objets[i].x)){
				  this.objets.splice(i,1)

					nbcible -= 1 ;
				 	if( nbcible == 0){
				 	this.win = true;
				 	}
				}
		}

		else if(this.ball.collision(this.objets[i]) &&  (ball.x+ball.w)-this.objets[i].x >=10){

			if(this.objets[i] instanceof Solid){

     console.log(this.ball.vx,this.ball.vy)	;
		  this.ball.vy = 0
			if (this.ball.vx > 50){
				this.ball.vx = this.ball.vx
			}
			else
			{
				 this.ball.vx= this.ball.vx / 10
			}

			haut = true ;



				//this.objets[i].lives = this.objets[i].lives - 1

			}


				else if(this.objets[i] instanceof Ros){
ressort = true ;
						//	this.objets[i].life = this.objets[i].life - 1
						//	if(this.objets[i].life==0){this.objets.splice(i,1)}
						if (this.ball.vx > 0){

					 if (ressort == false){
						this.ball.x  = bx ;
						this.ball.y  = by ;
						this.ball.ay = 0 ;
						this.ball.vx = 0 ;
						this.ball.vy = 0 ;

						}

						var audio = new Audio('ressort.mp3');
						audio.play();
						if((ressort)){
							time  = false ;




							ball.vx = 0 ;

						ball.vy = 80 * 1.7

						}

						}

				if (ball.vx == 0 ){
							ball.x = ball.x - (this.objets[i].w)/2 +23
						}
						}

			else if(this.objets[i] instanceof Breakable){

				this.ball.vx = this.ball.vx / 1.5
				this.ball.x = this.ball.x - 5 ;
				this.objets.splice(i,1)
				var audio = new Audio('glass.mp3');
				audio.play();


			}
			else	if((this.objets[i] instanceof Target)&& (this.ball.x + this.ball.w >= this.objets[i].x)){
				  this.objets.splice(i,1)

					nbcible -= 1 ;
				 	if( nbcible == 0){
				 		this.win = true;
				 	}
				}
		}


	}

		for(let i=0;i<this.objets.length;++i){
			for(let j=0;j<this.objets.length;++j){


				if(this.objets[i].collision(this.objets[j]) &&
				(this.objets[i].vx > 0) &&
				(this.objets[i].x + this.objets[i].w - this.objets[j].x < 10) &&
			   (this.objets[i] instanceof Solid) &&  (this.objets[j] instanceof Solid)){




					var audio = new Audio('wooddamage.mp3');
					audio.play();

					this.objets[j].vx += 5
				//	this.objets[i].x -= 10
					this.objets[j].vx = this.objets[i].vx
					this.objets[i].vx /= 1.5

					this.objets[i].lives = this.objets[i].lives - 1; //PERD VIE QUAND ILS SE COGNENT ENTRE EUX
					this.objets[j].lives = this.objets[j].lives - 1; //PERD VIE QUAND ILS SE COGNENT ENTRE EUX

				if(this.objets[i].lives==0){
					this.objets.splice(i,1)
				}
				if(this.objets[j].lives==0){
					this.objets.splice(i,1)
				}

				}






				else if ( (this.objets[i].collision(this.objets[j])) &&
				(this.objets[j] instanceof Solid) &&  (this.objets[i] instanceof Breakable)){
          this.objets.splice(i,1)
					var audio = new Audio('glass.mp3');
					audio.play();

					this.objets[j].lives = this.objets[j].lives - 1;
					//PERD VIE QUAND ILS SE COGNENT ENTRE EUX
			  this.objets[j].vx = this.objets[j].vx /1.1

			}

			else if((this.objets[i] instanceof Solid )&&
			(	this.objets[i].collision(this.objets[j]) )&&
			( this.objets[j] instanceof Target)&&
			( this.objets[i].vx > 0) ){
				if((this.objets[i].h + this.objets[i].y  >  this.objets[j].y )&&
			( this.objets[i].y  <  (this.objets[j].y + this.objets[j].h ) - 5)
		){
					nbcible -= 1 ;
          this.objets.splice(j,1)
					this.objets[i].vx = this.objets[i].vx / 4 ;
					this.ball.vy = 0
					this.ball.vx=0

						console.log("h <<<<<")
				}
				else {
					this.ball.vy = 0
					this.ball.vx=0
       this.objets.splice(i,1)
			 console.log("le bout negel3eh")


		}

		if( nbcible == 0){
		//	 this.objets.splice(j,1)
			this.win = true;
		}
}
		}


	}

	for(let i=0;i<this.objets.length;++i){

		if(this.objets[i].vx == 0){
    allmove = true ;

		}

}

if(((this.ball.x < 0)  && es)|| ((this.ball.x > 1550)  && es)){
	console.log("rossort");
	if (time){
		var audio = new Audio('hurt.mp3');
		audio.play();
		time = false ;
	}

  ressort = false ;
	this.ball.vx = 0;
//	this.ball.vy = 	this.ball.vy/10;
}

if((this.ball.y < 0) && (ressort == true) && es){
	console.log("rossort haut");
ressort = false ;
	this.restart();
}

if((this.ball.vx == 0) && (this.ball.vy == 0) && lancer && (this.ball.y + this.ball.h > 580) && es){
	console.log("ball  sol");
	this.ball.y = 500 ;

	console.log(this.essais);
	this.restart();
}


if((this.ball.vx == 0) && (this.ball.vy == 0) && haut && es){
 haut = false ;
 console.log("je suis en haut");
	this.restart();
}

lastmove = allmove ;

}


Engine.prototype.restart = function(context){
	/*if(es){
		var z = this.essais ;
	this.essais -= 1;
	if((z-1) == 9){

		over = false ;
	}

		es = false ;

	}



	if(over){

		var k = setTimeout(function () {


		}, 500);

		console.log("abbes");



	}*/if(es){
  this.essais-- ;
  pt= true ;
	time = true ;
	console.log("fknfgvjknbfgnkjfvgknjfg" + this.essais);
	es = false ;

}

setTimeout(function () {
	if(over){


		this.ball.x = x4;
		this.ball.y = y4;
		this.ball.vx = 0;
		this.ball.vy = 0;
		this.ball.ay=0;
		this.essais--;

	over = false ;
	}


}, 2200);



	}



//Mise à jour des nouvelles positions de chaque corps

Engine.prototype.update = function(context){

	context.clearRect(0,50,1600,750);
	context.rect(0,0,1600,750);
	//context.fillStyle = "#e6faff";
	//context.fill();
		for(let i=0;i<this.objets.length;++i){
			this.objets[i].affichageR(context);
			this.objets[i].update();
		}

	//	this.target.affichage(context)
		this.ball.update();
		this.ball.affichage(context);
		this.collisionE(context);
		this.lives(context);

	}

//En cas de victoire
Engine.prototype.victory = function(context,interval,level){


 this.score = 1000 * (this.essais);
 console.log("score in victory " + this.score);
  clearInterval(interval);
//  context.clearRect(0,50,1600,750);
	context.fillStyle = "#009999";
	context.rect(350,150,900,450)
	context.fill();
	context.fillStyle = "#00cccc";
	context.font = "60px Arial";
	var l = level+1
  l="Level "+l
	context.fillText(l,670,230);
	var image = new Image();
	image.src = "pictures/c.jpg";
	context.drawImage(image,450,250,700,270);

}

//En cas de défaite(0 essais restants)

Engine.prototype.gameOver = function(context,interval){


	clearInterval(interval);
	context.globalAlpha=0.1;
	context.rect(600,170,450,200);
	context.fillStyle = "#green";
	context.fill();
	context.fillStyle = "#008fb3";
	context.font = "70px Arial";
	context.globalAlpha=0.7;
	context.fillText("Game over  ",650,300);
	context.globalAlpha=1;

}

//Affichages entête : Nombre d'essais restant + Score

Engine.prototype.lives = function(context){

	var start=120;

	context.clearRect(0,0,1600,50);
	context.rect(0,0,1600,50);
	context.fillStyle = "#b3cbff";
	context.fill();

	context.font = "30px Arial"
	context.fillStyle = "#33cc33"
	context.fillText("Lives : ",10,35);

	var image = new Image();
	image.src = "pictures/8286.png";


	for(var i = 0; i< this.essais; ++i){

		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = '#1f5959';
		context.drawImage(image,start,17,20,20);
		start = start + 30;

	}

	context.fillStyle = "#33cc33"
	s = "Score "+this.score
	context.fillText(s,450,35);
}
