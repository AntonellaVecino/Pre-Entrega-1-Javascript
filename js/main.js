//Actividad para la pre entrega: Hago un algoritmo mas complejo
/*
1) Hago una bienvenida, y un log in con el mail y la password
2) Creo un menú con algunas opciones de productos, un carrito donde pueda sacar cosas, y para finalizar la compra
3) Hacer que sea posible elegir entre varias opciones, y varias veces un producto, repitiendo el bucle las veces que necesite el usuario
4) Al confirmar pedido, poner para pagar con tarjeta de debito. Que pongan un dato numerico y, si es de 10 caracteres, confirmar pedido.
5) Dar mensaje de agradecimiento al finalizar una compra.
*/

//Declaro variables
let email = "antonella@hotmail.com";
let password = "1234";
let ingreso = false;
let cantidad;
let carrito = [];
let menu;
const IVA = 1.21;


//Acá comienza la bienvenida, y el ingreso del usuario con password y email
alert(
  "🥮 Bienvenido/a a la tienda virtual de la Pastelería Delicias Galegas 🥮"
);
alert(
  "Para acceder al Menú, ingresa a tu cuenta. Tendrás tres intentos. \n Una vez realizado el pedido, se enviará la información al mail ingresado."
);
for (let i = 2; i >= 0; i--) {
  let ingresoMail = prompt("Ingresa tu mail");
  let ingresoPass = prompt("Ingresa tu contraseña");
  if (ingresoMail === email && ingresoPass === password) {
    alert("Bienvenido/a");
    ingreso = true;
    break;
  } else {
    alert(
      "Dirección de mail y/o contraseña incorrecta. Ingresa un mail y una contraseña válidas. Te quedan " +
        i +
        " intentos."
    );
  }
}

//Mi array de productos
const productosALaVenta = [
  {id: 1, nombre: "Tarta de Queso", precio: 3000, ingredientes: ["Queso crema", " Azucar", " Leche", " Huevos", " Esencia"]},
  {id: 2, nombre: "Tarta de Santiago", precio: 1999.99, ingredientes: ["Bizcocho de vainilla", " almendras"]},
  {id: 3, nombre: "Torta Matilda", precio: 3500, ingredientes: ["Bizcocho de chocolate", " ganache de chocolate"]},
  {id: 4, nombre: "Torta de Frutilla", precio: 2590, ingredientes: ["Masa sablée de vainilla", " frutillas", " crema de leche"]}
];

//Declaro mis funciones:

//Funcion que recorre el array de productos y se los muestra al cliente
function mostrarProductos () {
  let listaProductos = (`Nuestros productos Disponibles: \n`);
productosALaVenta.forEach((producto) => {
  listaProductos += `ID: ${producto.id}. Producto: ${producto.nombre}. Ingredientes: ${producto.ingredientes}. $${(producto.precio * IVA).toFixed(2)}\n \n`;
});
  alert(listaProductos);
}

//Funcion para agregar más productos a la lista: 
let sumarId = productosALaVenta.length + 1;
function pasteles(nombre, precio, ingredientes) {
  this.nombre = nombre;
  this.precio = precio;
  this.ingredientes = ingredientes;
  this.id = sumarId++;
}

//Funcion que permite al cliente elegir una cantidad mediante un prompt

function elegirCantidad(cantidad) {
  do {
    cantidad = parseInt(prompt("¿Cuántas unidades deseas llevar?"));
  } while (isNaN(cantidad) || cantidad < 1);
  return cantidad;
}

//Función que recorre los productos que se han agregado en el carrito final y los suma.
function mostrarCarrito() {
  let carritoFinal = "Productos en el carrito: \n";
  let total = 0;
  carrito.forEach(function(producto) { 
    carritoFinal +=`producto: ${producto.nombre}, unidades:  ${producto.cantidad} \n`;
    total += (producto.precio * IVA) * producto.cantidad ;
  })
  carritoFinal += "Total de la Compra: " + total.toFixed(2);
  alert(carritoFinal);
    return carrito;
}

//Creo nuevos productos para pushear al array (Esto es mas una prueba de f(x) que genera productos)
const pastelNuevo1 = new pasteles("Larpeira", 5000, ["Bizcocho de vainilla", " crema pastelera"]);
const pastelNuevo2 = new pasteles("Torta Oreo", 6000, ["Bizcocho de chocolate", " crema con oreos", " dulce de leche"]);
const pastelNuevo3 = new pasteles("Pastel Red Velvet", 7500, ["Bizcocho de vainilla húmedo", " frosting de queso crema"]);
const pastelNuevo4 = new pasteles("Torta Brownie", 4550, ["Brownie de chocolate con nueces", " dulce de leche", " crema de leche"]);
productosALaVenta.push(pastelNuevo1);
productosALaVenta.push(pastelNuevo2);
productosALaVenta.push(pastelNuevo3);
productosALaVenta.push(pastelNuevo4);


//Si el ingreso es true, ejecuto este código que muestra el menú de opciones.

if(ingreso) {
  do{
    menu = parseInt(prompt("Accede a nuestros Productos, agrégalos a tu Carrito y Finaliza tu Compra: \n1- Productos \n2- Ver Carrito \n3- Finalizar Compra \n4- Eliminar producto del carrito \n5- Salir del Menú"));
    switch (menu) {  
      case 1: 
      //Muestro los productos al cliente, y hago que elijan uno, y su cantidad respectiva. 
        mostrarProductos();
        let eleccionDelCliente = prompt("Ingresa la Id del producto que quieres adquirir, para sumarlo a tu carrito."); 
        let productoElegido = productosALaVenta.find(producto => producto.id == eleccionDelCliente);
        let cantidadElegida = elegirCantidad();
        //Cuando el producto está elegido, igualo su cantidad a la cantidad que puso en el prompt para que se actualice en el carrito
        if (productoElegido) {
          productoElegido.cantidad = cantidadElegida;
          carrito.push(productoElegido);
          alert(`Se agregó al carrito: ${productoElegido.nombre}`);
        } else {
          alert("ID de producto no válido. Inténtalo de nuevo.");
        }
        break;
      case 2:
        //Acá simplemente muestro el carrito con el total y el id (por si se quiere sacar una cosa)
        mostrarCarrito();
        break;
      case 3:
        //Acá sumo todo lo del carrito y arrojo el total de la compra. 
        let total = carrito.reduce((acumulador, producto) => acumulador + ((producto.precio * IVA) * producto.cantidad), 0);
        alert(`Total de la compra: $${total.toFixed(2)}`);
        if (total === 0) {
          alert("Tu carrito está vacío! 🐀");
        } else {
        //Si el carrito no está vacio, pido los datos de la tarjeta
        tarjeta = prompt("Ingresa los 10 digitos de tu tarjeta.");
        if (tarjeta.length === 10) {
          alert("Pago Exitoso");
          alert("Muchas gracias por confiar en nosotros");
          //Acá reinicio el carrito y el total, para poder hacer otro pedido de 0
          carrito = [];
          total = 0;
          break;
        } else {
          alert("Error: Numero de tarjeta no válido");
        }
      }
        break;
      case 4: 
      if (carrito.length === 0) { 
        alert("Tu carrito está vacío! 🐀"); 
        break; 
      } 
      //Acá le pido al cliente que ponga la id del producto que quiere sacar del carrito
      let sacarId = parseInt(prompt("Ingresa el ID del producto que quieres sacar de tu carrito:")); 
      //Busco esa id en el carrito. Y si no está, arroja que no hay un id correcto
      let productoEliminado = carrito.find(producto => producto.id === sacarId); 
      if (productoEliminado) { 
        //acá hago que el carrito se actualice. El producto.id !== sacarId, asi lo puedo quitar del carrito.
        carrito = carrito.filter(producto => producto.id !== sacarId); 
        alert(`Se sacó ${productoEliminado.nombre} del carrito`); 
      } else { alert("ID de producto no válido. Inténtalo de nuevo."); 
    } break;
      case 5:
        alert("Saliendo del menu de productos");
        ingreso = false;
        break;
      default:
        alert("Opción no válida. Inténtalo de nuevo.");
        break;
    }
  }while (ingreso);
}
