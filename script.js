let playerPos = document.querySelector(".player")
let backGNV = document.querySelector("#frameNV")
let backGN = document.querySelector("#frameN")
let backNV = -500
let backN = -500
let horPlayer = 400
let missOk = 1
let missDelay = 200
let player = document.querySelector(".player")

// Paramètre de jeu
let eneNb = 8
let cadanceEneBomb = 1000


// Activer/Désactiver mouvement fond et enemies, bombes
let motion = 0
let eneLineLat = 0
let dropIt = 0


// Génération d'ennemis
let eneLine = document.createElement("div")
eneLine.className = "line"
eneLine.style.width = "500px"
eneLine.style.height = "70px"
eneLine.style.top = "60px"
eneLine.style.left = "150px"
eneLine.style.position = "absolute"
eneLine.style.transition = "all 0.5s"
document.body.appendChild(eneLine)
let eneLineInPos = 0
for(let i=1; i<eneNb; i++){
    let eneSaucer = document.createElement("div")
    eneSaucer.style.left =  `${eneLineInPos}px`
    eneSaucer.classList = `enemy ${i}`
    eneLine.appendChild(eneSaucer)
    eneLineInPos += 80
}
let enemys = document.querySelectorAll(".enemy")
let lineLeft = parseInt(eneLine.style.left.substring(0, eneLine.style.left.length - 2))


//Ennemi largue une bombe
let eneDropBomb = () => {
    let rand = Math.round(Math.random()*eneNb)
    let eneTir = document.getElementsByClassName(`${rand}`)
    console.log(rand)
    let horEne = eneTir[0].getBoundingClientRect().x
    let bomb = document.createElement("div");
        bomb.className = "bomb"
        bomb.style.position = "absolute"
        bomb.style.zIndex ="-1"
        bomb.style.height = "15px"
        bomb.style.width = "15px"
        bomb.style.borderRadius = "50% 50%"
        bomb.style.background = "radial-gradient(lightblue, green, rgba(255,255,255,0.6))"
        bomb.style.top = "-60px"
        bomb.style.left = `${horEne + 18}px`
    document.body.appendChild(bomb)
    let bPos = 100
    let bPosMin = 650
    let bPosSpeed = -1

    let dropBomb = () => {
        bPos = bPos - bPosSpeed
            if(bPos>bPosMin){
                bomb.remove()
                clearInterval(bombLaunchInt)
                return
            }
        bomb.style.top = `${bPos}px`

        // Collision Bomb Enemy
        let bombEnePos = bomb.getBoundingClientRect()
        let playerPos = player.getBoundingClientRect()
        if(bombEnePos.right >= playerPos.left && bombEnePos.left <= playerPos.right && playerPos.x != 0){
            if(bombEnePos.y >= playerPos.top) {
                let explode = document.createElement("div")
                explode.style.position = "absolute"
                explode.style.height = "100px"
                explode.style.width = "100px"
                explode.style.top = `${playerPos.y-30}px`
                explode.style.left = `${playerPos.x-30}px`
                explode.style.backgroundImage = "url(./boom.png)"
                explode.style.backgroundSize = "cover"
                explode.style.backgroundRepeat = "no-repeat"
                explode.style.backgroundPosition = "center"
                document.body.appendChild(explode)
                setTimeout(()=>{
                    explode.style.transition = "all 1s"
                    explode.style.opacity = "0%"
                    setTimeout(()=>{explode.remove()}, "1000")
                }, "200")
                player.remove()
                bomb.remove()
                clearInterval(bombLaunchInt)
            }
        }
    }
    let bombLaunchInt = setInterval((dropBomb),3)
}
let candanceBomb = setInterval((eneDropBomb), cadanceEneBomb);

//déplacement de la ligne d'enemis
let moving = -5
let moveEnemys = () => {
        lineLeft += moving
        eneLine.style.left = `${lineLeft}px`
        if(lineLeft<=-200){ moving = 5}
        if(lineLeft>=450){moving = -5}
    }

   let movingEnemys = setInterval((moveEnemys),10)
if(eneLineLat===0){clearInterval(movingEnemys)}
  
// Action des touches du clavier
let keyPress = (e) => {
    switch (e.code) {

        // Lancer un missile
        case "Space" :
            let missile = document.createElement("div");
                missile.className = "missileAmi"
                missile.style.position = "absolute"
                missile.style.zIndex ="-1"
                missile.style.height = "50px"
                missile.style.width = "6px"
                missile.style.borderRadius = "50% 50% 80% 80%"
                missile.style.background = "linear-gradient(black, darkgrey, grey, orange, yellow, rgb(255, 255, 255, 0.2))"
                missile.style.top = "-60px"
                missile.style.left = `${horPlayer + 18}px`
            document.body.appendChild(missile)
            let vPos = 500
            let vPosMin = 0
            let vPosSpeed = 1
            let launchMiss = () => {
                vPos = vPos - vPosSpeed
                    if(vPos<vPosMin){
                        missile.remove()
                        clearInterval(missLaunchInt)
                        return
                    }
                missile.style.top = `${vPos}px`

                // Collision Missile Ami
                let missAmiPos = missile.getBoundingClientRect()
                Array.from(enemys).map((ene) => {
                        let enePos = ene.getBoundingClientRect()
                        if(missAmiPos.right >= enePos.left && missAmiPos.left <= enePos.right && enePos.x != 0){
                            if(missAmiPos.y <= enePos.bottom) {
                                let explode = document.createElement("div")
                                    explode.style.position = "absolute"
                                    explode.style.height = "100px"
                                    explode.style.width = "100px"
                                    explode.style.top = `${enePos.y-30}px`
                                    explode.style.left = `${enePos.x-30}px`
                                    explode.style.backgroundImage = "url(./boom.png)"
                                    explode.style.backgroundSize = "cover"
                                    explode.style.backgroundRepeat = "no-repeat"
                                    explode.style.backgroundPosition = "center"
                                document.body.appendChild(explode)
                                setTimeout(()=>{
                                    explode.style.transition = "all 1s"
                                    explode.style.opacity = "0%"
                                    setTimeout(()=>{explode.remove()}, "1000")
                                }, "200")
                                ene.remove()
                                missile.remove()
                                clearInterval(missLaunchInt)
                            }
                        }
                    }
                )    
            }
            let missLaunchInt = setInterval((launchMiss),3)
        break;

        // Aller à gauche    
        case "ArrowLeft" :
            if(horPlayer>0){
            horPlayer -= 30;}
            playerPos.style.left = `${horPlayer}px`
        break

        //Aller à droite
        case "ArrowRight" :
            if(horPlayer<750){
            horPlayer += 30;}
            playerPos.style.left = `${horPlayer}px`
        break
    }
}
document.addEventListener("keydown", keyPress)

// Animation du fond
let backFond = () => {
    backNV++
    backGNV.style = `background-position-y: ${backNV}px`
}
let backFront = () => {
    backN++
    backGN.style = `background-position-y: ${backN}px`
}
let interFond = setInterval((backFond),40)
let interFront = setInterval((backFront),10)

// RAZ animation fond
if(motion === 0){
    clearInterval(interFond)
    clearInterval(interFront)
}

// RAZ bombes ennemies
if(dropIt === 0){
    clearInterval(candanceBomb)
}


//ToDo
/*
    - tableau de position ennemis pour tirs bombes
    - régulation de la cadance de tir player

    - générateur et compteur de nombre d'ennemis
    - générateur et sélecteur de niveau de difficulté
    
    - compteur de vies player
    - compteur de points

    - interface navigation
        - nouvelle partie
            - création de nouvelle partie
            - génération du player
        - sélectionner niveau
        - high scores
        - about
*/