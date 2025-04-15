.!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Roleta DStreet</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        background: #111;
        color: #fff;
        margin: 0;
        padding: 20px;
      }
      #logo {
        width: 150px;
        margin-bottom: 20px;
      }
      #roleta {
        margin: 0 auto;
        width: 300px;
        height: 300px;
        border: 10px solid #fff;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
      }
      .fatia {
        width: 50%;
        height: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: 0% 0%;
        background: #333;
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
        font-size: 14px;
      }
      #ponteiro {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 30px solid red;
        margin: 20px auto;
      }
      #girar {
        padding: 10px 20px;
        font-size: 18px;
        background-color: #28a745;
        border: none;
        color: white;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <img id="logo" src="https://i.imgur.com/Qga2j3v.png" alt="Logo DStreet" />
    <div id="ponteiro"></div>
    <div id="roleta"></div>
    <button id="girar">Girar</button>

    <script>
      const premios = [
        "10 camisetas",
        "Tente outra vez",
        "5 camisetas",
        "Tente outra vez",
        "3 camisetas",
        "Tente outra vez"
      ];

      const cores = ["#e74c3c", "#2ecc71", "#3498db", "#f39c12", "#9b59b6", "#1abc9c"];

      const roleta = document.getElementById("roleta");

      function desenharRoleta() {
        for (let i = 0; i < premios.length; i++) {
          const fatia = document.createElement("div");
          fatia.className = "fatia";
          fatia.style.backgroundColor = cores[i % cores.length];
          fatia.style.transform = `rotate(${(360 / premios.length) * i}deg) skewY(-60deg)`;
          fatia.innerHTML = `<div style="transform: skewY(60deg) rotate(${(360 / premios.length) / 2}deg); margin-top: 60px;">${premios[i]}</div>`;
          roleta.appendChild(fatia);
        }
      }

      let girando = false;

      document.getElementById("girar").addEventListener("click", () => {
        if (girando) return;
        girando = true;

        const anguloFinal = Math.floor(Math.random() * 360 + 1800); // 1800 = 5 voltas
        roleta.style.transition = "transform 5s ease-out";
        roleta.style.transform = `rotate(${anguloFinal}deg)`;

        setTimeout(() => {
          const angulo = anguloFinal % 360;
          const index = Math.floor((360 - angulo + 30) % 360 / (360 / premios.length));
          alert(`Resultado: ${premios[index]}`);
          girando = false;
        }, 5200);
      });

      desenharRoleta();
    </script>
  </body>
</html>
