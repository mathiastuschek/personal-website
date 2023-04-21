let pressed = false;
let movingDown = true;
let exploded = false;
let rocketMovingDown = true;
let sec = 1000;
let initialSec = 1000;
let shootingInterval = 2000;

let background = new Image();
background.src = "background.png"


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width  = 1024; //magic number because of slow loading of background -> background.width 2 slow, sometimes 0
canvas.height = 600;  //magic number because of slow loading of background -> background.height 2 slow, sometimes 0



function timer() {
  setInterval(function() {
    sec--;
  }, 1000);
}

let rocket = {
    x: 10,
    y: canvas.height/2-30,
    width: 100,
    height: 50,
    src: "rocket.png"
}
let rocketSpaceX = [rocket.x-50, rocket.x+50];
let rocketSpaceY =  [rocket.y-30, rocket.y+30];

let ufo = {
  x: canvas.width-200,
  y: canvas.height/2-50,
  width: 200,
  height: 150,
  src: "ufo.png"
}

let explosion = {
  x: rocket.x,
  y: rocket.y,
  width: 100,
  height: 100,
  src: "explosion.png"
}


let projectiles = [];


document.body.addEventListener("keydown", function (event) {
  if(event.key == " "){
    pressed = true;
  }
});

function loadImages(){
  rocket.img = new Image();
  rocket.img.src = rocket.src;

  ufo.img = new Image();
  ufo.img.src = ufo.src;

}

function draw(){
    ctx.drawImage(background, 0,0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
    ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);

    projectiles.forEach(function(projectiles){
      ctx.drawImage(projectiles.img, projectiles.x, projectiles.y, projectiles.width, projectiles.height);
    });

    if(projectiles.length > 0){
      projectiles.forEach(function(projectiles){
        if(projectiles.x > rocketSpaceX[0] && projectiles.x < rocketSpaceX[1] && projectiles.y > rocketSpaceY[0] && projectiles.y < rocketSpaceY[1]){

          explosion.img = new Image();
          explosion.img.src = explosion.src;
          ctx.drawImage(explosion.img, explosion.x, explosion.y, explosion.width, explosion.height);
          exploded = true;
          requestAnimationFrame(draw);
        }
      });
    }
    if(exploded == false){
        requestAnimationFrame(draw);
    }
}

let run = setInterval(ufoShoots, shootingInterval);
function startGame(){

    timer();
    loadImages();
    setInterval(update, 1000/25);
    run = setInterval(ufoShoots, shootingInterval);
    draw();
    
    //GAMEOVER STARTS HERE

}


function ufoShoots(){
  clearInterval(run);

  run = setInterval(ufoShoots, shootingInterval);

  let projectile = {
    x: ufo.x,
    y: ufo.y,
    width: 50,
    height: 30,
    src: "projectile.png",
  };
  projectile.img = new Image()
  projectile.img.src = projectile.src;
  projectiles.push(projectile);

}

function update(){

  if(sec == initialSec-10){
    shootingInterval = shootingInterval - 200;
    initialSec = initialSec - 10;
  }

  console.log(sec);

  if(rocket.y > 550){
    rocketMovingDown = false;
  }
  else if(rocket.y < 20){
    rocketMovingDown = true;
  }


  if(rocketMovingDown){
    rocket.y += 10;
  }
  else{
    rocket.y -= 10;
  }

  if(pressed && rocketMovingDown){
    rocketMovingDown = false;
    pressed = false;
  }
  else if(pressed && !rocketMovingDown){
    rocketMovingDown = true;
    pressed = false;
  }






  rocketSpaceY = [rocket.y-30, rocket.y+30];
  rocketSpaceX = [rocket.x-50, rocket.x+50];


  if(projectiles.length > 0){
    
    projectiles.forEach(function(projectiles){
      projectiles.x -= 10;

    });
  }

  if(movingDown){
    if(ufo.y < 500){
      ufo.y += 10;
    }
    else{
      movingDown = false;
    }
  }
  else{
    ufo.y -= 10;
    if(ufo.y < 20){
      movingDown = true;
    }
  }

  explosion.x = rocket.x;
  explosion.y = rocket.y-30;

}
