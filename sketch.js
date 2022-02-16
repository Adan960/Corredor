var gameState = "load";
var sport;
var fundo;
var botao_play,botao_c;
var fundo_load;
var boy;
var vilao,vilaoGroup;
var fundoImg,boyImg,vilaoImg,gameOveImg,botao_returnImg,fundo_loadImg,botao_playImg,botao_cImg,sportImg;
var pontuacao;
var gameOve;
var botao_return;
var delicia;
var boy2;
var burro;
var distance = 0;

function preload(){
 
  sportImg = loadImage("sport.png");
  botao_cImg = loadImage("Botãocreditos.png");
  botao_returnImg = loadImage("Botãoreturn.png");
  boyImg = loadAnimation("run (1).gif");
  fundoImg = loadImage("fundo.png");
  vilaoImg = loadImage("vilao.gif");
  gameOveImg = loadImage("Texto Gmd.png");
  fundo_loadImg = loadImage("Fundo_play.png");
  botao_playImg = loadImage("Botãoplay.png");
  delicia = loadSound("que delicia.mp3");
  burro = loadSound("burro.mp3")

}

function setup(){
  createCanvas(800,400);

  // Movendo o fundo
  fundo=createSprite(0,200);
  fundo.addImage(fundoImg);
  fundo.rotation = 90;
  fundo.scale = 1.32;

  boy = createSprite(150,200,20,20);
  boy.addAnimation("movinboy",boyImg);
  boy.scale = 0.25;

  gameOve = createSprite(400,200);
  gameOve.addImage(gameOveImg);

  vilaoGroup = new Group();

  botao_return = createSprite(400,300);
  botao_return.addImage(botao_returnImg);
  botao_return.scale = 0.5;

  fundo_load = createSprite(400,200);
  fundo_load.addImage(fundo_loadImg);

  botao_play = createSprite(400,210);
  botao_play.addImage(botao_playImg);
  botao_play.scale = 0.5;

  botao_c = createSprite(400,330);
  botao_c.addImage(botao_cImg);
  botao_c.scale = 0.5;

  sport = createSprite(110,250);
  sport.addImage(sportImg);
  sport.scale = 0.07;

  boy2 = createSprite(690,250);
  boy2.addAnimation("movinboy",boyImg);
  boy2.scale = 0.5;
  
}

function draw() {
  background(0);

  if(gameState == "load") {

    fundo_load.visible = true;
  }
  if(gameState == "play") {

    distance = distance + Math.round(getFrameRate()/50);
   fundo.velocityX = -(6 + 2*distance/150);

    criarVilao();
    boy.y = World.mouseY;
    fundo.velocityX = -3;
    fundo.visible = true;
    boy.visible = true;
    gameOve.visible = false;
    botao_return.visible = false;
    botao_play.visible = false;
    fundo_load.visible = false;
    boy2.visible = false;
    sport.visible = false;
    botao_c.visible = false;

    if(vilaoGroup.isTouching(boy)){
      gameState = "end";
      burro.play();
    }
  }

  if(gameState == "end"){

    score = 0;
    distance = 0;
    fundo.velocityX = 0;
    vilao.velocityX = 0;
    vilao.lifetime = -10;
    gameOve.visible = true;
    botao_return.visible = true;
    

    
    vilaoGroup.destroyEach();
  }

  if(mousePressedOver(botao_return)){
    gameState = "play"};

  if(mousePressedOver(botao_play)){
    gameState = "play"};

  if(fundo.x < 160){
    fundo.x = fundo.width/1;
  }
  if(mousePressedOver(sport)) {
    delicia.play();
  }

 


  edges = createEdgeSprites();
  boy.collide(edges);
 
  drawSprites();
}

function criarVilao(){

    if(frameCount%60 == 0){

        vilao = createSprite(850,random(330,70),20,20);
        vilao.velocityX = -(6 + 2*distance/150);
        vilao.addImage(vilaoImg);
        vilaoGroup.add(vilao);
        vilao.scale = 0.25;
        vilao.lifetime = 140;
    }
}