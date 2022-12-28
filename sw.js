// imports
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v3';


const APP_SHELL = [
         //'/',
      
];

const APP_SHELL_INMUTABLE = [
    
];



self.addEventListener('install', e => { //instala los app shells


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {  //borra caches viejos

    const respuesta = caches.keys().then( keys => {
     
        keys.forEach( key => {
            console.log(key, STATIC_CACHE)
            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});





self.addEventListener( 'fetch', e => {//cargar las apis al cache dinamico y actualizar cache dinamico y estatico
console.log("request", e.request)
    let respuesta;
    if( e.request.url.includes('/api') ){
        
   respuesta = manejoApiMensajes(DYNAMIC_CACHE, e.request);
    }else{

     respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
                return res;
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
    
                });
    
            }
    
        });
    
    }


    


    e.respondWith( respuesta );

});


