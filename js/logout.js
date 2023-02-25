import { signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import {auth} from '../js/firebase.js';
'use strict';
const logout = document.querySelector("#logout");

logout.addEventListener("click",async()=>{
   await signOut(auth);
   console.log("The user has signed out");
});