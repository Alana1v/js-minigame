
let car;
let obstacles = [];
let speed = 20;
let score = 0;

nome_jogo.innerText = "Corrida";


function start() {

  Array.from(field.children).forEach(e => e.remove());

  // cria o carro do jogador
car = newPiece(80, 340); 
car.id = "car";
car.style.height = "40px"; 


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
  updateScore();
}

// ===== MOVIMENTO DO CARRO =====
function moveCar() {
 
  let left = getPosition(car, "left");

  if (direction === 37) { // esquerda
    left -= 20;
  }

  if (direction === 39) { // direita
    left += 20;
  }

  car.style.left = left + "px";

  // colisão com as paredes
  if (left < 0 || left > 180) {
    endGame();
  }
}


//  OBSTÁCULOS
function createObstacle() {
  if (Math.random() < 0.3) {
    let x = Math.floor(Math.random() * 10) * 20;
    let obs = newPiece(x, 0);
    obs.classList.add("obstacle");
    obstacles.push(obs);
  }
}

//MOVE OBSTÁCULOS 
function moveObstacles() {
  obstacles.forEach((obs, index) => {
    obs.style.top = (getPosition(obs, "top") + speed) + "px";

    // remove se sair da tela
    if (getPosition(obs, "top") > 400) {
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

// PONTUAÇÃO 
function updateScore() {
  score++;
  points.innerText = score;

  // aumenta a dificuldade
  if (score % 200 === 0 && speed < 60) {
    speed += 5;
  }
}
