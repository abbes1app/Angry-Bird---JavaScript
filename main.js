var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var button2 = document.getElementById("button2");
var imggg = document.getElementById("shoot");
var but = true ;

//Event listener qui gère le lancement de la balle
if(but){
	button.addEventListener("click",loadLevel);
	but = false ;
}

bouge = false;
oveerr = true ;
var level = 0;
var score=0 ;
var ms = true ;
var nbcible = 0
var angle
var angleX;
var angleY;
var posX;
var posY;

var x4 = 180
var y4 = 450
var distance=0

canvas.addEventListener("click",function(event){

	posX = event.pageX-canvas.offsetLeft
	posY = event.pageY-canvas.offsetTop

})


// l'utilisateur doit cliquer sur la balle pour déclancher la procédure de lancement
canvas.addEventListener("mousedown",function(event){
	if((posX>x4 && posX<x4+50 &&posY > y4 && posY<y4+50)&& (oveerr) ){
		bouge = true;
 	}
})

//Evenement pour viser et calculer l'angle résultant
canvas.addEventListener("mousemove",function(event){


	posX = event.pageX- canvas.offsetLeft
	posY = event.pageY- canvas.offsetTop

	distance = Math.sqrt(Math.pow(posX-x4,2) + Math.pow(posY-y4,2))

	if(bouge){
  if(ms){
		ms = false ;
		var audio = new Audio('shoott.mp3');
		audio.play();
	}
		if(distance <= 100){
			ball.x = posX
			ball.y = posY

		}

		else{
			var centre = new Vector (x4,y4)
    		var point =  new Vector (posX,posY);
    		ball.x = Math.floor((findIntersect(centre,100,point)).x);
     		ball.y = Math.floor((findIntersect(centre,100,point)).y);

		}
	}
})

//Lancement de la balle en lui attribuant un angle et des vitesses

canvas.addEventListener("mouseup",function(event){

	if(bouge){
		if	((ball.x < x4  ) && (ball.x > x4 - 20 )  ||
        (ball.x > x4  ) && (ball.x < x4 + 30 )
	) {
		ball.x = x4 ;
		ball.y = y4 ;
		bouge = false ;
		ms = true ;
		}
		else{
		bouge = false;
		angleX = x4 -(posX-x4)
		angleY = y4 - (posY-y4)

	  	if(posX <= x4+10){
	  	 	angleX = x4 + (x4 - posX)
	  	}
		if(posY <= y4+10){
	  		angleY = y4 + (y4 - posY)
	 	}
		angle = calculAngle(angleX,angleY)
		var k = (distance*110)/100;
		console.log(angle);
		launch(angle,k)

	}}
 	context.clearRect(0,0,1600,750);

})
var lancer = false ;
var vie = 0 ;


function launch(angle,k){

	ball.vx = k* Math.cos(angle*(Math.PI/180.0))
	ball.vy = k* Math.sin(angle*(Math.PI/180.0))
	ball.ay = -9.8
	lancer = true ;

	var audio = new Audio('fly.mp3');
	audio.play();
	es = true ;
	over = true ;
ms = true ;

}

//relance de la fonction update du moteur physique qui met à jour les positions des élements
function update(engin){

	//Chaque 5 ms : l'objet engin rafraichit l'interface graphique
	var inter = setInterval(function(){ engin.update(context) }, 1)

	//Chaque 5 ms : vérifier si la cible est touchée, si oui, lancement methode go (qui charge nouveau lvl)


 	var inter2 = setInterval(function() {
setTimeout(function () {
	if(engin.essais == 0){
		oveerr = false ;
		engin.defeat = true ;

	}
}, 1800);



 	//En cas de victoire
 	if (engin.win){
		var audio = new Audio('level.mp3');
		audio.play();
score = 1000 * engin.essais ;
console.log("score in if " + engin.essais);

 		engin.win = false;
 		engin.victory(context,inter,level)
    setTimeout(go,2500)
			clearInterval(inter2);
 	}

 	//En cas de défaite
 	else if (engin.defeat){
	console.log("intrrt2")
    engin.defeat = false ;
 		engin.gameOver(context,inter)
 		setTimeout(restart,2500)
		clearInterval(inter2);
 	}

},2500)

}


//Requête http pour charger un fichier JSON
function loadLevel(){

var audio = new Audio('ambiance.mp3');
audio.play();
	context.clearRect(0,50,1600,750);
	ball = new Ball(x4,y4,50,50,0,0);

	var ourRequest= new XMLHttpRequest();
	ourRequest.open('GET',"levels/level"+level+".json",true);
	ourRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	ourRequest.onload = function(){


  var data =   JSON.parse(ourRequest.responseText);

		toObjects(data)


    };

ourRequest.send();
	oveerr = true ;

}



// Lecture fichier JSON + mise des éléments dans le moteur
function toObjects(data){

	//initialisation solides
	targets = [];
	solides = [];
	breakables = [];
	rossorts =  [] ;

//	var target = new Target(data.target.x,data.target.y,data.target.w,data.target.h,0,0);
//	target.affichage(context);


	//Chargement des solides + 1er affichage
	if (typeof data.solid !== 'undefined') {
	for(var i=0; i<data.solid.length; ++i){
		var solide = new Solid(data.solid[i].x,data.solid[i].y,data.solid[i].w,data.solid[i].h,0,0,data.lives);
		solides[i]=solide;
		solide.affichageR(context);

	}}

	//Chargement des solides cassant + 1er affichages
if (typeof data.breakable !== 'undefined') {
	for(var i=0; i<data.breakable.length; ++i){

		var cassant = new Breakable(data.breakable[i].x,data.breakable[i].y,data.breakable[i].w,data.breakable[i].h,0,0,1);
		breakables[i]=cassant;
		cassant.affichageR(context);

	}}
	if (typeof data.rossort !== 'undefined') {
	  // your code here

	for(var i=0; i<data.rossort.length; ++i){

		var rst = new Ros(data.rossort[i].x,data.rossort[i].y,data.rossort[i].w,data.rossort[i].h,0,0);
		rossorts[i] = rst;
		rst.affichageR(context);

	}
}
if (typeof data.target !== 'undefined') {
	for(var i=0; i<data.target.length; ++i){
		var target = new Target(data.target[i].x,data.target[i].y,data.target[i].w,data.target[i].h,0,0);
		nbcible = data.target.length ;
		targets[i]= target;
		target.affichageR(context);

	}}

	var essais = data.essais


	ball.affichage(context)

	//Initialisation engin qui aura comme parametres les solides + balle + cible qu'il bougera en fonction du temps
	var engin = new Engine(ball,solides,breakables,rossorts,targets,data.essais,score);
	update(engin);

}



//fonction de chargement d'un nouveau lvl

function go(){
if(level ==4){
	level = 0;
	score = 0 ;


}
else{

	level++;

}
context.clearRect(0,0,1600,750);
loadLevel();
}

function restart(){
  score = 0;
	level=0
	context.clearRect(0,0,1600,750);
	loadLevel();

}


function calculAngle (x,y) {

  var angle1 = Math.atan2(y - y4, x - x4);
  var angle2 = Math.atan2(y4 - y4,(x4 + 50) - x4);
  var k = angle1-angle2;
  z = Math.floor(-(k*180/3.1415926));

  if (z < 0 ) {
    z = 360 + z ;
  }
  	return z
 }


 function findIntersect (origin, radius, otherLineEndPoint) {
    var v = otherLineEndPoint.subtract(origin);
    var lineLength = v.length();
    if (lineLength === 0) throw new Error("Length has to be positive");

    v = v.normalize();

    return origin.add(v.multiplyScalar(radius));
}
