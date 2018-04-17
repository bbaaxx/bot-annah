// Este archivo es el punto de entrada de la aplicacion

// dotenv lee las variables de entorno desde un archivo .env
// que se encuentra en la raiz del proyecto
require('dotenv').config();

// usamos babel register para interpretar ES6 - alias Javascript Moderno :)
require('babel-register');
// Todos los 'requires' a partir de este punto son interpretados por babel
// ahora si importamos nuestra app
require('./app');
