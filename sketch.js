var knife,fruits,fruitGroup,PLAY = 1,END = 0,swordGroup,monster,monsterGroup,FRand,MRand;
var gameState = PLAY,knifeImage,fruits1Image,fruits2Image,fruits3Image;
var fruits4Image,monster1Image,monster2Image,gameOver,gameOverImage,score;
var swordSound,gameOverSound,position1,position2;

function preload() {
  
  knifeImage = loadImage("sword.png");
  
  fruits1Image = loadImage("fruit1.png");
  fruits2Image = loadImage("fruit2.png");
  fruits3Image = loadImage("fruit3.png");
  fruits4Image = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");
  
  monster1Image = loadImage("alien1.png");
  monster2Image = loadImage("alien2.png");
  
  swordSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  
  createCanvas(500,500);
 
 knife = createSprite(250,440,10,50);
  knife.addImage(knifeImage);
  knife.scale = 0.5;
  
  fruitsGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
  
  knife.setCollider("circle",20,-20,40);
}

function draw() {

  background("lightblue");
  
  text("score:" + "" + score,400,50);
  
  if (gameState === PLAY){
    
    knife.x = mouseX;
    knife.y = mouseY;
    spawnFruits();
    spawnMonsters();
    if(fruitsGroup.isTouching(knife))
    {
      fruitsGroup.destroyEach();
      score = score + 1;
      swordSound.play();
    }
    if (monsterGroup.isTouching(knife))
    {
      gameState = END;
      gameOverSound.play();
    }
    drawSprites();
  }
  
  if (gameState === END){

    gameOver = createSprite(250,250,200,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.5;
    drawSprites();
    monsterGroup.destroyEach();
    fruitsGroup.destroyEach();
    knife.visible = false;
    score = 0;
  }
   
}

function spawnFruits(){
  
  if(frameCount % 90 === 0){
    
    var fruits = createSprite(400,Math.round(random(50,450)),20,40);
    fruits.velocityX = 4;
    
    var FRand = Math.round(random(1,4));
    switch(FRand){
      case 1: fruits.addImage(fruits1Image);
              break;
      case 2: fruits.addImage(fruits2Image);
               break;
      case 3: fruits.addImage(fruits3Image);
              break; 
      case 4: fruits.addImage(fruits4Image);
              break; 
      default: break;       
    }
    fruits.scale = 0.17;
    fruits.lifetime = 125;
    
    position1 = Math.round(random(1,2));
    if(position1 === 1){
      fruits.x = 400;
      fruits.velocityX = -(7+(score/4));
    }
    else
      {
    if(position1 === 2){
      fruits.x = 0;
      fruits.velocityX = (7+(score/4));
    }
      }
    fruitsGroup.add(fruits);
  }
}

function spawnMonsters(){
  
  if (frameCount % 80 === 0){
    
    var monsters = createSprite(10,Math.round(random(50,450)),20,40);
    monsters.velocityX = 5;
    
    var MRand = Math.round(random(1,2));
    switch(MRand){
      case 1: monsters.addImage(monster1Image);
             break;
      case 2: monsters.addImage(monster2Image);
             break;
     default: break;      
    }
    monsterGroup.add(monsters);
    
     position2 = Math.round(random(1,2));
    if(position2 === 1){
      monsters.x = 400;
      monsters.velocityX = -(7+(score/10));
    }
    else
      {
    if(position2 === 2){
      monsters.x = 0;
      monsters.velocityX = (5+(score/10));
    }
      }
    
  }
  }
