let enemyVPos = -100;
setInterval(()=>{
    vaisseau.clearRect(0, 0, canvas.width, canvas.height);
    enemyVPos=enemyVPos+1;
    vaisseau.fillRect( 100, enemyVPos, 100 , 100 )
    if(enemyVPos>600){
        enemyVPos = -100;
    }
})
const canvas = document.querySelector("canvas");
const vaisseau = canvas.getContext("2d");
vaisseau.fillStyle = "blue";



