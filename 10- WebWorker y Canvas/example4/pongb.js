const getDistanceComponent = (a, b) => Math.sqrt(Math.pow(a - b, 2));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

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

class Player {
  constructor(x, y, color,keyCodeUp, keyCodeDown) {
    this.x = x;
    this.y = y;
	this.color = color;
    this.halfWidth = 20;
    this.halfHeight = 150;

    this.keyCodeUp = keyCodeUp || undefined;
    this.keyCodeDown = keyCodeDown || undefined;
    this.keyBoolUp = false;
    this.keyBoolDown = false;
    this.keyOn = undefined;

    this.isMoving = false;

    this.dy = 2;
  }
  init() {
    this.draw();
    this.watchKeys();
  }
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
  draw() {
    c.beginPath();
	c.fillStyle = this.color;
    c.fillRect(
      this.x - this.halfWidth / 2,
      this.y - this.halfHeight / 2,
      this.halfWidth,
      this.halfHeight
    );
    c.closePath();
  }
  moving(thePlayers = []) {
    for (let i = 0; i < thePlayers.length; i++) {
      if (thePlayers === this) continue;

      if (this.keyBoolUp) {
        if (!(this.y - this.halfHeight / 2 < 0)) this.y += -this.dy;

        if (thePlayers[i].keyBoolUp)
          if (!(thePlayers[i].y - thePlayers[i].halfHeight / 2 < 0))
            thePlayers[i].y += -thePlayers[i].dy;

        if (thePlayers[i].keyBoolDown)
          if (!(thePlayers[i].y + thePlayers[i].halfHeight / 2 > canvas.height))
            thePlayers[i].y += thePlayers[i].dy;
      }

      if (this.keyBoolDown) {
        if (!(this.y + this.halfHeight / 2 > canvas.height)) this.y += this.dy;

        if (thePlayers[i].keyBoolUp)
          if (!(thePlayers[i].y - thePlayers[i].halfHeight / 2 < 0))
            thePlayers[i].y += -thePlayers[i].dy;

        if (thePlayers[i].keyBoolDown)
          if (!(thePlayers[i].y + thePlayers[i].halfHeight / 2 > canvas.height))
            thePlayers[i].y += thePlayers[i].dy;
      }
    }
  }
  update(thePlayers = []) {
    this.moving(thePlayers);

    this.draw();
  }
}

class Ball {
  constructor(x, y, radius, color) {
    this.x = x || canvas.width / 2;
    this.y = y || canvas.height / 2;
    this.radius = radius || 15;
    this.color = color || "red";
    this.dy = (Math.random() - 0.5) * 8;
    this.dx = randomDirection() * 8;
	
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
  update(wall = []) {
    for (let i = 0; i < wall.length; i++) {
      let x = getDistanceComponent(this.x, wall[i].x);
      let y = getDistanceComponent(this.y, wall[i].y);
	  /*
		if (x > canvas.width - this.radius || x < this.radius) this.dx = -this.dx
		if (y > canvas.height - this.radius || y < this.radius) this.dy = -this.dy
     */
		
		if (x - this.radius - wall[i].halfWidth / 2 <= 0)
			if (y - this.radius - wall[i].halfHeight / 2 <= 0) this.dx = -this.dx;
		
	
		/*
		 if (pelota.x > canvas.width - radio || pelota.x < radio) moveX = -moveX;
				if (pelota.y > canvas.height - radio || pelota.y < radio) moveY = -moveY;
		*/
      // lados con circulos
    }
	
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy = -this.dy;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx = -this.dx;


    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  }
}
class Counter {
  constructor(x, y) {
    this.x = x || canvas.width / 2;
    this.y = y || 0;
    this.pointsLeft = 0;
    this.pointsRight = 0;
  }
  draw() {
    this.size();
    this.counterLeft();
    this.counterRight();
  }
  update() {
    this.draw();
  }
  size() {
    c.beginPath();
    c.fillStyle = "rgba( 255, 255, 255, .5)";
    c.fillRect(this.x - 100, this.y, 200, 60);
    c.strokeStyle = "#fff";
    c.strokeRect(this.x - 100, this.y, 200, 60);
    c.closePath();
  }
  counterLeft() {
    c.font = "40px Arial";
    c.fillStyle = "#000";
    c.fillText(`${this.pointsLeft}`, this.x - 70, this.y + 45);
	
  }
  counterRight() {
    c.font = "40px Arial";
    c.fillStyle = "#000";
    c.fillText(`${this.pointsRight}`, this.x + 30, this.y + 45);
  }
}

class Game {
  constructor() {
    this.initOne = true;
  }
  start() {
    document.body.style.cursor = "pointer";
    addEventListener("click", () => {
      if (this.initOne) {
        animate();
        document.body.style.cursor = "default";
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
    if (b.x + b.radius > canvas.width) {
      c.pointsLeft += 1;
      this.newGame();
    }
    if (b.x - b.radius <= 0) {
      c.pointsRight += 1;
      this.newGame();
    }
  }
}

var game = new Game();
game.start();

var counter = new Counter();
var balls = [new Ball()];

var players = [
  new Player(10, canvas.height / 2, "purple",87, 83),
  new Player(canvas.width - 10, canvas.height / 2, "green",38, 40)
];
players.forEach(p => p.init());
counter.draw();

balls.forEach(b => b.draw());

function animate() {
  for (let i = 0; i < balls.length; i++) {
    game.addPoint(balls[i], counter);
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  counter.update();
  document.getElementById('player1').value = counter.pointsLeft;
  players.forEach(p => p.update(players));
  balls.forEach(b => b.update(players));
}
