// Definición de productos
const productos = [
    { id: 1, nombre: 'Camiseta', precio: 20000 },
     { id: 2, nombre: 'Zapatillas', precio: 50000 },
    { id: 3, nombre: 'Medias', precio: 5000 },
    { id: 4, nombre: 'Campera', precio: 70000 }
];

// Selección de elementos del DOM
const listaProductos = document.getElementById('lista-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalGastado = document.getElementById('total-gastado');
const contadorCarrito = document.getElementById('contador-carrito');
const botonComprar = document.getElementById('comprar');

// Función para inicializar la aplicación
function inicializarApp() {
    mostrarProductos();
    botonComprar.addEventListener('click', comprarProductos);
}

// Función para mostrar los productos disponibles
function mostrarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach(producto => {
        const card = crearCard(producto);
        listaProductos.appendChild(card);

        const botonAgregar = card.querySelector('.agregar');
        botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
    });
}

// Función para crear una tarjeta de producto
function crearCard(producto) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="./img/${producto.nombre.toLowerCase()}.webp" alt="${producto.nombre}">
        <p>${producto.nombre} - $${producto.precio}</p>
        <button class="agregar">Agregar al Carrito</button>
    `;
    return card;
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
    const itemEnCarrito = document.createElement('li');
    itemEnCarrito.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button class="eliminar">Eliminar</button>
    `;
    listaCarrito.appendChild(itemEnCarrito);

    // Agregar evento para eliminar producto del carrito
    const botonEliminar = itemEnCarrito.querySelector('.eliminar');
    botonEliminar.addEventListener('click', () => {
        itemEnCarrito.remove();
        actualizarTotal();
        actualizarContador();
    });

    actualizarTotal();
    actualizarContador();
}

// Función para actualizar el total gastado
function actualizarTotal() {
    let total = 0;
    const itemsCarrito = listaCarrito.querySelectorAll('li');
    itemsCarrito.forEach(item => {
        const precioTexto = item.textContent.trim().split(' - ')[1];
        const precio = parseFloat(precioTexto.replace('$', ''));
        total += precio;
    });
    totalGastado.textContent = `Total gastado: $${total.toFixed(2)}`;
}

// Función para actualizar el contador del carrito
function actualizarContador() {
    contadorCarrito.textContent = listaCarrito.children.length;
}

// Función para realizar la compra
function comprarProductos() {
    listaCarrito.innerHTML = ''; // Limpiar el carrito
    actualizarTotal(); // Actualizar el total gastado después de la compra
    actualizarContador(); // Actualizar el contador de productos en el carrito
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', inicializarApp);













