'use strict';
//Metodo que muestra un mensaje con la libreria de js Toastify
export function showMessage(message,type = "success"){
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success" ? "green" : "red",
        },
        onClick: function(){} // Callback after click
      }).showToast();  
}
//Metodo que muestra un mensaje con la libreria de js Toastify
export function showMessageInitial(message,type = "success"){
  Toastify({
      text: message,
      duration: 10000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: type === "success" ? "green" : "red",
      },
      onClick: function(){} // Callback after click
    }).showToast();  
}