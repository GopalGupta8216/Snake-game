const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box =32;
ctx.fillStyle = "grey";
ctx.fillRect(0,0,box,19*box);
ctx.fillRect(0,0,19*box,3*box);
ctx.fillRect(17*box,0,2*box,19*box);
ctx.fillRect(0,17*box,19*box,2*box);


let snake = [];
snake[0] ={
    x : 9*box,
    y : 10*box
   
} 


let food = {
    x : Math.floor(Math.random()*16+2)*box,
    y : Math.floor(Math.random()*14+4)*box,
}

let score = 0;

let d;
document.addEventListener("keydown",direction);

function direction(event){
  
    if(event.keyCode==37 && d!="RIGHT"){
        d="LEFT";
    }else if(event.keyCode==38 && d!="DOWN"){
        d="UP";
    }else if(event.keyCode==39 && d!="LEFT"){
        d="RIGHT";
    }else if(event.keyCode==40 && d!="UP"){
        d="DOWN";
    }  console.log(d);
}
//check collision function
function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y== array[i].y ){
            return true;
        }
    }return false;
}

function draw(){
   
    

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i==0)? "green":"blue";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x,food.y,0.5*box,0*Math.PI,2*Math.PI);
    ctx.stroke();
    ctx.fill();
    
 let snakeX =snake[0].x;
 let snakeY =snake[0].y;

 console.log(snakeX);
  if(d="LEFT") snakeX-=box;
 
  if(d="UP") snakeY-=box;
  if(d="RIGHT") snakeX+=box;
  if(d="DOWN") snakeY+=box;
  console.log(snakeX);
  //if the snake eats the food
  if(snakeX==food.x && snakeY == food.y){
      score++
      food = {
        x : Math.floor(Math.random()*17+1)*box,
        y : Math.floor(Math.random()*14+3)*box,
    }
}else{  
        //remove the tail
        snake.pop();
    }
  
  // ADD NEW HEAD


let newHead ={
    x : snakeX,
    y : snakeY
} 
  // game over 

  if(snakeX < box || snakeX > 17*box || snakeY < 3*box 
    || snakeY > 17*box || collision(newHead,snake)){
    clearInterval(game); 
    console.log(snakeX);
}

snake.unshift(newHead)


   ctx.fillStyle = "black";
   ctx.font = "45px Changa one";
   ctx.fillText(score,2*box,1.6*box);
  
} 

let game = setInterval(draw,100);
