import '../js/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { auth } from './firebase.js';
import '../js/signUpForm.js';
import '../js/signInForm.js';
import '../js/logout.js';
import { loginCheck } from './loginCheck.js'; 
import '../js/googleLogin.js';
'use strict';

onAuthStateChanged(auth,(user)=>{
   loginCheck(user);
   
/* if(user){
   }else{
    loginCheck(user);
   } */
});