const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground, bkgnd_snd;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;
var score =0;

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  bkgnd_snd = loadSound ("background_music.mp3");
    
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  bkgnd_snd.setVolume(0.02);
  bkgnd_snd.play();
 

 /*if (!bkgnd_snd.isPlaying())
  {
  bkgnd_snd.play();
  bkgnd_snd.setVolume(0.02);
  } */ 

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  textSize(20);
  fill ("white");
  text("SCORE : "+score, 360,40);
  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true)
  {
       //remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;

   //Code to change the animation of a bunny when a collision with fruit and bunny is detected. 
   bunny.changeAnimation('eating');
   
   score +=100;
  }

  else if((collide(fruit,bunny,20)==false)&& (fruit.position.y<20))
{
  //Code to change the animation of a bunny when bunny does not get the fruit to eat.
  bunny.changeAnimation('crying');
  textSize(45);
  fill ("black");
  text ("SORRY! TRY AGAIN!", 10, 600);
      bkgnd_snd.stop();
    
}
    if (score == 100)
    {
      textSize(45);
      fill ("yellow");
      text ("CONGRATULATIONS!!", 10, 600);
        bkgnd_snd.stop();
     }
    
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;    
    }

  drawSprites();

}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

/*function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
} */

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

