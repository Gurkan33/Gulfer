
// collision.js

// Roterad rektangel-kollision
function isBallCollidingWithRotatedRect(ball, rect) {
    const angle = rect.rotation * Math.PI / 180;
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    const dx = ball.x - centerX;
    const dy = ball.y - centerY;

    const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
    const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);

    const halfW = rect.width / 2;
    const halfH = rect.height / 2;

    const closestX = Math.max(-halfW, Math.min(rotatedX, halfW));
    const closestY = Math.max(-halfH, Math.min(rotatedY, halfH));

    const distX = rotatedX - closestX;
    const distY = rotatedY - closestY;

    return (distX * distX + distY * distY) < ball.radius * ball.radius;
}

// Studs mot roterad rektangel
function bounceOffRotatedRect(ball, rect) {
    const angle = rect.rotation * Math.PI / 180;
    const normal = { x: Math.sin(angle), y: -Math.cos(angle) };

    const dot = ball.directionX * normal.x + ball.directionY * normal.y;
    ball.directionX = ball.directionX - 2 * dot * normal.x;
    ball.directionY = ball.directionY - 2 * dot * normal.y;
}

// Cirkulär kollision + studs
function handleCircleCollision(ball, obj) {
    let dx = ball.x - obj.x;
    let dy = ball.y - obj.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + obj.radius) {
        let length = Math.sqrt(dx * dx + dy * dy);
        let normalX = dx / length;
        let normalY = dy / length;

        let dot = ball.directionX * normalX + ball.directionY * normalY;
        ball.directionX = ball.directionX - 2 * dot * normalX;
        ball.directionY = ball.directionY - 2 * dot * normalY;

        ball.x = obj.x + (ball.radius + obj.radius + 0.1) * normalX;
        ball.y = obj.y + (ball.radius + obj.radius + 0.1) * normalY;
    }
}

// Rektangelkollision (roterad eller ej)
function handleRectangleCollision(ball, obj) {
    if (obj.rotation) {
        if (isBallCollidingWithRotatedRect(ball, obj)) {
            bounceOffRotatedRect(ball, obj);
        }
    } else {
        if (ball.x + ball.radius > obj.x && ball.x - ball.radius < obj.x + obj.width &&
            ball.y + ball.radius > obj.y && ball.y - ball.radius < obj.y + obj.height) {
            ball.directionY *= -1;
        }
    }
}

// Main collision handler – kallas i game loop
export function detectCollision(ball, objects) {
    objects.forEach(obj => {

        if(obj.type === "collider" || !obj.type){
            if (obj.hitbox === 'circle') {
                handleCircleCollision(ball, obj);
            } else if (obj.hitbox === 'rectangle') {
                handleRectangleCollision(ball, obj);
            }
        }

        if(obj.type === "water"){

        }

        if(obj.type === "sand"){
            
        }

        if(obj.type === "hole"){
            
        }
    });
}
