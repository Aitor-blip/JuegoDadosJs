import { firebaseConfig } from "./firebase.js";
import { collection, addDoc,query,where,getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from './firebase.js';'use strict';

  export function insertarDatos(tiradas,arrayCasillas,fechaInicial,fechaFin){
        const docRef = addDoc(collection(db, "usuariosJuego"), {
            fechaInicial:fechaInicial,
            fechaFinal:fechaFin,
            recordTiradas:tiradas,
            movimientos : arrayCasillas
  });
}


export function insertarDatosNombre(nombre){
  const docRef = addDoc(collection(db, "users"), {
    nombre : nombre
});
}

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

    export async function funcionBd(tiradas){
        console.log("Estoy en el evento");
        const users = collection(db, "usuariosJuego");
        const consulta = query(users, where("recordTiradas", "!=", ""));
        const querySnapshot = await getDocs(consulta);
          querySnapshot.forEach((doc) => { 
            let record = doc.data().recordTiradas;
            if(record < 200){
              let mensajeWin = "Héroe, has establecido un récord de tiradas con "+tiradas+"tiradas";
              alert(mensajeWin);
            }else{
              let mensajeLose = "Récord no superado, el actual récord es "+recordTiradas;
              alert(mensajeLose);
            }
        });
      }
    
        
