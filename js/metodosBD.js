//Imports necesarios para poder realizar las consultas e insert en la bd de cloud firestore
import { firebaseConfig } from "./firebase.js";
import { collection, addDoc,query,where,getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from './firebase.js';'use strict';

//Metodo que inserta datos en la coleccion de cloud firestore usuariosJuego
  export function insertarDatos(tiradas,arrayCasillas,fechaInicial,fechaFin){
        const docRef = addDoc(collection(db, "usuariosJuego"), {
            fechaInicial:fechaInicial,
            fechaFinal:fechaFin,
            recordTiradas:tiradas,
            movimientos : arrayCasillas
  });
}

//Metodo que inserta el nombre de usuario en la coleccion de cloud firestore users
export function insertarDatosNombre(nombre){
  const docRef = addDoc(collection(db, "users"), {
    nombre : nombre
});
}

//Metodo que ejecuta una funcion asincrona en la que lee las tiradas

  export function leerDatos(tiradas){
    console.log("Metodo leer datos");
      // Mostrar el alert
    alert("Leyendo Datos");

    // Esperar 2 segundos (2000 milisegundos)
    setTimeout(async function() {
      await funcionBd(tiradas);
      // continuar con el código aquí
    }, 2000);

    }

    //Metodo que lee las tiradas en el cual comprueba si el valor tiradas de la coleccion 
    //usuariosJuego es menor que el valor del campo recordTiradas saca un mensaje
    export async function funcionBd(tiradas){
        console.log("Estoy en el evento");
        const users = collection(db, "usuariosJuego");
        const consulta = query(users, where("recordTiradas", "!=", ""));
        const querySnapshot = await getDocs(consulta);
          querySnapshot.forEach((doc) => { 
            let record = doc.data().recordTiradas;
            if(record < tiradas){
              let mensajeWin = "Héroe, has establecido un récord de tiradas con "+tiradas+"tiradas";
              alert(mensajeWin);
            }else{
              let mensajeLose = "Récord no superado, el actual récord es "+recordTiradas;
              alert(mensajeLose);
            }
        });
      }
    
        
