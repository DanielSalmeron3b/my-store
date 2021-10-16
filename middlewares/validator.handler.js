/* Middleware para la validación. Es un middleware dinámico, solo
recibe el esquema a validar y la propiedad (es decir en dónde encontrar
la información)*/

const boom = require('@hapi/boom');

function validatorHandler (schema, property) {
  return (req, res, next) =>{
    //El req[property] obtiene la información de manera dinámica
    //ya que esta puede venir como body, params, query, etc.
    const data = req[property];
    /* Se verifica que la información que se recibe cumple con el
    esquema. El abortEarly es para que muestre todos los errores y no
    solo uno */
    const { error } = schema.validate(data, { abortEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
