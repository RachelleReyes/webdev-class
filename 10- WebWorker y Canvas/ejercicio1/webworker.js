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

	console.log("PDX1 " + pelota.pdx);
	console.log("PDY1 " + pelota.pdy);
	
	
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

	
	this.postMessage([pelota.pdx,pelota.pdy]);
	
}

