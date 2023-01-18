/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  natalia_running =   loadAnimation("assets/natalia.png");
  natalia_collided = loadAnimation("assets/natalia.png");
  jungleImage = loadImage("assets/selva.webp");
  shrub1 = loadImage("assets/stone.png");
  shrub2 = loadImage("assets/shrub3.png");
  shrub3 = loadImage("assets/plat.png");
  obstacle1 = loadImage("assets/coco.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  mariposa1 = loadImage("assets/mariposa 1.png");
  mariposa2 = loadImage("assets/mariposa 2.png");
  mariposa3 = loadImage("assets/mariposa 3.png");
  mariposa4 = loadImage("assets/mariposa 4.png");
}

function setup() {
  createCanvas(800, 400);

  jungle= createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.4
  jungle.x = width /2;

  natalia = createSprite(50,200,20,50);
  natalia.addAnimation("running", natalia_running);
  natalia.addAnimation("collided", natalia_collided);
  natalia.scale = 0.20;
  natalia.setCollider("circle",0,0,300)


 
  


  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  var rand=Math.round(random(1,900))
  console.log(rand)

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  mariposaGroup= new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  natalia.x=camera.position.x-270;
   
  if (gameState===PLAY){

    jungle.velocityX=-3

    if(jungle.x<100)
    {
       jungle.x=400
    }
   console.log(natalia.y)
    if(keyDown("space")&& natalia.y>270) {
      jumpSound.play();
      natalia.velocityY = -16;
    }
  
    natalia.velocityY = natalia.velocityY + 0.8
    spawnShrubs();
    spawnObsacles();
  spawnmariposa();
  spawnmariposa2();
 

    natalia.collide(invisibleGround);
    //escribe la condición para que gamestate finalice.
    if(natalia.isTouching(obstaclesGroup)){
      collidedSound.play();
      gameState = END;
    }

    if(natalia.isTouching(mariposaGroup)){
    
      score =score + 1
    }
 
    //escribe la condición para que score aumente
    if(keyDown("space")){
      score =score + 0
      shrubsGroup.destroyEach();
    
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    natalia.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);
    mariposaGroup.setVelocityXEach(0);
   

    natalia.changeAnimation("collided",natalia_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);

    
    if(mousePressedOver(restart)) {
        reset();
    }
  }
  else if (gameState === WIN) {
    jungle.velocityX = 0;
    natalia.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    natalia.changeAnimation("collided",natalia_collided);

    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
   
  }
  
  
  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Puntuación: "+ score, camera.position.x,50);
  
  if(score >= 100){
    natalia.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("¡Felicidades! ¡Ganaste el juego! ", 70,200);
    gameState = WIN;
  }
}

function spawnmariposa(){

  if (frameCount % 300 === 0) {
  var mariposa = createSprite( 300,200,30,30 );
  mariposa.addImage(mariposa1)
   mariposa.velocityX = -3 
   mariposa.x=Math.round(random(100,320));
   mariposa.scale=0.1;
   mariposaGroup.add(mariposa);
   mariposaGroup.lifetime = 400;
   mariposa.setCollider("rectangle",0,0,200,200)
   }
}





function spawnmariposa2(){

  if (frameCount % 500 === 0) {
  var mariposa2 = createSprite( 300,200,10,30 );
mariposa2.addImage(mariposa4);
   mariposa2.velocityX = -3 
   mariposa2.x=Math.round(random(330,520));
   mariposa2.scale=0.1;
   mariposaGroup.add(mariposa2);
   mariposaGroup.lifetime = 400;
   }
}

function spawnmariposa3(){

  if (frameCount % 700 === 0) {
  var mariposa3 = createSprite( 300,200,10,30 );
mariposa3.addImage(mariposa3);
   mariposa3.velocityX = -3 
   mariposa3.x=Math.round(random(1,100));
   mariposa3.scale=0.1;
   mariposaGroup.add(mariposa3);
   mariposaGroup.lifetime = 400;
   }
}




function spawnShrubs() {
 
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,10,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.05;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
       
    shrub.scale = 0.10;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}


function spawnObsacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.25;      

    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  natalia.visible = true;
  //cambia la animación del canguro
  //destruye el grupo arbustos y obstáculos
  obstacle1.visible=true;
  shrubsGroup.visible=true; 
  score = 0;
}
