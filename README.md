!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Roleta DStreet</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #111;
      color: #fff;
      padding: 20px;
    }
    #logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
    #wheel {
      margin: 20px auto;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      border: 10px solid #fff;
      position: relative;
      overflow: hidden;
      transition: transform 4s ease-out;
    }
    .segment {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      background-color: #333;
      color: #fff;
      padding: 5px;
      font-size: 12px;
    }
    #spinBtn {
      padding: 10px 20px;
      font-size: 18px;
      background: #00cc66;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      margin-top: 20px;
    }
    .addGiroBtn {
      margin: 5px;
      padding: 8px 16px;
      font-size: 14px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    #message {
      margin-top: 20px;
      font-size: 20px;
    }
    #girosRestantes {
      margin-top: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <!-- Logo da DSTREET COMPANY -->
  <img id=\"logo\" src=\"logo.png\" alt=\"DStreet Logo\">

  <h1>Roleta da Sorte - DStreet</h1>
  
  <!-- Botões para liberação manual de giros -->
  <div>
    <button class="addGiroBtn" onclick="adicionarGiros(1)">R$5 - 1 Giro</button>
    <button class="addGiroBtn" onclick="adicionarGiros(3)">R$10 - 3 Giros</button>
    <button class="addGiroBtn" onclick="adicionarGiros(4)">R$20 - 4 Giros</button>
  </div>

  <!-- Roleta e controles -->
  <div id="wheel"></div>
  <button id="spinBtn">GIRAR</button>
  <div id="girosRestantes"></div>
  <div id="message"></div>

  <script>
    // Lista de prêmios
    const premios = [
      'PARABÉNS VOCÊ GANHOU 10 CAMISETAS!',
      'TENTE OUTRA VEZ!',
      'PARABÉNS VOCÊ GANHOU 5 CAMISETAS!',
      'TENTE OUTRA VEZ!',
      'PARABÉNS VOCÊ GANHOU 3 CAMISETAS!',
      'TENTE OUTRA VEZ!'
    ];

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const message = document.getElementById('message');
    const girosRestantesDiv = document.getElementById('girosRestantes');

    // Variáveis de controle
    let girosRestantes = 0;
    let totalGiros = 0; // Contador global de giros

    // Desenha a roleta com os segmentos
    function desenharRoleta() {
      const total = premios.length;
      for (let i = 0; i < total; i++) {
        const el = document.createElement('div');
        el.className = 'segment';
        el.style.transform = `rotate(${(360 / total) * i}deg) skewY(-60deg)`;
        el.innerHTML = premios[i];
        wheel.appendChild(el);
      }
    }

    // Atualiza a exibição dos giros restantes
    function atualizarGiros() {
      girosRestantesDiv.innerText = `Giros restantes: ${girosRestantes}`;
    }

    // Função para girar a roleta
    function girarRoleta() {
      if (girosRestantes <= 0) {
        message.innerText = 'Você não tem mais giros. Faça um novo pagamento!';
        return;
      }
      spinBtn.disabled = true;
      totalGiros++;  // Incrementa o contador de giros

      const total = premios.length;
      let premioIndex;

      // Se não for o 100º giro, força o resultado "TENTE OUTRA VEZ!"
      if (totalGiros % 100 !== 0) {
        // Escolhemos o índice 1, que contém "TENTE OUTRA VEZ!"
        premioIndex = 1;
      } else {
        // No giro 100 (ou múltiplo de 100) sorteia aleatoriamente entre os prêmios reais (índices 0, 2 e 4)
        const winningIndices = [0, 2, 4];
        premioIndex = winningIndices[Math.floor(Math.random() * winningIndices.length)];
      }

      // Calcula o ângulo de rotação final para que o prêmio fique no topo
      const anguloFinal = (360 / total) * premioIndex + (360 * 5);
      wheel.style.transform = `rotate(-${anguloFinal}deg)`;

      // Após a animação de 4 segundos, exibe o resultado e atualiza os giros restantes
      setTimeout(() => {
        message.innerText = `${premios[premioIndex]} (Giro ${totalGiros})`;
        girosRestantes--;
        atualizarGiros();
        spinBtn.disabled = false;
      }, 4000);
    }

    // Função para adicionar giros manualmente (simulando o pagamento)
    function adicionarGiros(qtd) {
      girosRestantes += qtd;
      atualizarGiros();
    }

    spinBtn.addEventListener('click', girarRoleta);
    desenharRoleta();
    atualizarGiros();
  </script>
</body>
</html>

