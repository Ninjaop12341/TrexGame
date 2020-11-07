var trex,ground,trexrun,trexstop,invisiground,groundimage,obstacles
var score=0,PLAY=1,END=0;

var gamestate=PLAY;

var cloudimage,cloudsGroup,obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var gameover,restart,gameoverimg,restartimg;

function preload() {
  
  trexrun=loadAnimation("trex3.png","trex4.png");

  trexstop= loadAnimation("trex_collided.png");
  
  groundimage=loadImage("ground2.png");
  
  cloudimage=loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  
  obstacle2=loadImage("obstacle2.png");
  
  obstacle3=loadImage("obstacle3.png");
  
  obstacle4=loadImage("obstacle4.png");
  
  obstacle5=loadImage("obstacle5.png");
  
  obstacle6=loadImage("obstacle6.png");
  
  gameoverimg=loadImage("gameOver.png");
  
  restartimg=loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(50,180,2,3);
  trex.addAnimation("running",trexrun);
  trex.addAnimation("collided",trexstop);
  
  
  trex.scale=0.5;
   
  ground=createSprite(200,185,600,2);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  ground.addImage("ground",groundimage);
  
  invisiground=createSprite(200,190,400,2);
  invisiground.visible=false;
  
  cloudsGroup=new Group();
  obstacleGroup=new Group();
  
  gameover=createSprite(300,100,2,2);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
  
  restart=createSprite(300,150,2,2);
  restart.addImage(restartimg);
  restart.scale=0.5;
  restart.visible=false;
}

function draw() {
  background(253);
  
  text("score: "+score,500,50 );
  trex.setCollider("rectangle");
  
  if (gamestate===PLAY){
    
    score= score+ Math.round (getFrameRate() / 60);
    
      if (score%400==0) {
        ground.velocityX=-(5 + 3*score/100);
        obstacleGroup.setVelocityXEach(-(5 + 3*score/100));
      } 
    
      if (keyDown("space") && trex.y>=165){
        jump();
      }
        
    trex.velocityY+=0.8;
  
    if (ground.x < 0){
      ground.x=ground.width/2;
    }
    
    trex.collide(invisiground);
    
    spawnClouds();
    spawnObstacles();
    
    if (obstacleGroup.isTouching(trex)){
      gamestate=END;
    }
  }
  
  else if (gamestate===END) {
    
    gameover.visible=true;
    
    restart.visible=true;
    
    ground.velocityX=0;
    
    trex.velocityY=0;
    
    obstacleGroup.setVelocityXEach(0);
    
    cloudsGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trexstop);
    
    obstacleGroup.setLifetimeEach(-1);
    
    cloudsGroup.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)){
      reset();
    }
  }
  drawSprites();
}
function spawnClouds(){
  if (  frameCount  %  60  ===  0){
    var cloud=createSprite(600,5,1,1);
    cloud.velocityX=-4;
    cloud.y=Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale=0.5;
    cloud.lifetime=154;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }  
}

function spawnObstacles(){
  if (frameCount % 80 ===0){
    var obstacle=createSprite(600,170,5,5);
    obstacle.velocityX=-5;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2:obstacle.addImage(obstacle2);
        break;
      case 3:obstacle.addImage(obstacle3);
        break;
      case 4:obstacle.addImage(obstacle4);
        break;
      case 5:obstacle.addImage(obstacle5);
        break;
      case 6:obstacle.addImage(obstacle6);
        break;
        default:break;  
    }
    obstacle.scale=0.5;
    obstacle.lifetime=158
    obstacleGroup.add(obstacle);
  }
  
}
function jump(){
  trex.velocityY=-13;
  
}

function reset(){
  gamestate=PLAY;
  ground.velocityX=-5;
  gameover.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trexrun);
  
}

