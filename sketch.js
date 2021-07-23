var playerPlane,playerPlaneImg;
var obstacle,obstacleImg,obstacleGrp;
var bg;
var bullet,bulletImg,bulletGrp;
var r;
var gameState = "play";
var score;
var gameOver,gameOverImg
function preload()
{
	playerPlaneImg = loadImage("simg.png")
	obstacleImg = loadImage("Meteor.png")
	bg = loadImage("backgroundImg.png");
	bulletImg = loadImage("bulletImg.png")
	gameOverImg = loadImage("gameOver.png")
}

function setup() {
	createCanvas(1200, 800);
	
	playerPlane = createSprite(600,700)
	playerPlane.addImage(playerPlaneImg)
	playerPlane.scale = 0.5

	obstacleGrp = new Group();
	bulletGrp = new Group();

	score = 0
}


function draw() {
  background(bg);
	textSize(20)
	fill("blue")
	text("Score: " + score,100,100);
  if(gameState === "play"){
  createObstacle();
  if(keyDown("space")){
	  bullet = createSprite(playerPlane.x,700);
	  bullet.addImage(bulletImg);
	  bullet.scale = 0.1;
	  bullet.velocityY = -4;
	  bullet.lifeTime = 800; 
	  bulletGrp.add(bullet);
  }	
  if(keyDown("Left")){
	  playerPlane.x = playerPlane.x-4;
  }
  if(keyDown("right")){
	  playerPlane.x = playerPlane.x+5;
  }
  if(obstacleGrp.isTouching(bulletGrp)){
	  score =+5
	  bulletGrp.destroyEach()
	  obstacleGrp.destroyEach()
  }
  if(playerPlane.isTouching(obstacleGrp)){
	  gameState = "end"
	  gameOver = createSprite(600,200)
	  gameOver.addImage(gameOverImg)
	  
	  
  }
  drawSprites();
}
else {
	obstacleGrp.setVelocityYEach(0);
	obstacleGrp.destroyEach();
	playerPlane.destroy()
	
	textSize(34);
	fill("red");
	text("Game Over!", 600,400)

}

}
function createObstacle(){
	r = Math.round(random(50,1150))
	if(frameCount%80 === 0){
		obstacle = createSprite(r,100);
		obstacle.addImage(obstacleImg);
		obstacle.scale = 0.25;
		obstacle.lifeTime = 800;
		obstacle.debug = true;
		obstacle.setCollider("circle",50,50,100)
		obstacleGrp.add(obstacle);
		obstacleGrp.setVelocityYEach(4);
	}
}


