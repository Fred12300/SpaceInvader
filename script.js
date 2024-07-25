let playerPos = document.querySelector(".player")
let backGNV = document.querySelector("#frameNV")
let backGN = document.querySelector("#frameN")
let backNV = -500;
let backN = -500;
let horPlayer = 300;
let keyPress = (e) => {
console.log(e.code);
switch (e.code) {
    case "Space" :
        let missile = document.createElement("div");
        missile.style = `
        position: absolute;
        z-index: -1;
        height: 50px;
        width: 6px;
        border-radius: 50% 50% 80% 80%;
        background: linear-gradient(black, darkgrey, grey, orange, yellow, rgb(255, 255, 255, 0.2));
        top : -60px;
        left: ${horPlayer + 18}px;`
        document.body.appendChild(missile)
        let vPos = 500;
        let vPosMin = 0;
        let vPosSpeed = 2;
        setInterval(()=>{
        vPos = vPos - vPosSpeed;
            if(vPos<vPosMin){
                missile.remove()
                return
            }
        console.log(vPos);
        missile.style.top = `${vPos}px`;
        } )
    break;
    case "ArrowLeft" :
        if(horPlayer>0){
        horPlayer -= 30;}
        playerPos.style.left = `${horPlayer}px`
    break;
    case "ArrowRight" :
        if(horPlayer<750){
        horPlayer += 30;}
        playerPos.style.left = `${horPlayer}px`
    break;
}
}

document.addEventListener("keydown", keyPress)

let motion = 0;
if(motion===1){setInterval(()=>{
    backNV++
    backGNV.style = `background-position-y: ${backNV}px`;
},40)
setInterval(()=>{
    backN++
    backGN.style = `background-position-y: ${backN}px`;
},10)}


