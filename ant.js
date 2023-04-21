//tamanho do ambiente, 50 x 50
//tamanho da tela 500x500
//pixel size 10 
//numero de formigas = 100
environment =[[]]
for(let i= 0; i<50; i++){
    environment[i] = []
}
ants = []
let cell = {
    qtd_alim : 0,
    ferA : 0,
    ferB : 0,
    home: false
}

let ant = {
    comida : false,
    posX : 0,
    posY : 0,
    do : (env)=>{

    }
}

for(let i = 0;i<50;i++){
    for(let j=0;j<50;j++){
        environment[i][j] = cell
    }
}

for(let i =0;i<100; i++){
    ants[i] = ant;
}

function createFood(posx, posy){
    environment[posx][posy].qtd_alim = 2
    environment[posx+1][posy+1].qtd_alim = 2
    environment[posx-1][posy-1].qtd_alim = 2
    environment[posx+1][posy].qtd_alim = 2
    environment[posx-1][posy].qtd_alim = 2
    environment[posx][posy-1].qtd_alim = 2
    environment[posx][posy+1].qtd_alim = 2
}

function gotoHome(x,y){
    for(let i =0;i<100; i++){
        ants[i].posX = x;
        ants[i].posY = y;
    }
}

function setHome(x,y){
    environment[x][y].home = true;
}

function start(iterations, agents, env){
    for(let i = 0; i<iterations; i++){
        for(let j = 0;j<agents;j++){
            agents.do(env)
        }
    }
}

function decay(){
    environment.forEach(sbarr => {
        sbarr.forEach(cell => {
            cell.ferA = cell.FerA - 1;
            cell.ferB = cell.FerB - 1;
        })
    });
}

function render(){
    let canvas = document.getElementById("tela")
    let ctx = canvas.getContext("2d")

    for(let i = 0;i<50;i++){
        for(let j=0;j<50;j++){
            if (environment[i][j].home === true){
                ctx.fillStyle="rgb(0,255,0)"
                ctx.fillRect(i*10, j*10, 10, 10)
            }
            else if (environment[i][j].qtd_alim > 0){
                ctx.fillStyle="rgb(197, 66, 245)"
                ctx.fillRect(i*10, j*10, 10, 10)
                
            }
            else if (environment[i][j].ferA ==1){
                ctx.fillStyle="rgb(245, 242, 66)"
                ctx.fillRect(i*10, j*10, 10, 10)
            }
            else if (environment[i][j].ferB ==1){
                ctx.fillStyle ="rgb(245, 242, 66)"
                ctx.fillRect(i*10, j*10, 10, 10)
            }
            

        }
    }

    for(let i =0;i<100; i++){
        ctx.fillStyle="rgb(0, 0, 0)"
        ctx.fillRect(ants[i].posX*10, ants[i].posY*10, 10, 10)
    }
}


createFood(15,15)
createFood(18,18)
createFood(22,22)

setHome(5,5)
gotoHome(5,5)

setInterval(decay,100)

setInterval(render,50)
setInterval(start,100)
console.log("vai")