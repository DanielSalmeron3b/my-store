/*Dos funciones para middlewares de tipo error para poder hacer log
en la consola de un error y poder manejarlo con la funcion errorHandler.
Estos mismos se exportan con module.exports */

function logErrors (err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
