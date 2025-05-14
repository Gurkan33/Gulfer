
import { canvas,ctx, } from "./game.js";
import {state} from "./gameState.js";

/*olika kommandon för objekten: 

    type: "collider" - lämna även blank för collider, "water", "sand", "hole", "bush"(lägg till i collision.js)

    x: position i x led för objektet, placerat från centrum;
    y: position i y led för objektet, placerat från centrum;
    z: höjd på hitbox

    hitbox: typen av hitbox, "circle" eller "rectangle";
        Om (hitbox === "circle"){
            radius: radien på cirkeln;
        }
        Om (hitbox === "rectangle"){
            rotation: rotationen på rektangeln (grader)
            width: bredden på rektangeln;
            height: höjden på rektangeln;
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

const drawHitboxes = false; // true = rita hitboxes, false = rita inte hitboxes
export let objects = {
    1:[

//objects
    //rock
    { x: 900, y: 825, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100, type:"rock"},

    //bushes
    { x: 575, y: 575, height:75, width:75, hitbox: 'rectangle', color: '', sprite: "assets/bush2.png", offsetX: 70, offsety: 70, size:100, type:"bush"},
    { x: 1825, y: 500, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
    { x: 300, y: 400, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush3.png", offsetX: 35, offsety: 33, size:100, type:"bush"},
    { x: 125, y: 500, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
    { x: 700, y: 75, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush4.png", offsetX: 30, offsety: 27, size:100, type:"bush"},

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
    { x: 1320, y: 454, radius: 92, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 1325, y: 310, width: 250, height: 100, hitbox: 'rectangle', color: 'blue', rotation: -36, type:"water"},
    { x: 1300, y: 160, width: 250, height: 200, hitbox: 'rectangle', color: 'blue', rotation: -7.5, type:"water"},


    //water 2:
    { x: 1280, y: 725, width: 310, height: 120, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
    { x: 1235, y: 790, radius: 55, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 1265, y: 786, radius: 60, hitbox: 'circle', color: 'blue', type:"water"},
    { x: 1550, y: 775, radius: 87.5, hitbox: 'circle', color: 'blue', type:"water"},

    //sand
    
    { x: 5000, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    { x: 1600, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    { x: 1700, y: 600, radius: 100, hitbox: 'circle', color: 'yellow', type:"sand"},
    //hole:
    {x:300, y:800, radius:10, hitbox: "circle", color:"black", type:"hole"}
    
    ],
    2:[
        //rock
        { x: 900, y: 825, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100, type:"rock"},

        //bushes
        { x: 550, y: 700, height:75, width:75, hitbox: 'rectangle', color: '', sprite: "assets/bush2.png", offsetX: 70, offsety: 70, size:100, type:"bush"},
        { x: 1825, y: 225, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
        { x: 950, y: 350, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush3.png", offsetX: 35, offsety: 33, size:100, type:"bush"},
        { x: 125, y: 610, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
        { x: 450, y: 200, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush4.png", offsetX: 30, offsety: 27, size:100, type:"bush"},
  
        { x: 1220, y: 275, radius: 30, hitbox: 'circle', color: 'yellow', type: "water"},
        { x: 1390, y: 200, radius: 30, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1230, y: 210, width: 160, height: 60, hitbox: 'rectangle', color: 'blue', rotation: -20, type:"water"},

        { x: 790, y: 310, radius: 60, hitbox: 'circle', color: 'yellow', type: "sand"}, 
        { x: 600, y: 310, radius: 40, hitbox: 'circle', color: 'yellow', type: "sand'"},
        { x: 630, y: 250, width: 200, height: 90, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"sand"},
        { x: 550, y: 570, radius: 55, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 755, y: 590, radius: 35, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 550, y: 530, width: 200, height: 90, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"sand"},
        { x: 1425, y: 220, width: 200, height: 70, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"sand"},
        { x: 1300, y: 590, width: 140, height: 60, hitbox: 'rectangle', color: 'blue', rotation: 10, type:"sand"},
        { x: 1300, y: 610, radius: 30, hitbox: 'circle', color: 'yellow', type: "sand"},
        { x: 1430, y: 625, radius: 35, hitbox: 'circle', color: 'yellow', type: "sand"},

        //hole:
        {x:1700, y:365, radius:10, hitbox: "circle", color:"black", type:"hole"}

    ],
    3:[
        //rock
        { x: 900, y: 100, radius: 30, hitbox: 'circle', color: '', sprite: "assets/rock.png", offsetX: 200, offsety: 200, size:100, type:"rock"},

        //bushes
        { x: 550, y: 700, height:75, width:75, hitbox: 'rectangle', color: '', sprite: "assets/bush2.png", offsetX: 70, offsety: 70, size:100, type:"bush"},
        { x: 1725, y: 225, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
        { x: 1000, y: 450, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush3.png", offsetX: 35, offsety: 33, size:100, type:"bush"},
        { x: 200, y: 650, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush1.png", offsetX: 43, offsety: 43, size:100, type:"bush"},
        { x: 450, y: 150, radius: 35, hitbox: 'circle', color: '', sprite: "assets/bush4.png", offsetX: 30, offsety: 27, size:100, type:"bush"},


        { x: 470, y: 620, width: 1200, height: 800, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        { x: 1200, y: 310, width: 1200, height: 800, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        { x: 1430, y: 450, radius: 70, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1490, y: 470, radius: 70, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1120, y: 330, radius: 146, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1110, y: 380, width: 200, height: 100, hitbox: 'rectangle', color: 'blue', rotation: -30, type:"water"},
        { x: 1585, y: 0, width: 800, height: 1200, hitbox: 'rectangle', color: 'blue', rotation: 35, type:"water"}, 
        
        {x:1550, y:260, radius:10, hitbox: "circle", color:"black", type:"hole"}
        
        
    ],
    4:[
        { x: 1580, y: 650, radius: 60, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1630, y: 625, radius: 80, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1720, y: 600, radius: 70, hitbox: 'circle', color: 'yellow', type: 'sand'},

        { x: 1340, y: 710, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 900, y: 690, width: 400, height: 130, hitbox: 'rectangle', color: 'blue', rotation: -8, type:"water"},
        { x: 870, y: 780, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 950, y: 330, radius: 50, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1520, y: 180, radius: 60, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 940, y: 190, width: 600, height: 120, hitbox: 'rectangle', color: 'blue', rotation: -15, type:"water"},

        {x:1700, y:350, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    5:[
        { x: 1430, y: 500, radius: 40, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1490, y: 590, radius: 30, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1550, y: 540, radius: 30, hitbox: 'circle', color: 'yellow', type: 'sand'},

        { x: 1530, y: 750, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -90, type:"water"},
        { x: 1680, y: -60, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -70, type:"water"},
        { x: 1680, y: -50, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 60, type:"water"},
        { x: 1810, y: -60, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},

        {x:1670, y:300, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    6:[
        { x: 1580, y: 210, radius: 130, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1480, y: 230, radius: 90, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1690, y: 270, radius: 80, hitbox: 'circle', color: 'yellow', type: 'sand'},

        { x: 670, y: 1330, radius: 600, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 1170, y: 740, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 600, y: 650, width: 700, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -25, type:"water"},
        { x: 1300, y: 800, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
        { x: 1300, y: 770, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -10, type:"water"},

        {x:1600, y:600, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    7:[
        { x: 100, y: 890, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 200, y: 740, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 6, type:"water"},
        { x: 930, y: 975, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 900, y: 720, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 10, type:"water"},
        { x: 1200, y: 740, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -5, type:"water"},
        { x: 100, y: 70, radius: 220, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 200, y: -260, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -6, type:"water"},
        { x: 1200, y: -30, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 250, y: -260, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: 6, type:"water"},
        { x: 1200, y: -290, width: 900, height: 500, hitbox: 'rectangle', color: 'blue', rotation: -8, type:"water"},
        { x: 1950, y: -70, radius: 320, hitbox: 'circle', color: 'yellow', type: 'water'},

        {x:1700, y:500, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    8:[
        { x: 1720, y: 500, radius: 70, hitbox: 'circle', color: 'yellow', type: 'sand'},

        { x: 670, y: 750, radius: 120, hitbox: 'circle', color: 'yellow', type: 'water'},
        { x: 700, y: 610, width: 600, height: 240, hitbox: 'rectangle', color: 'blue', rotation: 0, type:"water"},
        { x: 1370, y: 700, radius: 120, hitbox: 'circle', color: 'yellow', type: 'water'},

        {x:1700, y:800, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
    9:[
        { x: 1100, y: 280, radius: 150, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1200, y: 260, radius: 130, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1000, y: 280, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1750, y: 800, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        { x: 1800, y: 700, radius: 100, hitbox: 'circle', color: 'yellow', type: 'sand'},
        
        {x:1600, y:150, radius:10, hitbox: "circle", color:"black", type:"hole"}
    ],
};


export function drawObjects() {
    objects[state.level].forEach(obj => {

        if (obj.type === "water") {

                if(drawHitboxes){
                ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
                }else{
                    ctx.fillStyle = "transparent";}

            } else if (obj.type === "sand") {

                if(drawHitboxes){
                ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
                }else{
                    ctx.fillStyle = "transparent";}

            }
            else if (obj.type === "hole") {
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
            } 
            else if (obj.type === "bush") {

                if(drawHitboxes){
                    ctx.fillStyle = "rgba(0, 65, 0, 0.5)";
                }else{
                    ctx.fillStyle = "transparent";}
                
            }  else if (obj.type === "rock") {

                if(drawHitboxes){
                    ctx.fillStyle = "rgba(128, 128, 128, 0.8)";
                }else{
                    ctx.fillStyle = "transparent";}
                
            }else {
                ctx.fillStyle = obj.color;
            }

        if (!obj.sprite) {

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
