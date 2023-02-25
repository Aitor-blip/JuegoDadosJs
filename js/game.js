




'use strict'; 
var result = 0;
const container = document.querySelector(".container");
var nTiradas =0;
var movido =false;
var arrayTablero = [];
const CASILLA = 0;
const PERSONAJE = 1;
const COFRE = 2;
const POSIBLE = 3;
const DESOCUPADA = 4;
var coordenada = {
    fila : 0,
    columna: 0
}

function generarTabla(){
    let table = document.createElement("table");
    for(let fila=1;fila<11;fila++){
        let tr = document.createElement("tr"); 
        tr.setAttribute("nFila",fila);
        for(let i=1;i<11;i++){
            let td = document.createElement("td");
            td.setAttribute("nCelda",i);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);

    let tds = document.querySelectorAll("td");
    for(let celda=0;celda<tds.length;celda++){
        tds[celda].setAttribute("nCelda",celda);
    }
    // Obtener la celda con el índice 99
    let celda99 = document.querySelector("table tr:nth-child(10) td:nth-child(10)");

    

// Obtener el valor del atributo de la celda
    var casillaCofre = celda99.getAttribute("nCelda");

    console.log(casillaCofre+"Ultima");
    
    celda99.classList.add("cofre");

    let personaje = document.querySelector("table tr:nth-child(1) td:nth-child(1)");

    let casillaPersonaje = personaje.getAttribute("nCelda");

    personaje.classList.add("personaje");

    console.log("Casilla Personaje : "+casillaPersonaje);
}

function generarDado(){

    let divContenedor = document.createElement("div");
    divContenedor.classList.add("contenedor");
    let divCubo = document.createElement("div");
    divCubo.classList.add("cubo");
    divCubo.id="cubo";
    for(let i=0;i<6;i++){
        let divCara = document.createElement("div");
        divCara.classList.add("cara");
        divCubo.appendChild(divCara);
    }

    let divDado =document.createElement("div");
    divDado.id="tirar";
    divDado.textContent="Tirar";

    container.appendChild(divContenedor);
    divContenedor.appendChild(divCubo);
    divContenedor.appendChild(divDado);
}

function eventoDado(){
    let divDado = document.querySelector("#tirar");
    divDado.addEventListener("click",(e)=>{
        var cubo = document.getElementById("cubo");
        document.getElementById("cubo").classList.remove('resul');
        cubo.innerHTML='<div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div>'
    });

    var cubo = document.getElementById("cubo");

cubo.addEventListener("animationend", function() {
  var cubo = document.getElementById("cubo");
  document.getElementById("cubo").classList.add('resul');
  var numero = Math.ceil(Math.random() * 6); 

  var p = document.createElement("p");
  p.style.fontSize="30px";
  p.style.fontWeight="700";
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
    resaltarDestino();
});
}

function reinicia() {
    var cubo = document.getElementById("cubo");
    document.getElementById("cubo").classList.remove('resul');
    cubo.innerHTML='<div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div><div class="cara"></div>'
}

function resaltarDestino(){

    console.log("Coordenada fila : "+coordenada.fila);

    let destinos ={
        fila:0,
        columna:0
    }
    //Primer Movimiento hacia abajo de la fila
    destinos.fila = coordenada.fila + result;
    destinos.columna = coordenada.columna;
    if(destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila<10 && destinos.columna <10){
        arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
    }

    console.log(destinos);

     //Segundo Movimiento hacia arriba de la fila
     destinos.fila = coordenada.fila - result;
     destinos.columna = coordenada.columna;
     if(destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila<10 && destinos.columna <10){
         arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
     }
     console.log(destinos);
      //Tercer Movimiento hacia la derecha de la columna
      destinos.fila = coordenada.fila;
      destinos.columna = coordenada.columna + result;
      if(destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila<10 && destinos.columna <10){
          arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
      }
      console.log(destinos);
      //Cuarto Movimiento hacia la izquierda de la columna
      destinos.fila = coordenada.fila;
      destinos.columna = coordenada.columna - result;
      if(destinos.fila >= 0 && destinos.columna >= 0 && destinos.fila<10 && destinos.columna <10){
          arrayTablero[destinos.fila][destinos.columna] = POSIBLE;
      }

      console.log(destinos);




}

function inicializarArrayTablero(){
    for(let i=0;i<10;i++){
        arrayTablero[i]= [];
        for(let j=0;j<10;j++){
            arrayTablero[i][j] = CASILLA;
        }    
    }
    arrayTablero[0][0] = PERSONAJE;
    arrayTablero[9][9] = COFRE;
}


window.onload = function(){
    inicializarArrayTablero();
    generarTabla();
    generarDado();
    eventoDado();
    reinicia();
};