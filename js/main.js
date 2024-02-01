//Actividad para la pre entrega: Hago un algoritmo mas complejo
/*
1) Hago una bienvenida, y un log in con el mail y la password
2) Creo un menú con algunas opciones de productos, 1 opcion de hacer pedido y otra opcion de cerrar menu
3) Hacer que sea posible elegir entre varias opciones, y varias veces un producto, repitiendo el bucle las veces que necesite el usuario
4) Al confirmar pedido, poner para pagar con tarjeta de debito. Que pongan un dato numerico y, si es de 10 caracteres, confirmar pedido.
5) Dar mensaje de agradecimiento al finalizar una compra.
*/

alert(
  "🥮 Bienvenido/a a la tienda virtual de la Pastelería Delicias Galegas 🥮"
);

let email = "antonella@hotmail.com";
let password = "1234";
let ingreso = false;
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

//Hago variables y Constante IVA
let pedido = 0;
let menu = prompt(
  "Nuestro Menú: \n1- Carrot Cake 🥕  \n2- Tarta de Santiago 🥧 \n3- Cheesecake Gallego 🍮 \n4- Tarta de Almendras 🥮 \n5- Torta Matilda 🍫 \n6-Tiramisú 🥯 \n7-Selva Negra 🍩  \n8-Tarta de Fresa 🍰 \n9- Confirmar Pedido \n10- Salir del menu"
);
let compra = prompt(
  "Para agregarlo al carrito, ingresa Aceptar. Sino, cancelar. \n Recuerda que el IVA (21%) estará incluido en tu pedido."
);
let cantidad = parseInt(prompt("¿Cuantas unidades quieres comprar?"));;
const IVA = 1.21;

//Función para ejecutar todas las compras:
function realizarCompra(precio) {
  compra = prompt(
    "Para agregarlo al carrito, ingresa Aceptar. Sino, cancelar. \n Recuerda que el IVA (21%) estará incluido en tu pedido."
  );
  switch (compra) {
    case "Aceptar":
      cantidad = parseInt(prompt("¿Cuantas unidades quieres comprar?"));
      precio = precio * IVA;
      pedido = pedido + (precio * cantidad);
      alert("Agregado al carrito. Tu pedido es de $" + pedido);
      return pedido;
    default:
      alert("No agregaste nada al carrito");
  }
}

//Si el ingreso es verdadero, accede al menu:
if (ingreso) {
  do {
    menu = prompt(
      "Nuestro Menú: \n1- Carrot Cake 🥕  \n2- Tarta de Santiago 🥧 \n3- Cheesecake Gallego 🍮 \n4- Tarta de Almendras 🥮 \n5- Torta Matilda 🍫 \n6-Tiramisú 🥯 \n7-Selva Negra 🍩  \n8-Tarta de Fresa 🍰 \n9- Confirmar Pedido \n10- Salir del menu"
    );
    switch (menu) {
      case "1":
        alert("El precio de la Carrot Cake es de $" + 5000);
        realizarCompra(5000);
        break;
      case "2":
        alert("El precio de la Tarta de Santiago es de $" + 3000);
        realizarCompra(3000);
        break;
      case "3":
        alert("El precio del Cheesecake Gallego es de $" + 8000);
        realizarCompra(8000);
        break;
      case "4":
        alert("El precio de la Tarta de Almendras es de $" + 6000);
        realizarCompra(6000);
        break;
      case "5":
        alert("El precio de la Torta Matilda es de $" + 7000);
        realizarCompra(7000);
        break;
      case "6":
        alert("El precio del Tiramisú es de $" + 4500);
        realizarCompra(4500);
        break;
      case "7":
        alert("El precio de la Torta Selva Negra es de $" + 5500);
        realizarCompra(5500);
        break;
      case "8":
        alert("El precio de la Tarta de Fresa es de $" + 2500);
        realizarCompra(2500);
        break;
      case "9":
        alert("El total de tu pedido es de $" + pedido);
        tarjeta = prompt("Ingresa los 10 digitos de tu tarjeta.");
        if (tarjeta.length === 10) {
          alert("Pago Exitoso");
          alert("Muchas gracias por confiar en nosotros");
          break;
        } else {
          alert("Error: Numero de tarjeta no válido");
        }
        break;
      case "10":
        alert("Saliendo del menú. Muchas gracias por visitarnos.");
        break;
      default:
        alert("Opción no válida. Inténtalo de nuevo.");
    }
  } while (menu !== "10");
} else {
  alert("Intenta ingresar nuevamente.");
}
