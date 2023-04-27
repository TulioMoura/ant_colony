//tamanho do ambiente, 50 x 50
//tamanho da tela 500x500
//pixel size 10 
//numero de formigas = 100
environment =[[]]
for(let i= 0; i<50; i++){
    environment[i] = []
}
ants = []
let canvas = document.getElementById("tela")
    let ctx = canvas.getContext("2d")

let ant = {
    comida : false,
    oldPosX :0,
    oldPosY: 0,
    posX : 0,
    posY : 0,
    detect_f1(){
        for(let i =-1;i<2;i++){
            for (let j = 1; j < 2; j++){
                if(i==0&&j==0){
                    continue
                }
                else if(env[posX+i][posY+j].ferA > 1){
                    return([true,posY+i, posY+j])
                }
1               
            }
        }
        
        return([false,0,0])
        
    },
    detect_f2(){
        for(let i =-1;i<2;i++){
            for (let j = 1; j < 2; j++){
                if(i==0&&j==0){
                    continue
                }
                if(env[posX+i][posY+j].ferB > 1){
                    return ([true,posY+i, posY+j])
                }
1               
            }
        }
        return([false,0,0])
    },
    move_random(){
        do{
            this.oldPosX = this.posX;
        this.oldPosY = this.posY;
        this.posX =this.posX + Math.round(Math.random()*2-1)
        this.posY = this.posY + Math.round(Math.random()*2-1)
            if(this.posX >= 50){
                this.posX = 49
            }
            if(this.posX < 0){
                this.posX = 0
            }
            if(this.posY >= 50){
                this.posY = 49
            }
            if(this.posY < 0){
                this.posY = 0
            }
            if(this.posX ==this.oldPosY && this.posY == this.oldPosY){
               // console.log("samePos")
            }
        }
        while(this.posX ==this.oldPosX && this.posY == this.oldPosY)
        
        //console.log(this.posX, this.posY)
        
    },
    move_to(x,y){
        this.oldPosX = posX;
        this.oldPosY = posY;
        this.posX = x;
        this.posY = y;

    }
    ,
    do(env){
        if(this.comida == false && env[this.posX][this.posY].qtd_alim == 0){
            f2 = this.detect_f2;
            env[this.posX][this.posY].ferA++;
            if(f2[0]==true){
                this.move_to(f1[1],f1[2])
            }
            else{
                this.move_random
            }

        }
        else if(this.comida == false && env[this.posX][this.posY].qtd_alim > 0){
            this.comida = true;
            console.log("comida")
            env[this.posX][this.posY].qtd_alim--;
            env[this.posX][this.posY].ferA ++
        }
        if(this.comida == true){
            env[this.posX][this.posY].ferB++
            f1 = this.detect_f1;
            if(env[this.posX][this.posY].home == true){
                this.comida = false;

            }
            else if(f1[0]==true){
                this.move_to(f1[1],f1[2])
            }
             
            else{
                this.move_random()
            }

        }
        else if(this.comida == false && env[this.posX][this.posY].qtd_alim > 0){
            
            this.comida = true;
        }


       this.move_random()
        return 
    }
}


var currentAnt = 0;
for(let i = 0;i<50;i++){
    for(let j=0;j<50;j++){
        environment[i][j] = {
            qtd_alim : 0,
           ferA : 0,
           ferB : 0,
           home: false
       }
    }
}

for(let i =0;i<100; i++){
    ants[i] = Object.create(ant);
}

function createFood(posx, posy){
    environment[posx][posy].qtd_alim = 20
    environment[posx+1][posy+1].qtd_alim = 20
    environment[posx-1][posy-1].qtd_alim = 20
    environment[posx+1][posy].qtd_alim = 20
    environment[posx-1][posy].qtd_alim = 20
    environment[posx][posy-1].qtd_alim = 20
    environment[posx][posy+1].qtd_alim = 20
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
function start(agents, env){

            if(currentAnt==100){
                currentAnt =0;
            }
            agents[currentAnt].do(env)
            ctx.fillStyle = "rgb(255,255,255)"
            ctx.fillRect(ants[currentAnt].oldPosX*10, ants[currentAnt].oldPosY*10,10,10)
            ctx.fillStyle="rgb(2, 2, 20)"
            ctx.fillRect(agents[currentAnt].posX*10, agents[currentAnt].posY*10, 10, 10)
            
            
            currentAnt++;
        
        
    
    
}

function decay(){
    environment.forEach(sbarr => {
        sbarr.forEach(cell => {
            if(cell.ferA > 0){
                cell.ferA = cell.ferA - 1;
            }
            if(cell.ferB > 0){
                cell.ferB = cell.ferB - 1;
            }
        })
    });
    renderEnv()
}
 function renderEnv(){
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(0,0, 500,500)
    for(let i = 0;i<50;i++){
        for(let j=0;j<50;j++){
            if (environment[i][j].home === true){
                ctx.fillStyle="rgb(0,255,0)"
                 ctx.fillRect(i*10, j*10, 10, 10)
            }
            else if (environment[i][j].qtd_alim > 0){
                ctx.fillStyle="rgba(0, 66, 245, 1.0)"
                 ctx.fillRect(i*10, j*10, 10, 10)
                
            }
            else if (environment[i][j].ferA >0){
                ctx.fillStyle=`rgba(245, 156, 242,${environment[i][j].ferA/5})`
                 ctx.fillRect(i*10, j*10, 10, 10)
                 //console.log("fera")
            }
            else if (environment[i][j].ferB >0){
                ctx.fillStyle =`rgba(245, 242, 66,${environment[i][j].ferB/5})`
                 ctx.fillRect(i*10, j*10, 10, 10)
                 //console.log("ferb")
            }
            

        }
    }
}
function renderAnt(){
    for(let i =0;i<10; i++){
        ctx.fillStyle="rgb(255, 250, 250)"
        ctx.fillRect(ants[i].posX*10, ants[i].posY*10, 10, 10)
    }
}

function setAntRandom(ant_arr){
    ant_arr.forEach((ant)=>{
        ant.posX = Math.floor(Math.random()*50);
        ant.posY = Math.floor(Math.random()*50);
    })
}

createFood(15,15)
createFood(18,18)
createFood(42,42)

setHome(25,25)
//gotoHome(25,25)
setAntRandom(ants);
renderEnv()
//setInterval(decay,100)
/* setInterval(()=>{
    for(let i = 0;i<50;i++){
        for(let j=0;j<50;j++){
            if (environment[i][j].home === true){
                ctx.fillStyle="rgb(0,255,0)"
                 ctx.fillRect(i*10, j*10, 10, 10)
            }
            else if (environment[i][j].qtd_alim > 0){
                ctx.fillStyle="rgb(0, 0, 245)"
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
            else {
                ctx.fillStyle ="rgb(24, 244, 66)"
                 ctx.fillRect(i*10, j*10, 10, 10)
            }

        }
    }
    //console.log("renderenv")
}, 1000) */
/* setInterval(()=>{
    for(let i =0;i<10; i++){
        ctx.fillStyle="rgb(255, 250, 250)"
        ctx.fillRect(ants[i].posX*10, ants[i].posY*10, 10, 10)
        ctx.fillStyle = "rgb(0,255,0)"
        ctx.fillRect(ants[i].oldPosX*10, ants[i].oldPosY*10,10,10)
        
    }
    console.log("renderant")
}, 500) */
idInterval = setInterval(start,1,ants,environment)

function stop(id){
    clearInterval(id)
}
gotoHome(25,25)
setInterval(renderEnv, 500)
setInterval(decay,3000)
