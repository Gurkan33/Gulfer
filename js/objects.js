const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*------------------------------------------------------------------------------------*/

/* x: position x, y: position y, 
(hitbox: "circle" -> radius: radius on circle), (hitbox: rectangle -> width: width of rectangle, height: height of rectangle), 
color: color of shaper or hitbox, sprite: "none"// no sprite - "SPRITE URL HERE",
(SPRITES/IMAGES) offsetX: position offset x independent of hitbox, offsetY: position offset y independent of hitbox.*/
export let objects = [ 
    { x: 100, y: 150, radius: 30, hitbox: 'circle', color: 'red', sprite: "none"},
    { x: 400, y: 300, width: 150, height: 20, hitbox: 'rectangle', color: 'blue', sprite: "none"},
    { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "../assets/rock.png", offsetX: 200, offsety: 200, size:100}
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

            
            const img = new Image();
            img.src = obj.sprite;
            ctx.drawImage(img, obj.x - (img.width/2) + obj.offsetX, obj.y - (img.width/2) + obj.offsety, obj.size, obj.size);
  
            
            ctx.fillStyle = "rgba(195, 238, 5,0.6)"; /*sätt sista värdet till "0" för att göra hitbox osynlig på alla bojekt som har en sprite*/
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