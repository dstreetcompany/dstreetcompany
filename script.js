const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const trackSound = new Audio("track.mp3"); // som de roleta
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");

const sectors = [
  "Tente outra vez", "3 camisetas", "Tente outra vez",
  "5 camisetas", "Tente outra vez", "10 camisetas"
];

let spinning = false;
let spinCount = 0;

function playTrackSound(duration) {
  trackSound.loop = true;
  trackSound.play();
  setTimeout(() => {
    trackSound.pause();
    trackSound.currentTime = 0;
  }, duration);
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  spinCount++;

  let duration = 5000;
  let anglePerSector = 360 / sectors.length;
  let randomSectorIndex;

  // Garante 1 prêmio real a cada 100 giros
  if (spinCount % 100 === 0) {
    const prizeIndexes = [1, 3, 5];
    randomSectorIndex = prizeIndexes[Math.floor(Math.random() * prizeIndexes.length)];
  } else {
    const loseIndexes = [0, 2, 4];
    randomSectorIndex = loseIndexes[Math.floor(Math.random() * loseIndexes.length)];
  }

  let targetAngle = 360 * 10 + (sectors.length - randomSectorIndex) * anglePerSector + anglePerSector / 2;
  playTrackSound(duration);

  wheel.style.transition = `transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
  wheel.style.transform = `rotate(${targetAngle}deg)`;

  setTimeout(() => {
    const resultText = sectors[randomSectorIndex];
    result.innerText = resultText;

    if (resultText.includes("camisetas")) {
      winSound.play();
    } else {
      loseSound.play();
    }

    spinning = false;
  }, duration + 100);
}

