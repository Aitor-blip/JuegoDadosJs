'use strict';

var arrayTablero = [];
var jugador = 0;
var posTotales = 99;
var oldx=0;
var oldy = 0;
window.onload = () =>{
    inicializar();
    dibujarTablero();
    movimientoPersonaje();
    generarBoton();
}

function dibujarTablero(){
    const tablero = document.querySelector(".tablero");
    while (tablero.firstChild) {
        tablero.removeChild(tablero.firstChild);
      }
    let divTablero = document.createElement("div");
    divTablero.classList.add("tablero");
    tablero.appendChild(divTablero);
   // arrayTablero[oldx][oldy].classList.add("hero");
    let cont = 0;
    for (let i = 0; i < 10;i++) {
        for (let j = 0; j < 10;j++) {
           let casilla = document.createElement("div");
            if(arrayTablero[i][j] == 1){
                casilla.classList.add("personaje","casilla");
            }else{
                casilla.classList.add("suelo","casilla");
            }
            
            casilla.setAttribute("numero",cont++);
            divTablero.appendChild(casilla);
        } 
        let divSalto = document.createElement("div");
        divSalto.classList.add("salto");
        divTablero.appendChild(divSalto);
         
    }
}

function movimientoPersonaje(){

    var divsPersonaje = document.getElementsByClassName("personaje");
    var divs = document.querySelectorAll(".casilla");
    for(let i=0;i<divsPersonaje.length;i++){
        var divPersonaje = divsPersonaje[i];
        divPersonaje.addEventListener("click",function(e){
        console.log(divPersonaje);
        if(jugador==0){
            jugador += 4;
        }
        console.log("Jugador "+jugador);

        let numeroAleatorio = getNumeroAleatorio();
        console.log("Numero Aleatorio : "+numeroAleatorio);

       })
    }
}

function generarBoton(){
    let divDado = document.createElement("div");
    divDado.classList.add("dado");
    let divBoton = document.createElement("div");
    divBoton.classList.add("boton");
    var container = document.querySelector(".container");
    let boton = document.createElement("button");
    boton.textContent="Tirar Dado";
    var imagen = document.createElement("img");
    if(imagen.src=""){
        imagen.src="../images/dado1.jpg";
    }
    container.appendChild(divBoton);
    divBoton.appendChild(boton);
    boton.addEventListener("click",function(e){
        let numero = 0;
        numero = getNumeroAleatorio();
        switch(numero){
            case 1:
                imagen.src="../images/dado1.jpg";
                break;
            case 2:
                imagen.src="../images/dado2.jpg";
                break;
            case 3:
                imagen.src="../images/dado3.jpg";
                break;
            case 4:
                imagen.src="../images/dado4.jpg";
                break;
            case 5:
                imagen.src="../images/dado2.jpg";
                break;
            case 6:
                imagen.src="../images/dado6.jpg";
                break;
            default:
        }
        getPosicionPersonaje(numero);
        dibujarTablero();
    });
    
    container.appendChild(divDado);
    divDado.appendChild(imagen);

}

function getNumeroAleatorio(){
    return Math.floor(Math.random() * (6 - 1) + 1);
}


function getPosicionPersonaje(avance){
    jugador = jugador + avance;
    let x = jugador%10-1;
    let y = parseInt(jugador/10)-1;
    arrayTablero[y][x] = 1;
    arrayTablero[oldy][oldx] = 0;
    oldx = x;
    oldy = y;
   // alert("Te has movido "+avance+" casillas");
   console.log("Casilla X Nueva : "+x);
   console.log("Casilla Y Nueva : "+y);
   console.log("Casilla X Old : "+oldx);
   console.log("Casilla Y Old : "+oldy);

   if(x==9 & y == 9){
    alert("Has ganado");
   }else{
    let diferencia = 99 -avance;
    console.log(diferencia);
   }
}

function inicializar(){

     for (let i = 0; i < 10;i++) {
        arrayTablero[i] = [];
        for (let j = 0; j < 10;j++) {
            arrayTablero[i][j] = 0;
        }
    }
    arrayTablero[0][0] = 1;
    let divTablero = document.createElement("div");
    divTablero.classList.add("tablero");
    let container = document.querySelector(".container");
    container.appendChild(divTablero);
}