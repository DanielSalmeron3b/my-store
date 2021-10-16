/* Acá estan las constantes para los middleware que se ocupan de
realizar validaciones. Las validaciones se manejan con una
dependencia llamada Joi */

const Joi = require('joi');

//Validaciones ;)

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//Esquemas de validación para los productos que reuna todos los campos
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

//Esquema de actualización
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

//Se hace la exportación

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
