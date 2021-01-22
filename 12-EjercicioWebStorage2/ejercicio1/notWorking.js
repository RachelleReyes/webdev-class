onmessage = function (e) {
	//pelota.postMessage(e.data);
	//pelota.postMessage(e.data[0]);
	
	console.log("RECEIVED" + e.data[1].prad);
	detectarColision(e.data[0],e.data[1],e.data[2]);
	
};


function detectarColision(pared,pelota,canvas){
	var width = 20, height = 150;
	
	for (let i = 0; i <2; i++) {
	  let x = Math.sqrt(Math.pow(pelota.px - pared[i*2], 2));
	  let y = Math.sqrt(Math.pow(pelota.py - pared[i*2+1], 2));

		if (x - pelota.prad - width <= 0)
			if (y - pelota.prad - height <= 0) pelota.dx = -pelota.dx;
	}
	let dx = pelota.pdx;
	let dy = pelota.pdy;
	
	
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
	
	if (pelota.y + pelota.prad > canvas.cH || pelota.y - pelota.prad < 0)
	  //pelota.dy = -pelota.dy;
		pelota.pdy = -pelota.pdy;
	if (pelota.x + pelota.prad > canvas.cW || pelota.x - pelota.prad < 0)
	  //pelota.dx = -pelota.dx;
		pelota.pdx = -pelota.pdx;
		
		console.log("DY1:" +pelota.pdy);
		console.log("DY2:" +dx);

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
	console.log("SENT");
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