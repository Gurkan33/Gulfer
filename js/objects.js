const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*------------------------------------------------------------------------------------*/

export let objects = [
    { x: 100, y: 150, radius: 30, hitbox: 'circle', color: 'red', sprite: "none"},
    { x: 400, y: 300, width: 150, height: 20, hitbox: 'rectangle', color: 'blue', sprite: "none"},
    { x: 100, y: 500, radius: 30, hitbox: 'circle', color: 'red', sprite: "../assets/sprites/golfball.png"}
];

export function drawObjects() {
    objects.forEach(obj => {
        if(obj.sprite === "none"){
            ctx.fillStyle = obj.color;
            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            } else if (obj.hitbox === 'rectangle') {
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            }
        }else{

            const golfball = new Image();
            console.log(golfball)
            golfball.src = "golfspelare.png"

            golfball.onLoad = function(){
                ctx.drawImage(golfball, 100, 100);
            }

            ctx.fillStyle = "rgba(0,1,1,1)";
            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            } else if (obj.hitbox === 'rectangle') {
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            }
        }

    });
}