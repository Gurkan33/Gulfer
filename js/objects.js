// objects.js
export const objects = [
    { x: 100, y: 150, radius: 30, type: 'circle', color: 'red' },
    { x: 400, y: 300, width: 150, height: 20, type: 'rectangle', color: 'blue' }
];

export function drawObjects(ctx) {
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

export function detectCollision(ball, handleHitEvent) {
    objects.forEach((obj, index) => {
        if (obj.type === 'circle') {
            let dx = ball.x - obj.x;
            let dy = ball.y - obj.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + obj.radius) {
                console.log('Bollen träffade en cirkel (objekt ' + (index + 1) + ')');
                handleHitEvent(obj);
            }
        } else if (obj.type === 'rectangle') {
            if (ball.x + ball.radius > obj.x && ball.x - ball.radius < obj.x + obj.width &&
                ball.y + ball.radius > obj.y && ball.y - ball.radius < obj.y + obj.height) {
                console.log('Bollen träffade en fyrkant (objekt ' + (index + 1) + ')');
                handleHitEvent(obj);
            }
        }
    });
}

export function handleHitEvent(obj) {
    if (obj.color === 'red') {
        alert('Bollen träffade det röda objektet (cirkel)');
    } else if (obj.color === 'blue') {
        alert('Bollen träffade det blå objektet (fyrkant)');
    }
}
