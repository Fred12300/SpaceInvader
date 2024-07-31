let backFond = document.querySelector("#frameNV")
let backGN = document.querySelector("#frameN")
let frameTop = document.querySelector("#frameTop")
let backFondPos = -500
let backGNPos = -500
let horPlayer = 400
let missDelay = 200
let missOk = 1
let score = 0
let enePosTab = []
let goLeft = false
let goRight = false
let stage = 1


// Paramètre de jeu------------------------------------------------------------------------------------------
    let gameOn = 0
    let eneNb
    let eneLatSpeed = 130
    let cadanceEneBomb = 2000
    let missRate = 1000
    let scoreInc = 100
    let backSpeed = 30
    let life
    let bPosSpeed = 3

    // Contenu des niveaux ---------------------------------------------------------------------------------------------------------------
    let levelContent = [{
        stage : 1,
        eneNb : 3,
        eneLatSpeed : 130,
        cadanceEneBomb : 3000
    },{
        stage : 2,
        eneNb : 5,
        eneLatSpeed : 130,
        cadanceEneBomb : 2500
    },{
        stage : 3,
        eneNb : 7,
        eneLatSpeed : 130,
        cadanceEneBomb : 2000
    },{
        stage : 4,
        eneNb : 8,
        eneLatSpeed : 130,
        cadanceEneBomb : 1500
    }]

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
        let levelMenu = document.querySelector(".select-level")
        let highScores = document.querySelector(".high-scores")
        let options = document.querySelector(".options")
    
    
    
    // Activer/Désactiver mouvement fond et enemies, bombes---------------------------------------------
    let motion = 1
    let eneLineLat = 1
    let dropIt = 1

    let changeAllParameters = (a) => {
        console.log("---ChangeAll---")
        interFond = setInterval((backFondMove),backSpeed+30)
        interFront = setInterval((backFrontMove),backSpeed)
        interMove = setInterval((movePlayer))
        candanceBomb = setInterval((eneDropBomb), cadanceEneBomb);
        movingEnemys = setInterval((moveEnemys),eneLatSpeed)
    }
        // Activer les mouvements du jeu------------------------------------------------------------------------------------------
            //changeAllParameters(1)

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

// Génération et affichage High Scores ------------------------------------------------------------------------------------------
let highScoresTab = [{
    score : "1000",
    name : "Bob"
},{
    score : "1200",
    name : "Paul"
},{
    score : "100",
    name : "George"
}]

let highScoresAffAll = document.createElement("div")
    highScoresAffAll.style.position = "absolute"
    highScoresAffAll.style.height = "400px"
    highScoresAffAll.style.width = "500px"
    highScoresAffAll.style.top = "100px"
    highScoresAffAll.style.left = "150px"
    highScoresAffAll.style.backgroundColor = "rgba(46, 45, 45, 0.5)"
    highScoresAffAll.style.color = "red"
    highScoresAffAll.style.display = "flex"
    highScoresAffAll.style.alignItems = "center"
    highScoresAffAll.style.justifyContent = "space-around"
    highScoresAffAll.style.flexDirection = "column"
    highScoresAffAll.className = "scoreTab"
    
let generateHighScores = () => {
    backGN.innerHTML = ""
    backGN.appendChild(highScoresAffAll)
    let scoreTab = document.querySelector(".scoreTab")
    for(i=0; i<highScoresTab.length; i++){
        let highScoreAff = document.createElement("p")
        highScoreAff.style.position = "relative"
        highScoreAff.style.color = "red"
        highScoreAff.className =`n${i}`
        highScoreAff.innerText = `${highScoresTab[i].score} : ${highScoresTab[i].name}`
        scoreTab.appendChild(highScoreAff)
        console.log(highScoresTab[i].score)
    }
    let close = document.createElement("p")
        close.innerText = "fermer"
        close.style.color = "red"
        close.className = "close"
    backGN.appendChild(close)
    let closeIt = document.querySelector(".close")
    closeIt.addEventListener("click", () => {
        scoreTab.remove()
        backGN.innerHTML = ""
        generateMenu()
    })
}




// Animation du fond ------------------------------------------------------------------------------------------
let backFondMove = () => {
    backFondPos++
    backFond.style = `background-position-y: ${backFondPos}px`
}
let backFrontMove = () => {
    backGNPos++
    backGN.style = `background-position-y: ${backGNPos}px`
}
let interFond = setInterval((backFondMove),backSpeed+30)
let interFront = setInterval((backFrontMove),backSpeed)

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

// Affichage stage ---------------------------------------------------------------------------------------------------------------
let stageAffEle = document.createElement("div")
stageAffEle.style.position = "absolute"
stageAffEle.innerText = `stage ${stage}`
stageAffEle.style.height = "400px"
stageAffEle.style.width = "700px"
stageAffEle.style.color = "red"
stageAffEle.style.fontSize = "100px"
stageAffEle.style.opacity = "0%"
stageAffEle.style.transition = "all 1.5s"
stageAffEle.style.top = "100px"
stageAffEle.style.left = "100px"

let stageAff = () => {
stageAffEle.innerText = `stage ${stage}`
backGN.innerHTML = ""
backGN.appendChild(stageAffEle)
setTimeout(() => {
    stageAffEle.style.opacity = "100%"
}, 10);

setTimeout(() => {
    stageAffEle.style.opacity = "0%"
}, 1500);

setTimeout(() => {
backGN.innerHTML = ""
generateEnnemis()
respawn()
}, 3000)
}

// LevelCleared------------------------------------------------------------------------------------------
let levelCleared = () => {
    console.log("---Level CLeared---")
    let projs = document.querySelectorAll(".projectile")
    projs.forEach(x => x.remove())
    stage++
    if(stage <= levelContent.length){
        stageAff()
    } else {
        console.log("---This is the End !---")
    }
}

//GameOver------------------------------------------------------------------------------------------
let gOverDisp = document.createElement("div")
    gOverDisp.style.height = "300px"
    gOverDisp.style.width = "700px"
    gOverDisp.innerText = "game over"
    gOverDisp.className = "gameOver"

let gameOver = () => {
    console.log("---GAMEOVER---")
    projs = document.querySelectorAll(".projectile")
    projs.forEach(x => x.remove())
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
    projs = document.querySelectorAll(".projectile")
    projs.forEach(x => x.remove())
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
let scoreAff = document.querySelector(".scoreAff")

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
    eneNb = levelContent[stage - 1]["eneNb"]
    for(let i=1; i<eneNb + 1; i++){
        enePosTab.push(i)
        let eneSaucer = document.createElement("div")
        eneSaucer.style.left =  `${eneLineInPos}px`
        eneSaucer.classList = `enemy ${i}`
        eneLine.appendChild(eneSaucer)
        eneLineInPos += 80
    }
}

let eneLinePos = eneLine.style.top.substring(0,eneLine.style.top.length-2)
let enemys = document.querySelectorAll(".enemy")
let lineLeft = document.querySelector(".line").getBoundingClientRect().x

    //déplacement de la ligne d'enemis------------------------------------------------------------------------------------------
    let moving = -5
    let moveEnemys = () => {
            lineLeft += moving
            eneLine.style.left = `${lineLeft}px`
            if(lineLeft<=0){moving = 5}
            if(lineLeft>=190){moving = -5}
            eneLinePos = eneLine.style.top.substring(0,eneLine.style.top.length-2)
            eneLinePos++
            eneLine.style.top = `${eneLinePos}px`
        }

    let movingEnemys = setInterval((moveEnemys),eneLatSpeed)
    if(eneLineLat===0){clearInterval(movingEnemys)}



    //Ennemi largue une bombe------------------------------------------------------------------------------------------
    let eneDropBomb = () => {
        let rand = Math.round(Math.random()*enePosTab.length)
        if(rand >= eneNb-1){rand--}
        let arrPos = enePosTab[rand]
        let eneTir = document.getElementsByClassName(`${arrPos}`)
        let horEne = eneTir[0].getBoundingClientRect().x
        let bomb = document.createElement("div");
            bomb.className = "bomb projectile"
            bomb.style.position = "absolute"
            bomb.style.zIndex ="-1"
            bomb.style.height = "25px"
            bomb.style.width = "25px"
            bomb.style.borderRadius = "50% 50%"
            bomb.style.background = "radial-gradient(rgb(125, 255, 151), rgb(51, 255, 249), rgba(251, 255, 249, 0.1))"

            eneLinePos = eneLine.style.top.substring(0,eneLine.style.top.length-2)
            bomb.style.top = `${eneLinePos + 80}px`

            bomb.style.left = `${horEne + 10}px`
        document.body.appendChild(bomb)
        console.log(eneLinePos)
        let bPos = Number(eneLinePos) + 30
        let bPosMin = 680
        

        let dropBomb = () => {
            bPos -=  - bPosSpeed
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
                        gameOver()
                    }else{
                        setTimeout(respawn, 1000)
                    }
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


    // Action des touches du clavier------------------------------------------------------------------------------------------
    let keyPress = (e) => {
        switch(e.code) {

            // Lancer un missile------------------------------------------------------------------------------------------
            case "Space" :
                let missile = document.createElement("div")
                    missile.classList = "missileAmi projectile"
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
                let vPosSpeed = 10
                let launchMiss = () => {
                    vPos -= vPosSpeed
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
                                    scoreAff = document.querySelector(".scoreAff")
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

    let movePlayer = () => {
        if(goLeft === true){
            if(horPlayer>0){
                horPlayer -= 5;}
                playerPos = document.querySelector(".player")
                playerPos.style.left = `${horPlayer}px`
        }
        if(goRight === true){
            if(horPlayer<750){
                horPlayer += 5;}
                playerPos = document.querySelector(".player")
                playerPos.style.left = `${horPlayer}px`
        }
    }

    let interMove = setInterval((movePlayer))



// RAZ bombes ennemies------------------------------------------------------------------------------------------
if(dropIt === 0){
    clearInterval(candanceBomb) 
}

// New Game ---------------------------------------------------------------------------------------------------------------
let newGame = () => {
    console.log("---NewGame---")
    menuToggle.remove()
    gameOn = 1
    motion = 1
    life = 1
    stage = 1
    dropIt = 1
    changeAllParameters(1)
    scoreAff = document.querySelector(".scoreAff")
    generateTop()
    stageAff()    
    generateLifes()
}


newG.addEventListener("click", newGame)
highScores.addEventListener("click", generateHighScores)


// RAZ animation fond------------------------------------------------------------------------------------------
if(motion === 0){
    clearInterval(interFond)
    clearInterval(interFront)
} 
if(gameOn===0){
    clearInterval(interMove)
    clearInterval(candanceBomb)
    clearInterval(movingEnemys)
}

//ToDo------------------------------------------------------------------------------------------
/*
    - avancement de la ligne ennemie
        - changer valeurs fixe en variable: - position départ bombe
    
    - affichage du score en fin de partie
        - ! multiplication des entrées

    - interface navigation
        
        - sélectionner niveau

        - about
    - ! empecher le tir si player inexistant

    - ! Réguler génération alétoir de position de tir ennemi

    - créer Boss et fin
*/