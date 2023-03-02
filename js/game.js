//Imports de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {app,firebaseConfig} from '../js/firebase.js';
import {insertarDatos,leerDatos} from './metodosBD.js';
'use strict'; 
//Variable result
var result = 0;
// Fecha de inicio de la partida
var fechaInicio = new Date();
// Variable mes que sumo 1 porque el primer mes es 0
var mesInicio = fechaInicio.getMonth()+1;
//Fecha Fin que la inicializaremos cuando ganemos la partida
var fechaFin;
fechaInicio = fechaInicio.getDate()+"/ "+mesInicio+" / "+fechaInicio.getFullYear()+" "+fechaInicio.getHours()+" : "+fechaInicio.getMinutes()+" : "+fechaInicio.getSeconds();
const container = document.querySelector(".container");
//Acumulamos el numero de tiradas
var nTiradas = 0;
//Array de las casillas del tablero
var arrayTablero = [];
//Array de las casillas usadas
var arrayCasillasUsadas = [];
var inicio=true; //indica el principio del juego
var movimiento=false; //controla cuando puedo moverme a una nueva casilla y cuando el dado esta activo o no.
//Valores que acumulamos para la logica del juego
const PERSONAJE = 1;
const CASILLA = 0;
var ganador = false;
const COFRE = 2;
const POSIBLE = 3;
const USADA = 4;
var coordenada = {
    fila: 0,
    columna: 0
}
//Metodo que inializa el tablero de casillas del jueg
function inicializarArrayTablero() {
    for (let i = 0; i < 10; i++) {
        arrayTablero[i] = [];
        for (let j = 0; j < 10; j++) {
            arrayTablero[i][j] = CASILLA;
        }
    }
    arrayTablero[0][0] = PERSONAJE;
    arrayTablero[9][9] = COFRE;
}

//Metodo que genera la tabla del juego
function generarTabla() {
    let table = document.createElement("table");
    for (let fila = 0; fila < 10; fila++) {
        let tr = document.createElement("tr");
        tr.setAttribute("nFila", fila);
        for (let i = 0; i < 10; i++) {
            let td = document.createElement("td");
          
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);

    let tds = document.querySelectorAll("td");
    for (let celda = 0; celda < tds.length; celda++) {
        tds[celda].setAttribute("nCelda", celda);
    }
    
}

//Metodo que actualiza la tabla en base a el valor de donde se puede mover el personaje
function actualizarTabla(){
    //ahora asigno a cada celda su correspodiente aspecto en funcion de la tabla de array
    for(let fila=0; fila<arrayTablero.length;fila++){
        for(let columna=0; columna<arrayTablero[fila].length;columna++){
            let celda= document.querySelector("table tr:nth-child("+(fila+1)+") td:nth-child("+(columna+1)+")");
                    switch(arrayTablero[fila][columna]){
                        case PERSONAJE:
                            celda.removeAttribute("class");  //Borro todas las clases del elemento
                            celda.classList.add("personaje"); //le pongo la clase personaje
                            break;
                        case CASILLA:
                            celda.removeAttribute("class");  //Borro todas las clases del elemento
                            celda.classList.add("casilla"); //le pongo la clase personaje
                            break;
                        case POSIBLE:
                            celda.removeAttribute("class");  //Borro todas las clases del elemento
                            celda.classList.add("destino"); //le pongo la clase destino
                            break;
                        case USADA:
                            celda.removeAttribute("class");  //Borro todas las clases del elemento
                            celda.classList.add("usada");
                                //Almaceno en un array las casillas que ha usado el personaje
                                if(celda.classList.contains("usada")){
                                    arrayCasillasUsadas.push(celda.getAttribute("nCelda"));
                                }
                            break;
                        case COFRE:
                            celda.classList.add("cofre"); //le pongo la clase cofre
                            break;

                    }
                    
        }
    }
    //Indicamos a donde se puede mover el jugador
    eventoDestino();
    // Obtener la ultima celda donde va el cofre del tesoro 
  /*  let ultimaCelda = document.querySelector("table tr:nth-child(10) td:nth-child(10)");
    ultimaCelda.classList.add("cofre"); //le pongo la clase cofre
*/
}

//Generamos el dado de forma asincrona
function generarDado() {

    let divContenedor = document.createElement("div");
    divContenedor.classList.add("contenedor");
    let divCubo = document.createElement("div");
    divCubo.classList.add("cubo");
    divCubo.id = "cubo";
    for (let i = 0; i < 6; i++) {
        let divCara = document.createElement("div");
        divCara.classList.add("cara");
        divCubo.appendChild(divCara);
    }

    let divDado = document.createElement("div");
    divDado.id = "tirar";
    divDado.textContent = "Tirar";



    container.appendChild(divContenedor);
    divContenedor.appendChild(divCubo);
    divContenedor.appendChild(divDado);

}

//Metodo que almacena donde se puede mover el usuario
function eventoDestino(){
    movimiento=false;
    let celdasDestino = document.querySelectorAll(".destino");
    if(celdasDestino!=undefined){
        console.log(celdasDestino.length);
        celdasDestino.forEach(element => {
        element.addEventListener("click",(e) => {
            //console.log("pulsado destino "+element.getAttribute("nCelda"));

            //obtengo la fila y columna de la celda pulsada
            console.log("fila: "+element.parentNode.rowIndex+" Columna:"+element.cellIndex);
            let fila=element.parentNode.rowIndex;
            let columna=element.cellIndex;
            moverPersonaje(fila,columna);
            movimiento=false;
         });
    });
    }
    
}

//Metodo que quita los destinos anteriores de donde no se puede mover el usuario
function quitarDestinos(){
    //Si hay celdas posibles las deshabilitamos para que se el personaje no se pueda mover a una de esas celdas
    for (let i = 0; i < arrayTablero.length; i++) {
             for (let j = 0; j < arrayTablero[i].length; j++) {
            if(arrayTablero[i][j]==POSIBLE){
                arrayTablero[i][j] = CASILLA;
            }
           
    }
}
}
//Metodo que mueve al personaje
function moverPersonaje(f,c){
    movimiento = false;
    /* le quito de donde este y le situo en las nuevas coordenadas*/
    let personaje=document.querySelector(".personaje");
    let fila=personaje.parentNode.rowIndex;
     let columna=personaje.cellIndex;
     console.log("fila personaje : "+fila+" Columna personaje:"+columna);
    arrayTablero[fila][columna]=USADA;
  /*  let celdaAntigua= document.querySelector("table tr:nth-child("+(fila+1)+") td:nth-child("+(columna+1)+")");
    celdaAntigua.classList.remove("personaje");
    console.log("nueva fila personaje : "+f+" nueva Columna personaje:"+c);*/
    arrayTablero[f][c]=PERSONAJE;
    movimiento = true;
   /* let celdaNueva= document.querySelector("table tr:nth-child("+(f+1)+") td:nth-child("+(f+1)+")");
    celdaNueva.classList.add("personaje");*/
    //Actualizo el numero de Tiradas
    nTiradas++;
    quitarDestinos();
    actualizarTabla();
    comprobarGanador();
    
/*     console.log("Array de casillas usadas : ");
    console.log(arrayCasillasUsadas); */

}

//Metodo que genera el html del dado en 3d
function eventoDado() {
    let divDado = document.querySelector("#tirar");
    divDado.addEventListener("click", (e) => {
        if(!movimiento){
               var cubo = document.getElementById("cubo");
              document.getElementById("cubo").classList.remove('resul');
              cubo.innerHTML = '<div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div>';
              movimiento=true;
        }
    });

    var cubo = document.getElementById("cubo");
    
    //evento de cuando la animación se completa
    cubo.addEventListener("animationend", function () {
        var cubo = document.getElementById("cubo");
        document.getElementById("cubo").classList.add('resul');
        var numero = Math.ceil(Math.random() * 6);

        var p = document.createElement("p");
        p.style.fontSize = "30px";
        p.style.fontWeight = "700";
        switch (numero) {
            case 1:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9ce32f-dado1.png">';
                break;
            case 2:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9d15f6-dado2.png">';
                break;
            case 3:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9d48bd-dado3.png">';
                break;
            case 4:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9d7bc5-dado4.png">';
                break;
            case 5:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9daa7f-dado5.png">';
                break;
            case 6:
                cubo.innerHTML = '<img src="http://www.lawebdelprogramador.com/usr/147000/147685/527560a9ddd30-dado6.png">';
                break;
        }
        result = numero;
        //Esto se hace para que el dado al reiniciar la partida no genere una tirada
        if(inicio){
          inicio=false;
              
        }else{
            resaltarDestino();
            actualizarTabla();
        }
      
    });
}

//Funcion que genera de nuevo el html del dado
function reinicia() {
    var cubo = document.getElementById("cubo");
    document.getElementById("cubo").classList.remove('resul');
    cubo.innerHTML = '<div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div>'
}

//Metodo que comprueba el ganador del juego
function comprobarGanador(){
    if(arrayTablero[arrayTablero.length-1][arrayTablero[0].length-1]==PERSONAJE){
        let mensaje = "Héroe, has llegado al cofre en número "+nTiradas+"tiradas";
        alert(mensaje);
        ganador = true;
        if(ganador){
            console.log("Has ganado");

            fechaFin = new Date();
            var mes = fechaFin.getMonth()+1;
            fechaFin = fechaFin.getDate()+"/ "+mes+" / "+fechaFin.getFullYear()+" "+fechaFin.getHours()+" : "+fechaFin.getMinutes()+" : "+fechaFin.getSeconds();
            console.log(fechaFin);
            insertarDatos(nTiradas,arrayCasillasUsadas,fechaInicio,fechaFin);
            leerDatos(nTiradas);
            recargarPagina();
        }
    }
}

//Funcion que recarga la pagina despues de 5 segundos de haber mostrado el mensaje de las tiradas
function recargarPagina(){
    alert("La pagina se va a recargar en 5 segundos")
    setTimeout(function() {
        location.reload();   
      }, 5000);      
}

//Metodo que comprueba si el jugador se puede mover
function comprobarNoHaySalida(){
    // si no hay posibilidad de  mover
    let contador=0;
    for (let i = 0; i < arrayTablero.length; i++) {
            for (let j = 0; j < arrayTablero[0].length; j++) {
            if (arrayTablero[i][j] == POSIBLE){
                contador++;
            }
        }
    }
    if (contador==0){
        alert("No has mas movimientos disponibles");
        ganador = false;
        leerDatos(nTiradas);
    }
}

//Metodo que resalta el destino
function resaltarDestino() {

    let personaje=document.querySelector(".personaje");
    let f=personaje.parentNode.rowIndex;
     let c=personaje.cellIndex;

    let destinos = {
        fila: 0,
        columna: 0
    }
    //Primer Movimiento hacia abajo de la fila
    destinos.fila = f + result;
    destinos.columna = c;
    if (destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila < 10 && destinos.columna < 10 && arrayTablero[destinos.fila][destinos.columna]!=USADA) {
        arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
    }

    console.log(destinos);

    //Segundo Movimiento hacia arriba de la fila
    destinos.fila = f - result;
    destinos.columna = c;
    if (destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila < 10 && destinos.columna < 10 && arrayTablero[destinos.fila][destinos.columna]!=USADA) {
        arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
    }
    console.log(destinos);
    //Tercer Movimiento hacia la derecha de la columna
    destinos.fila = f;
    destinos.columna = c + result;
    if (destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila < 10 && destinos.columna < 10 && arrayTablero[destinos.fila][destinos.columna]!=USADA) {
        arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
    }
    console.log(destinos);
    //Cuarto Movimiento hacia la izquierda de la columna
    destinos.fila = f;
    destinos.columna = c - result;
    if (destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila < 10 && destinos.columna < 10 && arrayTablero[destinos.fila][destinos.columna]!=USADA) {
        arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
    }
    //console.log(destinos);
    comprobarNoHaySalida();
}


//Evento que se genera al recargar la pagina

window.onload = function () {
    inicializarArrayTablero();
    generarTabla();
    actualizarTabla();
    generarDado();
    eventoDado();
    reinicia();

   
 
};