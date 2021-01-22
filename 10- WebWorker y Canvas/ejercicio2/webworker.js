onmessage = function (e) {
	//pelota.postMessage(e.data);
	//pelota.postMessage(e.data[0]);
	
	detectarColision(e.data[0],e.data[1],e.data[2]);
	
};


function detectarColision(pared,pelota,canvas){
	var width = 20, height = 150;
	var parx, pary;
	
	for (let i = 0; i <2; i++) {
		if(i == 0){
			parx = pared.p1x;
			pary = pared.p1y;
		}else{
			parx = pared.p2x;
			pary = pared.p2y;
		}
		
	  let x = Math.sqrt(Math.pow(pelota.px - parx, 2));
	  let y = Math.sqrt(Math.pow(pelota.py - pary, 2));

		if (x - pelota.prad - width <= 0)
			if (y - pelota.prad - height <= 0) {
				console.log("COLISION 1" + pelota.pdx);
				pelota.pdx = -pelota.pdx;
			}
	}
	//let dx = pelota.pdx;
	//let dy = pelota.pdy;
	
	//console.log("DX " + dy);
	//console.log("DY " + dy);
	/*
	var playerVal = {p1x: Jugadores[0].x, p1y:Jugadores[0].y, p2x: Jugadores[1].x, p2y:Jugadores[1].y};
	var pelotaVal = {px: balls[0].x, py: balls[0].y, pdx:balls[0].dx, pdy:balls[0].dy, prad:balls[0].radius};
	var canvasVal = {cH:canvas.height, cW:canvas.width};
	*/
	
	
	console.log("PDX1 " + pelota.pdx);
	console.log("PDY1 " + pelota.pdy);
	
	/*
			for (let i = 0; i <2; i++) {
			  let x = Math.sqrt(Math.pow(this.x - wall[i].x, 2));
			  let y = Math.sqrt(Math.pow(this.y - wall[i].y, 2));

				if (x - this.radius - width / 2 <= 0)
					if (y - this.radius - height / 2 <= 0) this.dx = -this.dx;
			}
			
			if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
			  this.dy = -this.dy;
			if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
			  this.dx = -this.dx;
			*/
	
	if (pelota.py + pelota.prad > canvas.cH || pelota.py - pelota.prad < 0){
	  //pelota.dy = -pelota.dy;
		pelota.pdy = -pelota.pdy;
		console.log("COLISION 2 " + pelota.pdy);
	}
	
	if (pelota.px + pelota.prad > canvas.cW || pelota.px - pelota.prad < 0){
	  //pelota.dx = -pelota.dx;
		pelota.pdx = -pelota.pdx;
		console.log("COLISION 3 " + pelota.pdx);
	}
		
		console.log("PDX2 " + pelota.pdx);
		console.log("PDY2 " + pelota.pdy);;

	/*
	for (let i = 0; i < pared.length; i++) {
	  //let x = getDistanceComponent(pelota.x, pared[i].x);
	  //let y = getDistanceComponent(pelota.y, pared[i].y);

		if (x - pelota.radius - pared[i].halfWidth / 2 <= 0)
			if (y - pelota.radius - pared[i].halfHeight / 2 <= 0) 
				//pelota.dx = -pelota.dx;
				dx = -pelota.dx;
	}
		
	if (pelota.y + pelota.radius > canvas.height || pelota.y - pelota.radius < 0)
	  //pelota.dy = -pelota.dy;
		dy = -pelota.dy;
	if (pelota.x + pelota.radius > canvas.width || pelota.x - pelota.radius < 0)
	  //pelota.dx = -pelota.dx;
		dx = -pelota.dx;
  
	console.log("SENT");
	this.postMessage([dx,dy]);
	*/
	this.postMessage([pelota.pdx,pelota.pdy]);
	
}


/*
function multiplicarMatrices(mat1, mat2) {
  var resul = [];
  for (var i = 0; i < mat1.length; i++) {
    resul[i] = [];
    for (var j = 0; j < mat2[0].length; j++) {
      var suma = 0;
      for (var k = 0; k < mat1[0].length; k++) {
        suma += mat1[i][k] * mat2[k][j];
      }
      resul[i][j] = suma;
    }
  }
  pelota.postMessage(resul);
}
*/