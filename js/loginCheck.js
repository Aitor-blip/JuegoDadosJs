'use strict';
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");


//Metodo que comprueba si ya se ha logueado el usuario
export const loginCheck = user =>{
    if(user){
        loggedOut.forEach(link => link.style.display='none');
        loggedIn.forEach(link => link.style.display='block');
/*         const nuevo = "http://localhost:5501/html/index.html";
        window.location.href=nuevo; */
    }else{
        loggedOut.forEach(link => link.style.display='block');
        loggedIn.forEach(link => link.style.display='none');
    }
};