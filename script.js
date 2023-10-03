const vezJogador = document.querySelector(".vezJogador");

let selecionado;
let jogador = "X";

let pocicoes = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selecionado = [];

  vezJogador.innerHTML = `RODADA JOGADOR: ${jogador}`;

  document.querySelectorAll(".jogo button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = jogador;
  e.target.removeEventListener("click", newMove);
  selecionado[index] = jogador;

  setTimeout(() => {
    check();
  }, [100]);

  jogador = jogador === "X" ? "O" : "X";
  vezJogador.innerHTML = `RODADA JOGADOR: ${jogador}`;
}

function check() {
  let ultimaJogada = jogador === "X" ? "O" : "X";

  const items = selecionado
    .map((item, i) => [item, i])
    .filter((item) => item[0] === ultimaJogada)
    .map((item) => item[1]);

  for (pos of pocicoes) {
    if (pos.every((item) => items.includes(item))) {
      alert(`${ultimaJogada} VENCEU!`);
      init();
      return;
    }
  }

  if (selecionado.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }
}