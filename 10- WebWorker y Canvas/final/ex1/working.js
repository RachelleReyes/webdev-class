onmessage = function (e) {

	detectarColision(e.data[0],e.data[1],e.data[2],e.data[3],e.data[4],e.data[5],Number(e.data[6]),Number(e.data[7]));
	
};

function detectarColision(pelotax,pelotay,moveX,moveY,player1y,player2y,score1,score2){
	var radio = 20,rectx = 25,recty =150 ,canvasW=900,canvasH=500;
	
	console.log("Webworker revisando colisiones");
	
	if (pelotax > canvasW - radio){
		moveX = -moveX;
		score1++;
		console.log(score1);
	}else if(pelotax < radio){
		moveX = -moveX;
		score2++;
		console.log(score2);
	} 
	
	if (pelotax <  radio*2) 
		if(pelotay > player1y && pelotay < player1y+recty){
			moveX = -moveX;
			console.log("Jugador1");
		}
	if (pelotax > (canvasW - rectx - radio)) 
		if(pelotay > player2y && pelotay < player2y+recty){
			moveX = -moveX;
			console.log("Jugador2");
		}
		
	if (pelotay > canvasH - radio || pelotay < radio) moveY = -moveY;
	
	this.postMessage([moveX,moveY,score1,score2]);
	
}

