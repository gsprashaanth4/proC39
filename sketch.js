var canvas
var backgroundImg;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1;
var car2;
var car3;
var car4;

var cars;

var tr1image;

var rank;

function preload()
{
  backgroundImg = loadImage("../roadImg.jpg");
  tr1image = loadImage("../rt1.jpg");
  cr1Img = loadImage("../car11.png");
  cr2Img = loadImage("../car22.png");
  cr3Img = loadImage("../car33.png");
  cr4Img = loadImage("../car44.png");
}

function setup()
{
  canvas = createCanvas(displayWidth/2, displayHeight-200);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw()
{
  background(backgroundImg);

  if(playerCount === 2)
  {
    game.update(1);
  }

  if(gameState === 1)
  {
    clear();
    game.play();
  }

 if(gameState === 2)
 {
   game.end();
 }

 if(playerCount === 0)
 {
   game.update(0);
 }

}
