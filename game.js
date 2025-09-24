const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

let hearts = [];
let score = 0;
const targetScore = 20;

function createHeart() {
  const x = Math.random() * (canvas.width - 30) + 15;
  hearts.push({x, y: canvas.height + 20, speed: Math.random()*2 + 1});
}

function drawHeart(x, y) {
  ctx.fillStyle = '#ff477e';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 15, y - 20, x - 40, y + 10, x, y + 30);
  ctx.bezierCurveTo(x + 40, y + 10, x + 15, y - 20, x, y);
  ctx.fill();
}

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (Math.random() < 0.02) createHeart();
  hearts.forEach(h => {
    h.y -= h.speed;
    drawHeart(h.x, h.y);
  });
  hearts = hearts.filter(h => h.y > -30);
  requestAnimationFrame(update);
}

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  hearts.forEach((h, i) => {
    const dx = mx - h.x;
    const dy = my - h.y;
    if (Math.sqrt(dx*dx + dy*dy) < 30) {
      hearts.splice(i,1);
      score++;
      document.getElementById('score').textContent = score;
      if (score >= targetScore) {
        document.getElementById('surpriseBtn').classList.remove('hidden');
      }
    }
  });
});

document.getElementById('target').textContent = targetScore;
document.getElementById('surpriseBtn').onclick = () => {
  window.location.href = 'surprise.html';
};

update();
