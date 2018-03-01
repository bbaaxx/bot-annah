// Importamos la libreria con la implementacion de HTTP de Node
// para poder servir contenido web y express para armar el servidor web
// morgan es para hacer logs a la consola cuando el servidor procesa una peticion
import http from 'http';
import morgan from 'morgan';
import express from 'express';

// Esto es para mantener vivo el proceso cuando usamos Glitch
import keepAlive from './utils/glitchKeepalive';

// Esta primera funcion configura la aplicacion de express que va a
// correr en el servidor http
export const getApp = () => new Promise((resolve, reject) => {
  try { 
    const app = express();
    
    // esta ruta esta aqui para mantener vivo el server con un keepalive
    app.get('/its-alive', (req, res) => res.json({ isAlive: true })); 
    
    // Aqui va la configuracion del servidor

    // Esto habilita el log a la consola cuando estamos en modo development.
    if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));

    // Aqui se pueden agregar mas rutas
    // ...
    app.get('/*', express.static('static'));

    resolve(app);
  } catch (err) {
    reject(err);
  }
  
});

// Esta function crea un servidor http
export const getServer = (app) =>
  Promise.resolve(http.createServer(app));

// Esta funcion corre el servidor web
export const runServer = ({ PORT }) => 
  server => {
    server.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
    keepAlive();
    return server;
  };

// Esta es la funcion que vamos a exportar y que se encarga de 
// correr las otras tres funciones en orden.
export default () => getApp()
  .then(getServer)
  .then(runServer(process.env));
