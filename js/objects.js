
import { canvas,ctx, } from "./game.js";
import {state} from "./gameState.js";

/*olika kommandon för objekten: 

    type: "collider" - lämna även blank för collider, "water", "sand", "hole", "bush"(lägg till i collision.js)

    x: position i x led för objektet, placerat från centrum;
    y: position i y led för objektet, placerat från centrum;
    Height: höjd på objektet

    hitbox: typen av hitbox, "circle" eller "rectangle";
        Om (hitbox === "circle"){
            radius: radien på cirkeln;
        }
        Om (hitbox === "rectangle"){
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


export let objects = {
    1:[
    { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100 },
    { x: 1000, y: 600, radius: 30, hitbox: 'circle', color: '', sprite: "assets/golfspelare.png", offsetX: 25, offsety: 10, size:100},
    { x: 500, y: 700, radius: 115, hitbox: 'circle', color: 'red', type:"collider"},

    //water:
    { x: 270, y: 200, radius: 80, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 1480, y: 260, radius: 115, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 700, y: 172.5, width: 350, height: 400, hitbox: 'rectangle', color: 'blue', rotation: -4, type:"water"},
    { x: 250, y: 202, radius: 70, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 228, y: 204, radius: 52, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 285, y: 194, radius: 72, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 295, y: 185, width: 400, height: 137, hitbox: 'rectangle', color: 'blue', rotation: +12, type:"water"},
    { x: 390, y: 179, width: 200, height: 137, hitbox: 'rectangle', color: 'blue', rotation: +8, type:"water"},
    { x: 900, y: 400, radius: 242, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 865, y: 407, radius: 250, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 480, y: 370, width: 400, height: 137, hitbox: 'rectangle', color: 'blue', rotation: 47, type:"water"},
    { x: 370, y: 280, width: 500, height: 137, hitbox: 'rectangle', color: 'blue', rotation: 30, type:"water"},
    { x: 500, y: 185, width: 300, height: 137, hitbox: 'rectangle', color: 'blue', rotation: -2, type:"water"},
    { x: 1045, y: 180, width: 300, height: 367, hitbox: 'rectangle', color: 'blue', rotation: -2, type:"water"},
    { x: 1110, y: 360, radius: 207, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 940, y: 500, width: 250, height: 100, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"water"},


    //water 2:
    { x: 1280, y: 725, width: 310, height: 120, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
    { x: 1235, y: 790, radius: 55, hitbox: 'circle', color: 'blue', type:"water"},

    //sand
    { x: 1600, y: 600, radius: 30, hitbox: 'circle', color: 'yellow', type:"sand"},
    { x: 500, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    //hole:
    {x:1650, y:475, radius:10, hitbox: "circle", color:"black", type:"hole"}
    
    ],
    2:[
        { x: 1400, y: 500, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100 },
        { x: 1000, y: 600, radius: 30, hitbox: 'circle', color: '', sprite: "assets/golfspelare.png", offsetX: 25, offsety: 10, size:100},
        { x: 500, y: 700, radius: 115, hitbox: 'circle', color: 'red', type:"collider"},
    ],
    3:[
        
    ],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:[],
};


export function drawObjects() {
    objects[state.level].forEach(obj => {
        if (!obj.sprite) {

            if (obj.type === "water") {
                ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
                //ctx.fillStyle = "transparent";
            } else if (obj.type === "sand") {
                ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
                //ctx.fillStyle = "transparent";
            }
            else if (obj.type === "hole") {
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
            } 
            else {
                ctx.fillStyle = obj.color;
            }

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

            ctx.fillStyle = "rgba(195, 238, 5, 0.5)";
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
