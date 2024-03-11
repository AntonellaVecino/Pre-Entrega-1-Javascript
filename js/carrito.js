//Constantes del formulario
const nombreInput = document.querySelector("#nombrePagos");
const telInput = document.querySelector("#telefono");
const domicilioInput = document.querySelector("#domicilio");
const formulario = document.querySelector(".formularioCompra");

let productosElegidos = localStorage.getItem("productosEnElCarrito");
//lo hice asi porque sino me da error, y no se me cambia el carrito.
productosElegidos = JSON.parse(productosElegidos);
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorProductos = document.querySelector("#carritoConProductos");
const contenedorAcciones = document.querySelector("#accionesDelCarrito");
const contenedorConfirmaCompra = document.querySelector(".carritoPagado");
//traigo al iva
const IVA = 1.21;
let botonesParaEliminar = document.querySelectorAll(".botonBorrarCarrito");
const botonVaciar = document.querySelector("#vaciarCarrito");
const elTotal = document.querySelector("#totalCompra");
const confirmaCompra = document.querySelector("#comprarCarrito");

//funciones del sistema del carrito:
function losProductosCarrito() {
  //Así me aparece el mensaje del carrito vacio
  if (productosElegidos && productosElegidos.length > 0) {
    contenedorCarritoVacio.classList.add("d-none");
    contenedorProductos.classList.remove("d-none");
    contenedorAcciones.classList.remove("d-none");
    contenedorConfirmaCompra.classList.add("d-none");

    //lo inicio vacío
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carritoProducto");
      div.innerHTML = `
            <div class="d-flex productoEnCarrito pt-3">
            <img src="${producto.img}" class="imagenProducto" alt="${
        producto.nombre
      }">
            <div class="tituloProductoCart">
            <h4>${producto.nombre}</h4>
            </div>
            <div class="cantidadCarrito">
            <p><small>${producto.cantidad}</small></p>
            </div>
            <div class="precioProductoCart">
            <p><small>Precio:</small></p>
            <p><strong>${(producto.precio * IVA).toFixed(2)}</strong></p>
            </div>
            <div class="subtotalCarrito">
            <p><strong>Subtotal:</strong></p>
            <p>${(producto.precio * IVA).toFixed(2) * producto.cantidad}</p>
            </div>
            <button type="button" class="btn botonBorrarCarrito" id="${
              producto.id
            }"><i class="bi bi-trash"></i></button>
            </div>
            `;
      contenedorProductos.append(div);
    });
  } else if (comprarCosas()) {
    //Aca vuelvo a poner todo a la normalidad---> ver si es si o si necesario
    contenedorCarritoVacio.classList.add("d-none");
    contenedorProductos.classList.add("d-none");
    contenedorAcciones.classList.add("d-none");
    contenedorConfirmaCompra.classList.remove("d-none");
    mensajeInformacion();
  } else {
    contenedorCarritoVacio.classList.remove("d-none");
    contenedorProductos.classList.add("d-none");
    contenedorAcciones.classList.add("d-none");
    contenedorConfirmaCompra.classList.add("d-none");
  }
  //Actualizo bonotes
  botonesEliminarFuncionales();
  actualizarElTotal();
}
//aparecen los produtos
losProductosCarrito();

//Hago útil el tachito para sacar productos
function botonesEliminarFuncionales() {
  botonesParaEliminar = document.querySelectorAll(".botonBorrarCarrito");
  botonesParaEliminar.forEach((boton) => {
    boton.addEventListener("click", sacarDelCarrito);
  });
}

//ELimino un producto del carrito apretando el tachito
function sacarDelCarrito(e) {
  const idDelBoton = e.currentTarget.id;
  /*     let productoBorrado = productosElegidos.find(producto => producto.id === idDelBoton); */
  const indexProd = productosElegidos.findIndex(
    (producto) => producto.id === idDelBoton
  );
  productosElegidos.splice(indexProd, 1);
  losProductosCarrito();
  localStorage.setItem(
    "productosEnElCarrito",
    JSON.stringify(productosElegidos)
  );
}

//Borro todos los productos con el noton vaciar carrito:
botonVaciar.addEventListener("click", vaciarElCarrito);
function vaciarElCarrito() {
  productosElegidos.length = 0;
  localStorage.setItem(
    "productosEnElCarrito",
    JSON.stringify(productosElegidos)
  );
  losProductosCarrito();
}
//Se actualiza el total
function actualizarElTotal() {
  const totalFinal = productosElegidos.reduce(
    (acc, producto) => acc + producto.precio * IVA * producto.cantidad,
    0
  );
  elTotal.innerText = `${totalFinal.toFixed(2)}`;
}
//boton para confirmar compra
confirmaCompra.addEventListener("click", comprarCosas);
function comprarCosas() {
  productosElegidos.length = 0;
  localStorage.setItem(
    "productosEnElCarrito",
    JSON.stringify(productosElegidos)
  );
  contenedorCarritoVacio.classList.add("d-none");
  contenedorProductos.classList.add("d-none");
  contenedorAcciones.classList.add("d-none");
  contenedorConfirmaCompra.classList.remove("d-none");

  mensajeInformacion();
}

//Esto es un experimento que saque del internet para que se habilite el boton de comprar solo si se sube el formulario
formulario.addEventListener("submit", () => {
  if (nombreInput.value && telInput.value && domicilioInput.value) {
    confirmaCompra.removeAttribute("disabled");
  } else {
    confirmaCompra.setAttribute("disabled", "disabled");
  }
});
formulario.dispatchEvent(new Event("submit"));

//esto seria el formulario
document.addEventListener("DOMContentLoaded", () => {
  function obtenerDatosForm() {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      // Verifica que los elementos existan antes de acceder a sus valores que guarde en el session storagr
      if (nombreInput && telInput && domicilioInput) {
        sessionStorage.setItem(
          "nombreUsuario",
          JSON.stringify(nombreInput.value)
        );
        sessionStorage.setItem("telUsuario", JSON.stringify(telInput.value));
        sessionStorage.setItem(
          "domicilioUsuario",
          JSON.stringify(domicilioInput.value)
        );
        formulario.reset();
        mensajeInformacion();
      }
    });
  }

  obtenerDatosForm();
});

//Da el mensaje al confirmar la compra
function mensajeInformacion() {
  if (contenedorConfirmaCompra && nombreInput && telInput && domicilioInput) {
    let mensajeInfo = document.createElement("div");
    mensajeInfo.innerHTML = `<div class="container mensajeInfo pt-3 bg-gradient">
    <h6>Pedido de:</h6>
    <p><strong><em> ${nombreInput.value}</em></strong>.</p> <br>
    <h6>Tel. de contacto:</h6>
      <p><strong>${telInput.value}</strong></p> <br>
      <p>Recibirás tu pedido en las próximas horas, en la dirección: <em>${domicilioInput.value}</em>. 
      Te enviaremos un mensaje para confirmar la entrega, esté atento/a!</p>
      </div>
    `;
    contenedorConfirmaCompra.append(mensajeInfo);

    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("telUsuario");
    sessionStorage.removeItem("domicilioUsuario");
  }
}
