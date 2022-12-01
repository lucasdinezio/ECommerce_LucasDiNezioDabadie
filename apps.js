const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const modalContainerCompra = document.getElementById("modal-container-compra");
const cantidadCarrito = document.getElementById("cantidadCarrito");



const URL = './productos.json';

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


fetch(URL)
.then((res) => res.json())
.then((data) => {
  data.forEach((product)=> {
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">$ ${product.precio}</p>
      `;

      shopContent.append(content);

      let comprar = document.createElement("button")
      comprar.innerText = "Agregar producto";
      comprar.className = "comprar";

      content.append(comprar);

      comprar.addEventListener("click", () =>{
          const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat){
          carrito.map((prod) =>{
              if(prod.id === product.id){
                  prod.cantidad++;
              }
          });
        } else {
          carrito.push({
              id: product.id,
              img: product.img,
              nombre: product.nombre,
              precio: product.precio,
              cantidad: product.cantidad,
          });
          contadorCarrito();
          guardarLocal();
      }
      });
  })
});

const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

JSON.parse(localStorage.getItem("carrito"));

