const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const girarBtn = document.getElementById("girarBtn");
const resultado = document.getElementById("resultado");

const somGiro = document.getElementById("somGiro");
const somVitoria = document.getElementById("somVitoria");
const somPerda = document.getElementById("somPerda");

const premios = [
  "10 CAMISETAS", "TENTE NOVAMENTE",
  "5 CAMISETAS", "TENTE NOVAMENTE",
  "3 CAMISETAS", "TENTE NOVAMENTE"
];

const cores = ["#222", "#444", "#222", "#444", "#222", "#444"];
const slice = 360 / premios.length;

let anguloAtual = 0;
let girando = false;

function desenharRoleta() {
  for (let i = 0; i < premios.length; i++) {
    const inicio = (i * slice) * Math.PI / 180;
    const fim = ((i + 1) * slice) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 240, inicio, fim);
    ctx.fillStyle = cores[i];
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(inicio + (slice * Math.PI / 360));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.fillText(premios[i], 230, 10);
    ctx.restore();
  }
}

function girarRoleta() {
  if (girando) return;
  girando = true;
  resultado.textContent = "";
  somGiro.play();

  const sorteio = Math.floor(Math.random() * premios.length);
  const rotacoes = 5 * 360;
  const anguloFinal = rotacoes + (sorteio * slice) + slice / 2;

  let tempo = 0;
  const intervalo = setInterval(() => {
    anguloAtual += 10;
    if (anguloAtual >= anguloFinal) {
      clearInterval(intervalo);
      anguloAtual = anguloFinal % 360;
      mostrarResultado(sorteio);
      girando = false;
    }
    desenharAnimacao(anguloAtual);
  }, 20);
}

function desenharAnimacao(angulo) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(250, 250);
  ctx.rotate(angulo * Math.PI / 180);
  ctx.translate(-250, -250);
  desenharRoleta();
  ctx.restore();
}

function mostrarResultado(i) {
  const texto = premios[i];
  resultado.textContent = texto;
  if (texto.includes("CAMISETAS")) {
    somVitoria.play();
  } else {
    somPerda.play();
  }
}

desenharRoleta();
girarBtn.addEventListener("click", girarRoleta);

