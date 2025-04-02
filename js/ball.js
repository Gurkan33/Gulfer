const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 15,
    speed: 5,
    directionX: 0,
    directionY: 0,
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ball.x += ball.directionX;
    ball.y += ball.directionY;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.directionX = -ball.directionX;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.directionY = -ball.directionY;
    }
}

function shootBall(event) {
    let dx = event.clientX - ball.x;
    let dy = event.clientY - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    ball.directionX = (dx / distance) * ball.speed;
    ball.directionY = (dy / distance) * ball.speed;
}
