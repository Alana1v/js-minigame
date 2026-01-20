// FAIXA DA PISTA
let car;
let obstacles = [];
let speed = 20;
let score = 0;

const lanes = [0,60,120,180];
let currentLane = 1;
nome_jogo.innerText = "Corrida";


function start() {

  Array.from(field.children).forEach(e => e.remove());

  // cria o carro do jogador
car = newPiece(lanes[currentLane], 340); 
car.id = "car";
car.style.height = "50px"; 


  obstacles = [];
  score = 0;
  points.innerText = score;

  direction = null;
}

// LOOP PRINCIPAL (chamada pelo functions.js) =====
function loop() {
  moveCar();
  createObstacle();
  moveObstacles();
  checkCollision();
 
}

// ===== MOVIMENTO DO CARRO =====
function moveCar() {
 
  if (direction === 37 && currentLane > 0){
    currentLane --;
    direction = null;
  }
  if (direction === 39 && currentLane < lanes.length-1){
    currentLane ++;
    direction = null;
  }
car.style.left = lanes[currentLane] + "px";

  // colisão com as paredes
  let left = getPosition (car, "left")
  if (left < 0 || left > 180) {

    endGame();
  }
}


//  OBSTÁCULOS
function createObstacle() {
  if (Math.random() < 0.3) {
    let lane = Math.floor(Math.random() * lanes.length);
    let obs = newPiece(lanes[lane], 0);
    obs.classList.add("obstacle");
    obs.pontuado = false;
    obstacles.push(obs);
  }
}

// MOVER OBSTÁCULOS
function moveObstacles() {
  obstacles.forEach((obs, index) => {
    let top = getPosition(obs,"top");
  obs.style.top = (top + speed) + "px"

// PONTUAÇÃO POR DESVIO
if(!obs.pontuado && top > getPosition (car, "top")) {
  score += 10;
  points.innerText = score;
  obs.pontuado = true;

//AUMENTAR DIFICULDADE
if (score % 200 === 0 && speed < 60)
{
  speed += 5;
}
}
//REMOVE SE SAIR DA TELA
if (top > 400) {
  obs.remove();
  obstacles.splice(index, 1); 
}
});
}

// COLISÃO 
function checkCollision() {
  obstacles.forEach(obs => {
    if (colision(car, obs)) {
      endGame();
    }
  });

}