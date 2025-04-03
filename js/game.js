const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

import{
    ball,
    drawBall,
    moveBall,
    shootBall

}from "./ball.js"

let objects = [
    { x: 100, y: 150, radius: 30, type: 'circle', color: 'red' },
    { x: 400, y: 300, width: 150, height: 20, type: 'rectangle', color: 'blue' }
];



function drawObjects() {
    objects.forEach(obj => {
        ctx.fillStyle = obj.color;
        if (obj.type === 'circle') {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        } else if (obj.type === 'rectangle') {
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
    });
}

function detectCollision() {
    objects.forEach((obj, index) => {
        if (obj.type === 'circle') {
            // Kollision mellan bollen och en cirkel
            let dx = ball.x - obj.x;
            let dy = ball.y - obj.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + obj.radius) {
                console.log('Bollen träffade en cirkel (objekt ' + (index + 1) + ')');
                // Trigger event för cirkelkollision
                handleHitEvent(obj);
            }
        } else if (obj.type === 'rectangle') {
            // Kollision mellan bollen och en fyrkant
            if (ball.x + ball.radius > obj.x && ball.x - ball.radius < obj.x + obj.width &&
                ball.y + ball.radius > obj.y && ball.y - ball.radius < obj.y + obj.height) {
                console.log('Bollen träffade en fyrkant (objekt ' + (index + 1) + ')');
                // Trigger event för fyrkantskollision
                handleHitEvent(obj);
            }
        }
    });
}

function handleHitEvent(obj) {
    // Sätt olika event här beroende på objektet
    if (obj.color === 'red') {
        alert('Bollen träffade det röda objektet (cirkel)');
    } else if (obj.color === 'blue') {
        alert('Bollen träffade det blå objektet (fyrkant)');
    }
    
    // Stanna bollen efter kollisionen
    ball.directionX = 0;
    ball.directionY = 0;
}



canvas.addEventListener('click', shootBall);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Rensa skärmen
    drawBall();
    drawObjects();
    moveBall();
    detectCollision();
    requestAnimationFrame(gameLoop); // Håll spelet igång
}

gameLoop();
