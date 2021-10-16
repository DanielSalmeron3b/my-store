//Se importa todas las dependencias y/o librerías necesarias

const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const app = express();
const port = 3000;

//Se usa un Middleware para poder usar el método POST, DELETE, etc.
//El nombre del Middleware se llama express.json

app.use(express.json());

app.get('/', (req, res) =>{
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) =>{
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

//Los middleware de tipo error se deben poner despues del routerApi :O.
//Y deben ir en su respectivo orden
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log('Mi port' + port);
});
