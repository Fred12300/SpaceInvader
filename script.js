let backGNV = document.querySelector("#frameNV")
let backGN = document.querySelector("#frameN")
let frameTop = document.querySelector("#frameTop")
let backNV = -500
let backN = -500
let horPlayer = 400
let missDelay = 200
let missOk = 1
let score = 0
let enePosTab = []
let scoreAff = document.querySelector(".scoreAff")
let goLeft = false
let goRight = false


// Paramètre de jeu------------------------------------------------------------------------------------------
    let gameOn = 0
    let eneNb = 5
    let eneLatSpeed = 130
    let cadanceEneBomb = 2000
    let missRate = 1000
    let scoreInc = 100
    let backSpeed = 30
    let life = 3

    
    // New Menu ---------------------------------------------------------------------------------------------------------------
    let newMenu = document.createElement("div");
        newMenu.id = "menu"
        newMenu.className = "menu"
        newMenu.style.transition = "all 2s"
        newMenu.style.opacity = "0%"
        
        newMenu.innerHTML = `
            <h1>Space Invaders</h1>
            <p class='new-game'>nouvelle partie</p>
            <p class='select-level'>selection niveau</p>
            <p class='high-scores'>high scores</p>
            <p class='options'>options</p>`
    
    let generateMenu = () => {
        backGN.appendChild(newMenu)
        setTimeout(() => {newMenu.style.opacity = "100%"}, 100)
    }
    
    generateMenu()
    
    // Choix Menu ------------------------------------------------------------------------------------------
        let menuToggle = document.getElementById("menu")
        let newG = document.querySelector(".new-game")
        let levelSelect = document.querySelector(".select-level")
        let highScores = document.querySelector(".highScores")
        let options = document.querySelector(".options")
    
    
    
    // Activer/Désactiver mouvement fond et enemies, bombes---------------------------------------------
    let motion = 1
    let eneLineLat = 1
    let dropIt = 1

    let changeAllParameters = (a) => {
        eneLineLat = a
        dropIt = a
        gameOn = a
    }
        // Activer les mouvements du jeu------------------------------------------------------------------------------------------
            //changeAllParameters(1)

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------


// Animation du fond------------------------------------------------------------------------------------------
let backFond = () => {
    backNV++
    backGNV.style = `background-position-y: ${backNV}px`
}
let backFront = () => {
    backN++
    backGN.style = `background-position-y: ${backN}px`
}
let interFond = setInterval((backFond),backSpeed+30)
let interFront = setInterval((backFront),backSpeed)

// RAZ animation fond------------------------------------------------------------------------------------------
if(motion === 0){
    clearInterval(interFond)
    clearInterval(interFront)
}

//Génération affichage vies------------------------------------------------------------------------------------------
let zoneVie = document.querySelector(".lifes")

let generateLifes = () => {
    for(i = 1; i < life + 1; i++){
        let vie = document.createElement("div")
        vie.style.height = "50px"
        vie.style.width = "50px"
        vie.className = `vies n${i}`
        zoneVie = document.querySelector(".lifes")
        zoneVie.appendChild(vie)
    }
}



// LevelCleared------------------------------------------------------------------------------------------
let levelCleared = () => {
    console.log("Level CLeared")
}

//GameOver------------------------------------------------------------------------------------------
let gOverDisp = document.createElement("div")
    gOverDisp.style.height = "300px"
    gOverDisp.style.width = "700px"
    gOverDisp.innerText = "game over"
    gOverDisp.className = "gameOver"

let gameOver = () => {
    console.log("---GAMEOVER---")
    eneLine.innerHTML = ""
    backGN.innerHTML = ""
    frameTop.innerHTML = ""
    backGN.appendChild(gOverDisp)
    setTimeout(() => {
        gOverDisp.style.opacity = "100%"
        gOverDisp.style.fontSize = "200px"
    }, 500)
    setTimeout(() => {
        gOverDisp.style.opacity = "0%"
    }, 4500)
    setTimeout(() => {
    newMenu.style.opacity = "0%"
    generateMenu()
    }, 6500)
}

//Respawn------------------------------------------------------------------------------------------
let respawn = () => {
    let playerNav = document.createElement("div")
    playerNav.className = "player"
    let playerImg =document.createElement("img")
    playerImg.src = "./pngegg.png"
    backGN.appendChild(playerNav)
    playerNav.appendChild(playerImg)
    //let playerPos = document.querySelector(".player")
    //let player = document.querySelector(".player")
    horPlayer = 400
}
playerPos = document.querySelector(".player")
let player = document.querySelector(".player")



// Génération d'ennemis------------------------------------------------------------------------------------------
let eneLine = document.createElement("div")
eneLine.className = "line"
eneLine.style.width = "500px"
eneLine.style.height = "70px"
eneLine.style.top = "60px"
eneLine.style.left = "150px"
eneLine.style.position = "absolute"
eneLine.style.transition = "all 0.5s"
document.body.appendChild(eneLine)


let generateEnnemis = () => {
    let eneLineInPos = 0
    for(let i=1; i<eneNb + 1; i++){
        enePosTab.push(i)
        let eneSaucer = document.createElement("div")
        eneSaucer.style.left =  `${eneLineInPos}px`
        eneSaucer.classList = `enemy ${i}`
        eneLine.appendChild(eneSaucer)
        eneLineInPos += 80
    }
}


let enemys = document.querySelectorAll(".enemy")
let lineLeft = document.querySelector(".line").getBoundingClientRect().x

    //Ennemi largue une bombe------------------------------------------------------------------------------------------
    let eneDropBomb = () => {
        let rand = Math.round(Math.random()*enePosTab.length)
        if(rand >= eneNb-1){rand--}
        let arrPos = enePosTab[rand]
        let eneTir = document.getElementsByClassName(`${arrPos}`)
        let horEne = eneTir[0].getBoundingClientRect().x
        let bomb = document.createElement("div");
            bomb.className = "bomb"
            bomb.style.position = "absolute"
            bomb.style.zIndex ="-1"
            bomb.style.height = "25px"
            bomb.style.width = "25px"
            bomb.style.borderRadius = "50% 50%"
            bomb.style.background = "radial-gradient(rgb(125, 255, 151), rgb(51, 255, 249), rgba(251, 255, 249, 0.1))"
            bomb.style.top = "-60px"
            bomb.style.left = `${horEne + 10}px`
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

            // Collision Bomb Enemy------------------------------------------------------------------------------------------
            let bombEnePos = bomb.getBoundingClientRect()
            player = document.querySelector(".player")
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
                    player = document.querySelector(".player")
                    player.remove()
                    life -= 1
                    if(life<=0){
                        console.log("WHAT !?")
                        gameOver()
                    }else{
                        setTimeout(respawn, 1000)
                    }
                    console.log(life)
                    let noLife = document.querySelector(`.n${life}`)
                    noLife.remove()
                    bomb.remove()
                    clearInterval(bombLaunchInt)
                }
            }
        }
        let bombLaunchInt = setInterval((dropBomb),3)
    }
    let candanceBomb = setInterval((eneDropBomb), cadanceEneBomb);



    //déplacement de la ligne d'enemis------------------------------------------------------------------------------------------
    let moving = -5
    let moveEnemys = () => {
            lineLeft += moving
            eneLine.style.left = `${lineLeft}px`
            if(lineLeft<=0){moving = 5}
            if(lineLeft>=190){moving = -5}
        }

    let movingEnemys = setInterval((moveEnemys),eneLatSpeed)
    if(eneLineLat===0){clearInterval(movingEnemys)}



    // Action des touches du clavier------------------------------------------------------------------------------------------
    let keyPress = (e) => {
        switch(e.code) {

            // Lancer un missile------------------------------------------------------------------------------------------
            case "Space" :
                let missile = document.createElement("div")
                    missile.className = "missileAmi"
                    missile.style.position = "absolute"
                    missile.style.zIndex ="-1"
                    missile.style.height = "50px"
                    missile.style.width = "6px"
                    missile.style.borderRadius = "50% 50% 80% 80%"
                    missile.style.background = "linear-gradient(black, darkgrey, grey, orange, yellow, rgb(255, 255, 255, 0.2))"
                    missile.style.top = "-60px"
                    missile.style.left = `${horPlayer + 18}px`
                    //Cadence de tir------------------------------------------------------------------------------------------
                    if(missOk === 1){
                        document.body.appendChild(missile)
                        missOk = 0
                        setTimeout(() => {missOk = 1}, missRate)
                    }
                    
                    
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

                    // Collision Missile Ami------------------------------------------------------------------------------------------
                    let missAmiPos = missile.getBoundingClientRect()
                    enemys = document.querySelectorAll(".enemy")
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
                                    let eneDown = enePosTab.indexOf(parseInt(`${ene.classList[1]}`))
                                    enePosTab.splice(eneDown,1)
                                    if(enePosTab.length===0){levelCleared()}
                                    ene.remove()
                                    missile.remove()
                                    clearInterval(missLaunchInt)
                                    score += scoreInc
                                    scoreAff.textContent = `${score}`
                                }
                            }
                        }
                    )    
                }
                let missLaunchInt = setInterval((launchMiss),3)
            break;

            // Aller à gauche------------------------------------------------------------------------------------------    
            case "ArrowLeft" :
                goLeft = true
            break

            //Aller à droite------------------------------------------------------------------------------------------
            case "ArrowRight" :
                goRight = true
            break
        }
    }
    let keyRelease = (e) => {
        switch(e.code) {
            case "ArrowLeft" :
                goLeft = false
            break

            case "ArrowRight" :
                goRight = false
            break
        }

    }
    document.addEventListener("keydown", keyPress)
    document.addEventListener("keyup", keyRelease)


    let interMove = setInterval(() => {
        if(goLeft === true){
            if(horPlayer>0){
                horPlayer -= 20;}
                playerPos = document.querySelector(".player")
                playerPos.style.left = `${horPlayer}px`
        }
        if(goRight === true){
            if(horPlayer<750){
                horPlayer += 20;}
                playerPos = document.querySelector(".player")
                playerPos.style.left = `${horPlayer}px`
        }
    }, 50)

    /* if(gameOn===0){clearInterval(interMove)} */

// Affichage score et vies------------------------------------------------------------------------------------------
let generateTop = () => {
    let scoreName = document.createElement("p")
        scoreName.className = "top"
        scoreName.textContent = "score :"
    let scoreVal = document.createElement("div")
        scoreVal.classList = "top scoreAff"
        scoreVal.textContent = "0"
    let lifesZone = document.createElement("div")
        lifesZone.className = "lifes"
    frameTop.appendChild(scoreName)
    frameTop.appendChild(scoreVal)
    frameTop.appendChild(lifesZone)
}

// RAZ bombes ennemies------------------------------------------------------------------------------------------
if(dropIt === 0){
    clearInterval(candanceBomb) 
}

// New Game ---------------------------------------------------------------------------------------------------------------
let newGame = () => {
    console.log("---NewGame---")
    menuToggle.remove()
    gameOn = 1
    generateTop()
    generateEnnemis()
    generateLifes()
    changeAllParameters(1)
    respawn()
}


newG.addEventListener("click", newGame)




//ToDo------------------------------------------------------------------------------------------
/*
    - générateur et compteur de nombre d'ennemis
    - générateur et sélecteur de niveau de difficulté
    - avancement de la ligne ennemie
        - changer valeurs fixe en variable: - position départ bombe
    
    - affichage du score en fin de partie

    - interface navigation
        - nouvelle partie
            - création de nouvelle partie
        - sélectionner niveau
        - high scores
        - about

    -Réguler génération alétoir de position de tir ennemi
*/