class Game 
{
  constructor(){}

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    });

  }

  update(state)
  {
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 600);
    car1.scale = 0.1;
    car1.addImage(cr1Img);

    car2 = createSprite(300, 600);
    car2.scale = 0.1;
    car2.addImage(cr2Img);

    cars = [car1, car2];
  }

  play()
  {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined)
    {
      background("gray");
      image(tr1image, displayWidth/400, displayHeight/100-2900, displayWidth/2, displayHeight*5);

      var index = 0;

      //the starting point if the series of the cars......from the line of line of player cars.its the starting point of the series of player cars
      var x = 200;
      var y = 200;
      
      push();
      fill("white");
      text("steer left to start the game", 1100,720);
      pop();

      for(var plr in allPlayers)
      {
        index += 1;

        //space between cars.
        x = displayWidth - allPlayers[plr].distanceX;
        y = displayHeight - allPlayers[plr].distanceY;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index)
        {
          fill("yellow");
          triangle(cars[index-1].x, cars[index-1].y-50, cars[index-1].x-10, cars[index-1].y-57, cars[index-1].x+10, cars[index-1].y-57);
          //rect(x-30,y,60,60);          
          //cars[index-1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distanceY +=20
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null)
    {
        player.distanceY -=20
        player.update(); 
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null)
    {
      player.distanceX +=20
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null)
    {
        player.distanceX -=20
        player.update(); 
    }    
 
    if(player.distanceY > 3260)
    {
      gameState = 2;
      player.rank += 1; 
      Player.updateCarsAtEnd(player.rank);
    }
    
    drawSprites();
  }

  end()
{
  console.log("game over");
  text("you've won", 20,20);
  console.log(player.rank);
  window.alert("you're rank: " + player.rank);
}

}

