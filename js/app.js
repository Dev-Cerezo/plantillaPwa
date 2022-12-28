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