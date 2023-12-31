class Lista {
  constructor() {
    this.lista = [];
  }

  agregarProducto(nombreProducto, precioProducto, cantidadProducto) {
    this.lista.push({ nombre: nombreProducto, precio: precioProducto, cantidad: cantidadProducto });
  }

  totalProductos() {
    return this.lista.length;
  }

  listaProductos() {
    let contenido = "";
    this.lista.forEach((producto) => {
      const totalPorProducto = producto.precio * producto.cantidad;
      contenido += `<li>Nombre: ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${Math.round(producto.cantidad)} - Total: $${totalPorProducto.toFixed(2)}</li>`;
    });
    return contenido;
  }

  sumaAPagar() {
    return this.lista.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  guardarListaEnLocalStorage() {
    const listaJSON = JSON.stringify(this.lista);
    localStorage.setItem('listaProductos', listaJSON);
  }

  cargarListaDesdeLocalStorage() {
    const listaJSON = localStorage.getItem('listaProductos');
    if (listaJSON) {
      this.lista = JSON.parse(listaJSON);
    }
  }
}

const lista = new Lista();

// Agregar evento al formulario para agregar productos
document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const precio = parseFloat(document.getElementById('precio').value);

  lista.agregarProducto(nombre, precio, cantidad);

  // Limpiar los campos del formulario
  document.getElementById('nombre').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('precio').value = '';

  actualizarLista();
});

function actualizarLista() {
  const listaProductos = lista.listaProductos();
  const totalPagar = lista.sumaAPagar();

  document.getElementById('lista-productos').innerHTML = listaProductos;
  document.getElementById('total-pagar').textContent = `$${totalPagar}`;

  lista.guardarListaEnLocalStorage();
}

// Cargar la lista desde el almacenamiento local si existe
lista.cargarListaDesdeLocalStorage();

// Cargar la lista y el total a pagar desde el almacenamiento local si existen
const listaProductosGuardada = lista.listaProductos();
const totalPagarGuardado = localStorage.getItem('totalPagar');
if (listaProductosGuardada && totalPagarGuardado) {
  document.getElementById('lista-productos').innerHTML = listaProductosGuardada;
  document.getElementById('total-pagar').textContent = `$${totalPagarGuardado}`;
}