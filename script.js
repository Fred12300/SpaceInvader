let playerPos = document.querySelector(".player")
let horPlayer = 300;
let keyPress = (e) => {
console.log(e.code);
switch (e.code) {
    case "Space" :
        let miss = document.createElement("div");
        miss.style = `
        position: relative;
        height: 50px;
        width: 20px;
        background-color: black;
        top : -60px;`
        playerPos.appendChild(miss)
        let vPos = -10;
        let vPosMin = -550;
        let vPosSpeed = 5;
        setInterval(()=>{
        vPos = vPos - vPosSpeed;
            if(vPos<vPosMin){
                miss.remove()
                return
            }
        console.log(vPos);
        miss.style.top = `${vPos}px`;
        } )
    break;
    case "ArrowLeft" :
        horPlayer -= 15;
        playerPos.style.left = `${horPlayer}px`
    break;
    case "ArrowRight" :
        horPlayer += 15;
        playerPos.style.left = `${horPlayer}px`
    break;
}
}

document.addEventListener("keydown", keyPress)


