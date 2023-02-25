import { GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import {auth} from '../js/firebase.js';
import {showMessage} from '../js/showMessage.js';
'use strict';
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click",async (e) =>{
    const provider = new GoogleAuthProvider();
    try{
        const credentials = await signInWithPopup(auth,provider);
        console.log(credentials);
        const loginModal = document.querySelector("#loginModal");
        const modal = boostrap.Modal.getInstance(loginModal);
        modal.hide();
        showMessage("Welcome "+credentials.user.displayName,"success");
    }catch(error){
        console.log(error);
    }
    
});