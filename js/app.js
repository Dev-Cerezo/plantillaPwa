//Detectar si podemos usar Service worker
var url = window.location.href;
var swLocation = '/plantillapwa/sw.js';

if (navigator.serviceWorker) {

if (url.includes('localhost')) {
    swLocation = '/sw.js'
    //console.log("localhost")
}

    navigator.serviceWorker.register(swLocation)
}


function onFunction() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'ya esta en linea',
      showConfirmButton: true,
      timer: 10000
    })
  }
  
  function offFunction() {
    

    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'ya no esta en linea',
      showConfirmButton: true,
      timer: 10000
    })
  }