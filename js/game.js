'use strict';

var arrayTablero = [];
var posX = 0;
var posY = 0;
var posTotales = 99;
window.onload = () =>{
    arrayTablero = inicializarTablero(10,10);
    dibujarTablero();
    let posicionPersonaje = getPosicionPersonaje(posX,posY);
    movimientoPersonaje(posX,posY);
}

function inicializarTablero(nFilas,nColumnas){

    for (let i = 0; i < nFilas;i++) {
        arrayTablero[i]= [];
        for (let j = 0; j < nColumnas;j++) {
           arrayTablero[i][j] = 0;
        }   
    }
    //1 Heroe 
    //0 Casillas restantes
    arrayTablero[posX][posY] = 1;
    return arrayTablero;
}

function dibujarTablero(){
    const container = document.querySelector(".container");
    for (let i = 0; i < 10;i++) {
        for (let j = 0; j < 10;j++) {
            let casilla = document.createElement("div");
            if(arrayTablero[i][j] == 1){
                casilla.classList.add("personaje","casilla");
            }else{
                casilla.classList.add("suelo","casilla");
            }
            container.appendChild(casilla);
        } 
        let divSalto = document.createElement("div");
        divSalto.classList.add("salto");
        container.appendChild(divSalto);  
    }
}

function movimientoPersonaje(posX,posY){

    var divsPersonaje = document.getElementsByClassName("personaje");
    var divs = document.querySelectorAll(".casilla");
    for(let i=0;i<divsPersonaje.length;i++){
        var divPersonaje = divsPersonaje[i];
        divPersonaje.addEventListener("click",function(e){
        console.log(divPersonaje);
        posX = posX+2;
        
        if(posX > 9){
            posY=1;
        }

        if(posX > 19){
            posY=2;
        }

        if(posX > 29){
            posY=3;
        }

        if(posX > 39){
            posY=4;
        }

        if(posX > 59){
            posY=5;
        }

        if(posX > 69){
            posY=6;
        }

        if(posX > 79){
            posY=7;
        }

        if(posX > 89){
            posY=8;
        }

        if(posX >= 99){
            posY=9;
        }

        divPersonaje.classList.remove("personaje");
        let hasPersonajeClass = divPersonaje.classList.contains("personaje");
        if(!hasPersonajeClass){
            console.log("No tiene la clase personaje");
            divPersonaje.removeEventListener("click",divPersonaje,false);
            let newdiv = divs[posX];
            newdiv.style.backgroundColor="blue";
            console.log(posX);
            console.log(posY);
            divPersonaje.style.backgroundColor="black";
        }

       })
    }
}


function getPosicionPersonaje(posX,posY){
    return arrayTablero[posX][posY];
}