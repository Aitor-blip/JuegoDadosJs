'use strict';
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");


export const loginCheck = user =>{
    if(user){
        loggedOut.forEach(link => link.style.display='none');
        loggedIn.forEach(link => link.style.display='block');
        /* const nuevo = "http://127.0.0.1:5501/html/index.html";
        window.location.href=nuevo; */
    }else{
        loggedOut.forEach(link => link.style.display='block');
        loggedIn.forEach(link => link.style.display='none');
      /*   const defecto = "http://127.0.0.1:5501/html/login.html";
        window.location.href=defecto; */
    }
};