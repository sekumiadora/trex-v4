var score = 0;
var trex_running, trex_colidindo;
var cacto, gameover, gameoverImage,somPulo,somMorte,somChekpoint, reseta,resetaImage;
var grupo;
var grupo_de_cakitos, grupo_de_nuvens;

var PLAY = 1;
var FIM = 0;

var estadoJogo = PLAY;


var cloudImage;
var groundImage;
var cactoImage, cactoImage1, cactoImage2, cactoImage3, cactoImage4, cactoImage5, cactoImage6;

function preload() {
  trex_running = loadAnimation("imagi/trex1.png", "imagi/trex3.png", "imagi/trex4.png");
  //tex colidindo
  trex_colidindo = loadAnimation("imagi/trex_collided.png");

  gameoverImage = loadImage("imagi/gameOver.png");
  resetaImage = loadImage("imagi/restart.png");

  groundImage = loadImage("imagi/ground2.png");

  cloudImage = loadImage("imagi/cloud.png");
  cactoImage1 = loadImage("imagi/obstacle1.png");
  cactoImage2 = loadImage("imagi/obstacle2.png");
  cactoImage3 = loadImage("imagi/obstacle3.png");
  cactoImage4 = loadImage("imagi/obstacle4.png");
  cactoImage5 = loadImage("imagi/obstacle5.png");
  cactoImage6 = loadImage("imagi/obstacle6.png");
  somPulo = loadSound("asasarsfdfgjhkj/jump.mp3");
  somMorte = loadSound("asasarsfdfgjhkj/die.mp3");
  somChekpoint = loadSound("asasarsfdfgjhkj/checkpoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  edges = createEdgeSprites();

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  
  
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("trex correndo", trex_running);
  trex.addAnimation("trex_colidindo", trex_colidindo);
  trex.scale = 0.5;
  trex.setCollider("rectangle" ,0,0,60,80);
  //trex.debug = true;

  inviibleGround = createSprite(200, 190, 400, 10);
  inviibleGround.visible = false;

  grupo_de_cakitos = createGroup();
  grupo_de_nuvens = createGroup();


  gameover = createSprite(width/2,100);
  gameover.addImage( gameoverImage);
  gameover.visible = false;
  
  reseta = createSprite(width/2,170);
  reseta.addImage( resetaImage )
  reseta.visible = false;

}
function draw() {
  background("white");

  //o estadoJogo do jogo tem que estar como o nome da variável, e não texto, sendo assim, sem "":
  if (estadoJogo === PLAY) {

    ground.velocityX = -(3+4*score/50);

    score = score + Math.round(frameCount % 05 === 0);
    if(score>0 && score % 100 == 0 ){
      somChekpoint.play();

    }
   
    if (touches.lenght>0 || keyDown("space") && trex.y >= 161) {
      trex.velocityY = -13;
      trex.velocityX +=  0.02;
      somPulo.play();
      touches=[]
    }

    trex.velocityY = trex.velocityY + 0.8;
    
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //Gerar cactos e nuvens apenas em play
    spawnClouds();
    cakitos();

    //Momento em que estado do jogo Muda
    if (grupo_de_cakitos.isTouching(trex)) {
      //estadoJogo do jogo variável, sem aspas
      estadoJogo = FIM;
      reseta.visible = true;
      gameover.visible = true;
      somMorte.play();
    }

  } 
  else if (estadoJogo == FIM) {
    //se o estadoJogo for FIM para o chão
    ground.velocityX = 0;
    
    //parar os objetos do jogo
    grupo_de_cakitos.setVelocityXEach(0);
    grupo_de_nuvens.setVelocityXEach(0);
    trex.velocityY = 0
    trex.velocityX = 0
    

    grupo_de_cakitos.setLifetimeEach(-1);
    grupo_de_nuvens.setLifetimeEach(-1);
    
    trex.changeAnimation("trex_colidindo", trex_colidindo);
    if(mousePressedOver(reseta)){
      reset();
    }
  }


  textSize(20);
  text("score : " + score, width/2+200, height/4-100 );


  trex.collide(inviibleGround);
  //trex.collide(ground);
 
  drawSprites();
}
function spawnClouds() {
  if (frameCount % 90 == 0) {
    var cloud = createSprite(width, 100, 40, 10);
    cloud.velocityX = -(5+3*score/50);
    cloud.y = Math.round(random(10, 70));
    cloud.addImage("cloud", cloudImage);
    cloud.depth = trex.depth - 1;
    cloud.lifetime = 300;
    grupo_de_nuvens.add(cloud);
  }
}
function cakitos() {
  if (frameCount % 80 === 0) {
    cacto = createSprite(width, 164, 10, 40);
    cacto.velocityX = -(4+3*score/50);
    var cakitosA = Math.round(random(1, 6));


    switch (cakitosA) {
      case 1: cacto.addImage(cactoImage1);
        break;
      case 2: cacto.addImage(cactoImage2);
        break;
      case 3: cacto.addImage(cactoImage3);
        break;
      case 4: cacto.addImage(cactoImage4);
        break;
      case 5: cacto.addImage(cactoImage5);
        break;
      case 6: cacto.addImage(cactoImage6);
        break;
      default: break;
    }
    cacto.scale = 0.5;
    cacto.lifetime = 300;
    grupo_de_cakitos.add(cacto);
  }

}

//função para resetar o jogo
function reset(){
   reseta.visible = false;
   gameover.visible = false;
   gameover.depth  = gameover.depth  +1 ;
   estadoJogo = PLAY;
   grupo_de_cakitos.destroyEach();
   grupo_de_nuvens.destroyEach();

   trex.changeAnimation("trex correndo", trex_running);
}




