import { firebaseConfig } from "./firebase.js";
import { collection, addDoc,query,where,getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { db } from './firebase.js';
import {fechaInicial,fechaFinal,nTiradas,arrayCasillasUsadas} from './game.js';
'use strict';
export function insertarDatosInicio(){
      
            window.addEventListener(("load"),async(e)=>{
             try {
              console.log(nTiradas);
                const docRef = await addDoc(collection(db, "users"), {
                    nombre : "Aitor",
                    fechaInicial:fechaInicial,
                    fechaFinal:fechaFinal,
                    recordTiradas:nTiradas,
                    nCasillasUsadas:arrayCasillasUsadas.length
            });
            console.log("Datos Insertados");
          } catch (e) {
            console.error("Error adding document: ", e);
            alert("Fallo al insertar");
          }  
    }); 
  }

  export function insertarDatosFinal(){

    let td = document.querySelector("table tr:nth-child(10) td:nth-child(10)");
    td.addEventListener("click",async(e)=>{
    try {
      console.log(nTiradas);
        const docRef = await addDoc(collection(db, "users"), {
            nombre : "Aitor",
            fechaInicial:fechaInicial,
            fechaFinal:fechaFinal,
            recordTiradas:nTiradas,
            nCasillasUsadas:arrayCasillasUsadas.length
    });
    console.log("Datos Insertados");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Fallo al insertar");
  }  
}); 
}

  export function leerDatos(){
    const users = collection(db, "users");
    window.addEventListener("DOMContentLoaded",async(e)=>{
    // Create a query against the collection.
        const recordTiradas = query(users, where("recordTiradas", ">=", "0"));
        const querySnapshot = await getDocs(recordTiradas);
        querySnapshot.forEach((doc) => {
        console.log("Id : "+doc.id, " => ","Record Tiradas : "+doc.data().recordTiradas);
        if(doc.data().recordTiradas >= 1){
            alert("Hay tiradas");
        }else if(doc.data().recordTiradas <=0 || doc.data().recordTiradas === undefined){
            alert("No hay tiradas");
        }
        });
    });
}


