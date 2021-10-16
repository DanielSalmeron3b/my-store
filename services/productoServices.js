/* Aquí se define toda la logica transaccional que van a tener
nuestros datos, en este caso los productos. Aquí está toda la lógica
de negocio :) */

const faker = require('faker');

//Previo a una instalación se manda a llamar la dependencia "Boom"
//la cual sirve para el manejo de errores

const boom = require('@hapi/boom');

//Se define una clase para gestionar las funcionalidades de
//crear, editar, etc.
class ProductosService {

  /* Cuando se escribe async delante de las funciones, node.js la
  empieza a tratar como una promesa y las ejecuta de forma asíncrona :O */

  //Se necesita de un constructor
  constructor(){
    this.productos = [];
    this.generate();
  }

  async generate(){
    const limite = 100;
  for (let index = 0; index < limite; index++) {
    this.productos.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean()
    });
  }
  }
  //Funcion para crear

  //La data es de las peticiones que mande un usuario, las cuales son el
  //nombre, el precio y la imagen, mientras que el ID lo genera el código
  //de forma aleatoria usando faker
  async create(data){
    const nuevoProducto = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }
  //Funcion para buscar
  find(){
    return new Promise((resolve) =>{
      setTimeout(() => {
        resolve(this.productos);
      }, 3000);
    })
  }
  //Funcion para buscar solo un producto en específico
  async findOne(id){
    //const name = this.getTotal();
    const producto = this.productos.find(item => item.id === id);
    if (!producto){
      throw boom.notFound('Producto no encontrado :(');
    }
    if (producto.isBlock){
      throw boom.conflict('El producto está bloqueado por la tienda, no lo puedes ver :/');
    }
    return producto;
  }
  //Función para actualizar
  async update(id, changes){
    //Como es un array necesito saber la posición del elemento con
    //findIndex
    const index = this.productos.findIndex(item => item.id === id);
    //Se verifica que el index sí existe. Si no se encuentra lo más
    //normal es que devuelva un -1
    if(index === -1){
      throw boom.notFound('Producto no encontrado :(');
    }
    const producto = this.productos[index];
    this.productos[index] = {
      //Lo siguiente es para cambiar solo un parámetro de todo el objeto
      //y que persista la otra información
      ...producto,
      ...changes
    };
    return this.productos[index];
  }
  // Funcion para eliminar >:)
  async delete(id){
    //Sigue una lógica similar al update
    const index = this.productos.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado :(');
    }
    //Se elimina un elemento del array
    this.productos.splice(index, 1);
    return { id };
  }
}

module.exports = ProductosService;
