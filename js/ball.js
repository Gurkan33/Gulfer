const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

export let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 15,
    speed: 5,
    directionX: 0,
    directionY: 0,
};

export function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

export function moveBall() {
    ball.x += ball.directionX;
    ball.y += ball.directionY;

    // Kollision med väggarna
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY;
    }
}

export function shootBall(event) {
    // Beräkna bollens riktning baserat på musens position
    let dx = event.clientX - ball.x;
    let dy = event.clientY - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    ball.directionX = (dx / distance) * ball.speed;
    ball.directionY = (dy / distance) * ball.speed;
}