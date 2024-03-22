//Consigna para la Entrega:
//1)Permitir al usuario agregar cosas al carrito
//2)Permitir que busque productos con filtro de precio o nombre.
//3)Hago que el usuario ingrese sus datos para confirmar su compra.
//4)El usuario puede borrrar un tipo de producto, o todo su carrito.
//5)Doy mensaje de despedida al confirmar la compra.


//Declaro variables
let productosElegidos;
let cantidad;
let menu;
const IVA = 1.21;
const listaProd = document.querySelector("#listaTortas");
let botonesAgregar = document.querySelectorAll(".botonAgregar");
const numerito = document.querySelector("#numeroCart");
const enviarAlHtml = document.querySelectorAll(".misProductos");
let productosElegidosEnLS = localStorage.getItem("productosEnElCarrito");
const barraBusqueda = document.querySelector("#formularioDeBusqueda");
const botonBusqueda = document.querySelector(".botonBuscar");

let productosALaVenta = [];
//Hago fetch
fetch("./parteJson/db.json")
  .then((res) => res.json())
  .then((data) => {
    mostrarCards(data);
    configurarSlider(data);
  });

//Funcionalidad del slider de precios
function configurarSlider(productos) {
  const preciosConIVA = productos.map((producto) => {
    return Number((producto.precio * IVA).toFixed(2));
  });
  const minPrecio = Math.min(...preciosConIVA);
  const maxPrecio = Math.max(...preciosConIVA);
  precioSlider.min = minPrecio;
  precioSlider.max = maxPrecio + 1;
  precioSlider.value = minPrecio;
  precioValor.textContent = minPrecio;
}
async function obtenerProductos() {
  try {
    const response = await fetch("./parteJson/db.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

//Envia las cards al html
function mostrarCards(productos) {
  listaProd.innerHTML = "";
  productos.forEach((producto) => {
    let { img, nombre, precio, id, ingredientes } = producto;
    let li = document.createElement("li");
    li.innerHTML = `
        <div  class="card m-3">
        <img src="${img}" class="cardImg" alt="${nombre}">
        <h3 class="pt-3">${nombre}</h3>
        <p><small>Ingredientes: ${ingredientes}</small></p>
        <p><strong>$${(precio * IVA).toFixed(2)}</strong></p>
        <div class="botonera">
        <button type="button" class="btn botones botonAgregar" id="${id}"><strong>Agregar Al Carrito</strong></button>
        </div>
        </div>
        `;
    botonesAgregarFuncionales();
    listaProd.append(li);
  });
}

//funcionalidad a botones de compra:

function botonesAgregarFuncionales() {
  botonesAgregar = document.querySelectorAll(".botonAgregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

//Funcion para poner los productos en el carrito:

async function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado al carrito",
    gravity: "bottom",
    duration: 3000,
  }).showToast();

  const idDelBoton = e.currentTarget.id;
  //pruebo uso de try para agregar productos al carrito
  try {
    const productos = await obtenerProductos();
    const productoAgregado = productos.find(
      (producto) => producto.id === idDelBoton
    );

    if (!productoAgregado) {
      throw new Error("Producto no encontrado");
    }
    const productoExistente = productosElegidos.find(
      (producto) => producto.id === idDelBoton
    );

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      productoAgregado.cantidad = 1;
      productosElegidos.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem(
      "productosEnElCarrito",
      JSON.stringify(productosElegidos)
    );
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
}

//Guardo productos en LS y actualizo el numerito.
if (productosElegidosEnLS) {
  productosElegidos = JSON.parse(productosElegidosEnLS);
  actualizarNumerito();
} else {
  productosElegidos = [];
}

//Funcion para el numerito del carrito
productosElegidos = localStorage.getItem(productosElegidos) || [];
function actualizarNumerito() {
  if (Array.isArray(productosElegidos)) {
    let nuevoNumerito = productosElegidos.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    );
    numerito.innerText = nuevoNumerito;
  } else {
    console.error("productosElegidos no es un array");
  }
}

//Vamos a fitrar los productos con la barra de busqueda:
function filtrarTorta(productosALaVenta, busqueda) {
  const filtrado = productosALaVenta.filter((el) => {
    return el.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });

  if (filtrado.length > 0) {
    return filtrado;
  } else {
    return null;
  }
}

// Barra de búsqueda

botonBusqueda.addEventListener("click", async (event) => {
  event.preventDefault();
  const busqueda = barraBusqueda.value.toLowerCase();
  const productos = await obtenerProductos();
  const resultadoBusqueda = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda)
  );
  mostrarCards(resultadoBusqueda);
});

//Asigno html del slider de precios.
const precioSlider = document.querySelector("#precioSlider");
const precioValor = document.querySelector("#precioValor");

precioSlider.addEventListener("input", async () => {
  const precio = precioSlider.value;
  precioValor.textContent = precio;
  const productos = await obtenerProductos();
  const filtrado = productos.filter(
    (producto) => producto.precio * IVA <= precio
  );
  mostrarCards(filtrado);
});

//Esto es para que el carrito no se me resetee al agregar cosas.
function productoPasado() {
  const productosElegidosEnLS = obtener();

  if (productosElegidosEnLS) {
    productosElegidos = productosElegidosEnLS;

    actualizarNumerito();

    return productosElegidos;
  } else {
    return (productosElegidos = []);
  }
}

productoPasado();

function obtener() {
  let productosElegidosEnLS =
    JSON.parse(localStorage.getItem("productosEnElCarrito")) || false;

  return productosElegidosEnLS;
}
