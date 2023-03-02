//Imports de firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { auth } from './firebase.js';
import { showMessage} from './showMessage.js';
import {insertarDatosNombre} from './metodosBD.js';
'use strict';
const signInForm = document.querySelector('#login-form');
//Metodo de firebase que loguea un usuario
signInForm.addEventListener("submit",async (e) =>{
    e.preventDefault();
    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;
    console.log("Email : "+email);
    console.log("Password : "+password);
    //Insertamos el nombre de usuarios en la coleccion users de cloud firestore
    insertarDatosNombre(email);
    try{  
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        const emailUser = userCredentials.user.email;
        const modal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'));
        modal.hide();
        
        showMessage("Welcome "+emailUser,"success");
        const nuevo = "http://localhost:5501/html/index.html";
        window.location.href=nuevo;
    }catch(error){
          //Validacion de errores
        if(error.code === 'auth/email-already-in-use'){
            showMessage("Email already in use","error");
        }else if(error.code === 'auth/invalid-email'){
            showMessage('Invalid email',"error");
        }else if(error.code === 'auth/weak-password'){
            showMessage('Password is too weak',"error");
        }else if(error.code){
            showMessage('Something went wrong',"error");
        }
 
/*         const defecto = "http://127.0.0.1:5501/html/login.html";
        window.location.href=defecto; */
    }
});

