<!DOCTYPE html>
<html>
	<head>
		<title>Ping Pong</title>
		
	</head>
<body>
	 
   <canvas id="micanvas" style="border:3px solid green";></canvas>
    <script>
		//http://localhost/10-%20WebWorker%20y%20Canvas/ejercicio1/
	
		function randomDirection() {
		  if (Math.random() - 0.5 < 0) {
			return -1;
		  } else {
			return 1;
		  }
		}

		var canvas = document.getElementById('micanvas');
		canvas.width = 900;
		canvas.height = 500;
		var c = canvas.getContext('2d');
		var mi_worker = new Worker("webworker.js");
		var width = 20, height = 150;

		// Clase del jugador
		class Jugador {
		  constructor(x, y, color,keyCodeUp, keyCodeDown) {
			this.x = x;
			this.y = y;
			this.color = color;
			//this.halfWidth = width;
			//this.halfHeight = height;

			this.keyCodeUp = keyCodeUp || undefined;
			this.keyCodeDown = keyCodeDown || undefined;
			this.keyBoolUp = false;
			this.keyBoolDown = false;
			this.keyOn = undefined;

			this.isMoving = false;
			this.dy = 2;
			
		  }
		  // Inicialización del jugador
		  init() {
			this.draw();
			this.watchKeys();
		  }
		  
		  // Control de las teclas
		  watchKeys() {
			window.addEventListener("keydown", ev => {
			  let keyCode = ev.keyCode;

			  if (keyCode == this.keyCodeUp) this.keyBoolUp = true;
			  if (keyCode == this.keyCodeDown) this.keyBoolDown = true;
			});
			window.addEventListener("keyup", ev => {
			  let keyCode = ev.keyCode;
			  if (keyCode == this.keyCodeUp) this.keyBoolUp = false;
			  if (keyCode == this.keyCodeDown) this.keyBoolDown = false;
			});
		  }
		  
		  // Dibujo de los jugadores 
		  draw() {
			c.beginPath();
			c.fillStyle = this.color;
			c.fillRect(
			  this.x - width / 2,
			  this.y - height / 2,
				width,
				height
			);
			c.closePath();
		  }
		  
		  // Movimiento de los jugadores de los jugadores
		  moving(theJugadores = []) {
			for (let i = 0; i < theJugadores.length; i++) {
			  if (theJugadores === this) continue;

			  if (this.keyBoolUp) {
				if (!(this.y - this.halfHeight / 2 < 0)) this.y += -this.dy;

				if (theJugadores[i].keyBoolUp)
				  if (!(theJugadores[i].y - theJugadores[i].halfHeight / 2 < 0))
					theJugadores[i].y += -theJugadores[i].dy;

				if (theJugadores[i].keyBoolDown)
				  if (!(theJugadores[i].y + theJugadores[i].halfHeight / 2 > canvas.height))
					theJugadores[i].y += theJugadores[i].dy;
			  }

			  if (this.keyBoolDown) {
				if (!(this.y + this.halfHeight / 2 > canvas.height)) this.y += this.dy;

				if (theJugadores[i].keyBoolUp)
				  if (!(theJugadores[i].y - theJugadores[i].halfHeight / 2 < 0))
					theJugadores[i].y += -theJugadores[i].dy;

				if (theJugadores[i].keyBoolDown)
				  if (!(theJugadores[i].y + theJugadores[i].halfHeight / 2 > canvas.height))
					theJugadores[i].y += theJugadores[i].dy;
			  }
			}
		  }
		  
		  // Actualizacion de los jugadores
		  update(theJugadores = []) {
			this.moving(theJugadores);
			this.draw();
		  }
		}

		// Clase de la pelota
		class Ball {
		  constructor(x, y, radius, color) {
			this.x = x || canvas.width / 2;
			this.y = y || canvas.height / 2;
			this.radius = 15;
			this.color = "red";
			this.dy = (Math.random() - 0.5) * 8;
			this.dx = randomDirection() * 8;
			
		  }
		  
		  // Dibuja la pelota
		  draw() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		  }
		  
		  // Actualiza la pelota
		  update(wall = []) {
		  
			//==================================== DETECTING THE COLLISION =====================================
			
			
			//for (let i = 0; i < wall.length; i++) {
				
			/*
			for (let i = 0; i <2; i++) {
			  let x = Math.sqrt(Math.pow(this.x - wall[i].x, 2));
			  let y = Math.sqrt(Math.pow(this.y - wall[i].y, 2));

				if (x - this.radius - width / 2 <= 0)
					if (y - this.radius - height / 2 <= 0) {
						console.log("COLLISION");
						this.dx = -this.dx;
					}
			}
			
			if (this.y + this.radius > canvas.height || this.y - this.radius < 0){
			  this.dy = -this.dy;
			  console.log("COLLISION");
			}
			if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
			  this.dx = -this.dx;
			  console.log("COLLISION");
			}
			*/
			
			
			// THINGS TO SEND
			// player1.x,player1.y, player2.x,player2.y, 
			// pelota.x, pelota.y, pelota.dx, pelota.dy, pelota.radius 
			// canvas.height, canvas.width
			
			//let playerVal = [wall[0].x,wall[0].y,wall[1].x,wall[1].y];
			//let pelotaVal = [this.x,this.y,this.dx,this.dy,this.radius];
			//let canvasVal = [canvas.height, canvas.width];
			
			
			/*
			var playerVal = {p1x: wall[0].x, p1y:wall[0].y, p2x: wall[1].x, p2y:wall[1].y};
			var pelotaVal = {px: this.x, py: this.y, pdx:this.dx, pdy:this.dy, prad:this.radius};
			var canvasVal = {cH:canvas.height, cW:canvas.width};
			var dx =this.dx , dy=this.dy;
			
			
			if (window.Worker) {
				//console.log("Send");
				 mi_worker.postMessage([playerVal,pelotaVal,canvasVal]);
				
				//numero1.onchange = function () {
				//  mi_worker.postMessage(counter.pointsLeft);
				//};
				
				
				mi_worker.onmessage = function (e) {
				 console.log("DY" + e.data[1]);
				
				 dy = e.data[1];
				 dx = e.data[0];
				};
			} else {
				console.log("El navegador no soporta WebWorkers");
			}
			
			this.dy = dy;
			this.dx = dx;
			*/
			
			/*
			if (window.Worker) {
				//console.log("Send");
				 mi_worker.postMessage([this,wall,canvas]);
				
				//numero1.onchange = function () {
				//  mi_worker.postMessage(counter.pointsLeft);
				//};
				
				
				mi_worker.onmessage = function (e) {
				 //console.log(e.data);
				 this.y += e.data[1];
				 this.x += e.data[0];
				};
			} else {
			console.log("El navegador no soporta WebWorkers");
			}
			*/
		
			this.y += this.dy;
			this.x += this.dx;
			this.draw();
			
			
		  }
		}
		
		// Clase para el contador
		class Counter {
			constructor(x, y) {
			this.pointsLeft = 0;
			this.pointsRight = 0;
		  }
		}

		class Game {
		  constructor() {
			this.initOne = true;
		  }
		  start() {
			//document.body.style.cursor = "pointer";
			//addEventListener("click", () => {
			addEventListener("load", () => {
			  if (this.initOne) {
				animate();
			//	document.body.style.cursor = "default";
				this.initOne = false;
			  }
			});
		  }
		  newGame(b = []) {
			balls.splice(0, 1);
			setTimeout(() => {
			  balls.push(new Ball());
			}, 1000);
		  }
		  running() {}
		  addPoint(b, c) {
			/*
			if (window.Worker) {
				var mi_worker = new Worker("webworker.js");
				numero1.onchange = function () {
				  mi_worker.postMessage(counter.pointsLeft);
				};
				mi_worker.onmessage = function (e) {
				 console.log("Resultado: " + e.data);
				};
			} else {
			console.log("El navegador no soporta WebWorkers");
			}
			*/
			
			if (b.x + b.radius > canvas.width) {
			  c.pointsLeft += 1;
			}
			if (b.x - b.radius <= 0) {
			  c.pointsRight += 1;
			}
		  }
		}

		var game = new Game();
		game.start();

		var counter = new Counter();
		var balls = [new Ball()];

		var Jugadores = [
		  new Jugador(10, canvas.height / 2, "purple",87, 83),
		  new Jugador(canvas.width - 10, canvas.height / 2, "green",38, 40)
		];
		Jugadores.forEach(p => p.init());

		balls.forEach(b => b.draw());

		function animate() {
		  for (let i = 0; i < balls.length; i++) {
			game.addPoint(balls[i], counter);
		  }
		  requestAnimationFrame(animate);
		  c.clearRect(0, 0, canvas.width, canvas.height);
		  document.getElementById('Jugador1').value = counter.pointsLeft;
		  document.getElementById('Jugador2').value = counter.pointsRight;
		  Jugadores.forEach(p => p.update(Jugadores));
		  balls.forEach(b => b.update(Jugadores));
		}
		
	
		
			
	</script>
	<div id = "footer"> 
		Player 1 
		<input type="text" id="Jugador1" value="0" readonly>
		<input type="text" id="Jugador2" value="0" readonly>
		Player 2
	</div> 
	
</body>
</html>