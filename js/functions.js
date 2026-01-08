let time = 500;
let timer = null;
let direction = null;

const field = document.getElementById("field");
const btn_top = document.getElementById("btn_top");
const btn_left = document.getElementById("btn_left");
const btn_right = document.getElementById("btn_right");
const btn_botton = document.getElementById("btn_botton");
const btn_start = document.getElementById("btn_start");
const btn_end = document.getElementById("btn_end");
const points = document.getElementById("points");
const nome_jogo = document.getElementById("nome_jogo");

btn_top.onclick = () => { direction = 38 };
btn_left.onclick = () => { direction = 37 };
btn_right.onclick = () => { direction = 39 };
btn_botton.onclick = () => { direction = 40 };
btn_start.onclick = startGame;
btn_end.onclick = endGame;


document.body.onkeydown = function (e) {
  if(e.which >= 37 && e.which <=40){ // Teclas direcionais
    direction = e.which;
  } else if(e.which == 32){ // Barra de espaço
    startGame();
  } else if(e.which == 19){ // Botão de pause
    endGame();
  }
};

// (Re)Inicia o timer do jogo e chama a função start()
function startGame(){
  if(timer != null) endGame();
  Array.from(field.children).forEach(function(p){p.remove();});
  time = 500;
  timer = setInterval(loop, time);
  start(); 
}

function endGame(){
  clearInterval(timer);
  alert("Game Over");
  timer = null;
  return true;
}

function newPiece(left, top){
    piece = document.createElement("div");
    piece.className = "piece";
    piece.style.left = left+"px";
    piece.style.top = top+"px";
    field.appendChild(piece);  
    return piece;
}

function colision(objA, objB) {
  const aLeft = objA.offsetLeft;
  const aRight = aLeft + objA.offsetWidth;
  const aTop = objA.offsetTop;
  const aBottom = aTop + objA.offsetHeight;

  const bLeft = objB.offsetLeft;
  const bRight = bLeft + objB.offsetWidth;
  const bTop = objB.offsetTop;
  const bBottom = bTop + objB.offsetHeight;

  return !(
    aRight < bLeft ||
    aLeft > bRight ||
    aBottom < bTop ||
    aTop > bBottom
  );

}


function getPosition(obj, direction){  
  return parseInt(obj.style[direction])
}
