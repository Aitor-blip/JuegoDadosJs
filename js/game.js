'use strict';

var arrayTablero = [];
var jugador = 0;
var oldfila=0;
var tiradas = 0;
var oldcolumna = 0;
window.onload = () =>{
    inicializar();
    dibujarTablero();
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
    let cont = 0;
    let posibles=0;
    for (let i = 0; i < 10;i++) {
        for (let j = 0; j < 10;j++) {
           let casilla = document.createElement("div");
            if(arrayTablero[i][j] == 1){
                casilla.classList.add("personaje","casilla");
                posibles = 6;
            }else{
                if(posibles > 0){
                    casilla.classList.add("posible","casilla");
                    posibles--;
                }else{
                    casilla.classList.add("suelo","casilla");
                }
                
            }
            if(arrayTablero[i][j] == 2){
                casilla.classList.remove("suelo","casilla");
                casilla.classList.add("cofre","casilla");
            }
            
            casilla.setAttribute("numero",cont++);
            divTablero.appendChild(casilla);
        } 
        let divSalto = document.createElement("div");
        divSalto.classList.add("salto");
        divTablero.appendChild(divSalto);
        eventosCasillas();
//        console.log(arrayTablero);
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
    if(!imagen.getAttribute("src")){
        imagen.setAttribute("src","../images/dado1.jpg");
    }
    container.appendChild(divBoton);
    divBoton.appendChild(boton);
    boton.addEventListener("click",function(e){
        tiradas++;
        console.log("Tiradas realizadas : "+tiradas);
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
                imagen.src="../images/dado5.jpg";
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
    console.log(oldfila+" "+oldcolumna);
    if((eval(jugador) + avance) > 99){
      jugador = 99 - (eval(jugador)+avance - 99);
    }else{
        jugador = eval(jugador) + avance;
    }
    console.log("Jugador : "+jugador);
    console.log("Casilla actual : "+jugador);
  
    let columna = jugador%10;
    let fila = parseInt(jugador/10);
    arrayTablero[fila][columna] = 1;
    if(fila != oldfila || columna!=oldcolumna){
        arrayTablero[oldfila][oldcolumna] = 0;
    }
    oldfila = fila;
    oldcolumna = columna;
    console.log(avance);
    console.log(fila+" "+columna);
    ganar(jugador);
   
   
}

function inicializar(){

     for (let i = 0; i < 10;i++) {
        arrayTablero[i] = [];
        for (let j = 0; j < 10;j++) {
            arrayTablero[i][j] = 0;
        }
    }
    arrayTablero[0][0] = 1;
    arrayTablero[9][9] = 2;
    let divTablero = document.createElement("div");
    divTablero.classList.add("tablero");
    let container = document.querySelector(".container");
    container.appendChild(divTablero);
}

function eventosCasillas(){
    let casillas = document.querySelectorAll(".casilla");
    for(let i=0;i<casillas.length;i++){
        casillas[i].addEventListener("click",(e)=>{
            if(casillas[i].classList.contains("posible")){
               casillas[i].classList.add("personaje");
               casillas[i].classList.remove("posible");
               let numero = casillas[i].getAttribute("numero");
               jugador = numero;
               let fila = parseInt(numero/10);
               let columna = parseInt(numero%10);
               arrayTablero[fila][columna] = 1;
               if(fila != oldfila || columna!=oldcolumna){
                arrayTablero[oldfila][oldcolumna] = 0;
               }
               console.log("Jugador : "+jugador);
                oldfila = fila;
                oldcolumna = columna;
                dibujarTablero();
                ganar(jugador);
            }
        })   
    }
}

function ganar(casilla){
    if(casilla == 99){
        alert("Héroe, has llegado al cofre en "+tiradas+" tiradas");
    }
}