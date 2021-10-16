const express = require('express');

//Se importan los servicios
const ProductosService = require('./../services/productoServices');
//Se importa el Middleware de validación
const validatorHandler = require('./../middlewares/validator.handler');
//Se importan los esquemas de validación
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/producto.schema');

const router = express.Router();
//Se crea una instancia de ese servicio en el routing de productos
const service = new ProductosService();

router.get('/', async (req, res) =>{
  //Defino los productos con el método find
  const productos = await service.find();
  res.json(productos);
});

router.get('/filtro', (req, res) =>{
  res.send('Soy un filtro :)');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>{
  try {
    const { id } = req.params;
    //Ya que es una promesa la que se está ejecutando se coloca un await
    const producto = await service.findOne(id);
    res.json(producto);
  } catch (error) {
    //Si hay un erro se ejecutan los middleware de tipo error :)
    next(error);
  }
});

/* El código a continuación es de un crud usando las convenciones de
POST, PATCH y DELETE en base a una ruta en específico, en este caso al
endpoint "products"
*/

//Para el método POST, es decir, para la creación.
//El body simplemente es la información enviada
router.post('/',
validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const nuevoProducto = await service.create(body);
  //Se usa el status 201 porque este es el código de estado de HTTP
  //que confirma el 'created'. Similar al código "404: Not Found" :)
  res.status(201).json(nuevoProducto);
});

//Para el metodo PATCH en donde podemos actualizar un producto sin
//tener que actualizar todos sus atributos
router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const producto = await service.update(id, body);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

//Para el método DELETE el cual no va a tener un cuerpo, simplemente
//le mandamos un identificador para que pueda hacer la eliminación
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await service.delete(id);
  res.json(respuesta);
});

//Se exporta el módulo router
module.exports = router;
