

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {
    //console.log('res: ', res.ok)
   
       if ( res.ok ) {
   
           return caches.open( dynamicCache ).then( cache => {
   
               cache.put( req, res.clone() );
               
               return res.clone();
   
           });
   
       } else {
           return res;
       }
   
   }
   
   // Cache with network update
   function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {
   
   
       if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
           // No hace falta actualizar el inmutable
           // console.log('existe en inmutable', req.url );
   
       } else {
           // console.log('actualizando', req.url );
           return fetch( req )
                   .then( res => {
                       return actualizaCacheDinamico( staticCache, req, res );
                   });
       }
   
   
   
   }
   
   function manejoApiMensajes(cacheName, req){
       
     return fetch(req).then( res => {
   
           if (res.ok) {
               actualizaCacheDinamico( cacheName, req, res.clone() );
               return res.clone();
           }else {
               return caches.match(req)
           }
   
       }).catch(err => {
           return caches.match(req)
       })
   } 
   
   
   
   
   
   
   
   
   
   
   /*function actaulizaCacheDinamico(dynamicCache, req, res){
       console.log("fetch3: ",res)
       if (res.ok) {
           caches.open( dynamicCache ).then( cache => {
               cache.put(  req, res.clone() );
       
               return res.clone();
           })
       }else{
           return res;
       }
       
       }*/