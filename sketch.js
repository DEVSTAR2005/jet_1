
/*First therse will be a log type down the Player Name and a start
button. When started,there will be an option to select the aircraft
from the given.when space key is pressed,the backGroundImg will 
change to that of the sky. 

                                                                */
var playerJet
var Enemy

var mirage
var boom
var eagle
var war

var vr = 0


var left = -135
var right = -45

var gameState = 0

var playerCount = 0

var player
var allPlayers = []

var Jet
var op

var form
var database

var game
var position

var bullet
var bullet1


function preload()
{
   mirage = loadImage("anime/Picture4.png")
   boom = loadImage("anime/savannhaBoom.gif")
   eagle = loadImage("anime/Picture2.gif")
   war = loadImage("anime/wae.jpg")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
  console.log(displayHeight)

playerJet = createSprite(displayWidth/2, displayHeight-150, 20, 20);
playerJet.addImage("imgg",mirage)
playerJet.scale = 0.099
playerJet.rotation=-90
Enemy = createSprite(displayWidth/2,displayHeight-650,20,20)
Enemy.addImage("img",eagle)
Enemy.scale = 0.2
Enemy.rotation=180


bullet = createSprite(300,500,10,10)
bullet1 = createSprite(200,200,10,10)


database = firebase.database();


player=new Player()

form = new Form()

form.display();

game = new Game()

 
                   
player.getPlayerCount();
console.log(playerCount)

}

function draw() 
{ 
background(war);

game.getState()




  if(playerCount == 2)
  {
    game.update(1)
   
  }

  
  

  if(gameState == 1)
     {
      drawSprites();
      Player.getPlayerInfo();
     // console.log(allPlayers)
      if(player.index == 1)
      {
         playerJet.y = displayHeight-200
         Enemy.y = 200
         if(vr == 0)
         {

         vr = 1
         Jet = playerJet
         op = Enemy
        }
         bullet.y = Jet.y
         bullet1.y = op.y
         bullet.x = Jet.x
         bullet1.x = op.x


         player.bullet = bullet.y
         //player.update()
      //   op.x = allPlayers["player2"].xp
      // console.log(allPlayers[player2].xp)
         
      }
      else 
      if(player.index == 2)
      {
         Enemy.y = displayHeight-200
         playerJet.y = 200
         if(vr == 0)
         {
         Jet = Enemy 
         op = playerJet
         vr = 1
         }
         bullet1.y = Jet.y
         bullet.y = op.y
         bullet1.x = Jet.x
         bullet.x = op.x

         player.bullet = bullet1.y
         //player.update()
        // op.x = allPlayers["player1"].xp

         Enemy.rotation = 0
         playerJet.rotation = 90
      // console.log(allPlayers[player1].xp) 
      }

      var index = 1
if(playerCount == 2)
{
      for(var plr in allPlayers)
      {
        
        if(player.index!==index)
        {
          op.x=allPlayers[plr].xp
          console.log(op.x)
        }
        index++
      }

}

 
     if(keyDown("right"))
     {
      
   
     Jet.setVelocity(2,0)
       player.xp = Jet.x
       player.update()

         
      
      
     }
      //=====================
     if(keyDown("left"))
     {
      Jet.setVelocity(-2,0) 
      player.xp = Jet.x
      player.update()
     
     }
     if(keyDown("space"))
     {
       bullet.writePosition(0,-3)
     }
    
    }
    
    

}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}
