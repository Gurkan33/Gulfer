
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*olika kommandon för objekten: 

    type: "collider" - lämna även blank för collider, "water", "sand", "hole", (lägg till i collision.js)

    x: position i x led för objektet, placerat från centrum;
    y: position i y led för objektet, placerat från centrum;

    hitbox: typen av hitbox, "circle" eller "rectangle";
        Om (hitbox === "circle"){
            radius: radien på cirkeln;
        }
        Om (hitbox === "rectangle"){
            width: bredd på hitbox
            height: höjd på hitbox
            rotation: rotationen på rektangeln (grader)
        }

    color: färg på FORMEN

    sprite: URL till image på sprite
        if(sprite){
        offsetX: position på sprite själständigt från hitbox i x led
        offsetY: position på sprite själständigt från hitbox i y led
        size: original size
        }

    VIKTIGT : en sprite behåller formen och storleken av hitboxen. Du måste fortfarande välja hitbox etc även fast det är en sprite.

*/


export let objects = [ 
    { x: 100, y: 300, radius: 30, hitbox: 'circle', color: 'red'},
    { x: 600, y: 750, radius: 150, hitbox: 'circle', color: 'red'},
    { x: 400, y: 300, width: 200, height: 20, hitbox: 'rectangle', color: 'blue',},
    { x: 700, y: 400, width: 750, height: 30, hitbox: 'rectangle', color: 'green', rotation: 60},
    { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100 }
];

export function drawObjects() {
    objects.forEach(obj => {
        if (!obj.sprite) {
            ctx.fillStyle = obj.color;

            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

            } else if (obj.hitbox === 'rectangle') {
                ctx.save();
                ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
                ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
                ctx.restore();
            }

        } else {
            const img = new Image();
            img.src = obj.sprite;
            ctx.drawImage(img, obj.x - (img.width / 2) + obj.offsetX, obj.y - (img.width / 2) + obj.offsety, obj.size, obj.size);

            ctx.fillStyle = "rgba(195, 238, 5, 0.6)";
            if (obj.hitbox === 'circle') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            } else if (obj.hitbox === 'rectangle') {
                ctx.save();
                ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
                ctx.rotate((obj.rotation || 0) * Math.PI / 180);
                ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
                ctx.restore();
            }
        }
    });
}
