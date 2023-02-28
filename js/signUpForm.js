import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
//Importo la autenticacion
import {auth} from './firebase.js';
import {showMessage} from './showMessage.js';
import '../js/InitialMessage.js';

'use strict';
console.log("Sign Up Form Console");
let form = document.querySelector("#signUp-form");
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let email = form['signUp-email'].value;
    let password = form['signUp-password'].value;

    console.log("Email : "+email);
    console.log("Password : "+password);

    //Creo el usuario y contraseña
    try{
    const newUser = await createUserWithEmailAndPassword(auth,email,password);
    console.log(newUser);
    const signUpModal = document.querySelector("#signUpModal");
    //console.log(signUpModal);
    const modal = bootstrap.Modal.getInstance(signUpModal);
    //Cuando se haya hecho el registro correctamente oculto el modal
    modal.hide();
    //Cuando se haya hecho el registro correctamente muestro el mensaje de bienvenida al usuario
    showMessage("Welcome "+ newUser.user.email,"success");

    const nuevo = "http://localhost:5501/html/index.html";
    window.location.href=nuevo;
    
    }catch(error){
      console.log(error.message);
      console.log(error.code);

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
    const defecto = "http://127.0.0.1:5501/html/login.html";
    window.location.href=defecto;
    }
});