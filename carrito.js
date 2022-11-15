const confirmacionCompra = () => {
    modalContainer.style.display = "none";
    modalContainerCompra.innerHTML = "";
    modalContainerCompra.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Tu compra ha sido confirmada</h1>`;
    modalContainerCompra.append(modalHeader);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-header";
    modalContainerCompra.append(modalFooter);

    const modalbutton2 = document.createElement("h1");
    modalbutton2.innerText = "Aceptar";
    modalbutton2.className = "modal-header-button";
    modalbutton2.addEventListener("click",()=>{
        modalContainerCompra.style.display = "none";
        eliminarCarrito();
    });

    modalFooter.append(modalbutton2);
};

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class="modal-header-title">Productos🛒</h1>`;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "Cerrar❌";
    modalbutton.className = "modal-header-button";
    modalbutton.addEventListener("click",()=>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className ="modal-content";
        carritoContent.innerHTML = `
           <img src="${product.img}">
           <h3>${product.nombre}</h1>
           <p>$ ${product.precio}</p>   
           <p>${product.cantidad}</p>
        `;
        modalContainer.append(carritoContent); 

        let eliminar = document.createElement("span");
        eliminar.innerText = "🚫";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);
        eliminar.addEventListener("click", eliminarProducto);
    });
    
    const total=carrito.reduce((acc, full) => acc + full.precio,0); 
    const totalBuying = document.createElement("div");
    totalBuying.className ="total-content";
    totalBuying.innerHTML = `Total💰: $ ${total}`;
    modalContainer.append(totalBuying);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-header";
    modalContainer.append(modalFooter);

    const modalbutton2 = document.createElement("h1");
    modalbutton2.innerText = "Comprar";
    modalbutton2.className = "modal-header-button";
    modalbutton2.addEventListener("click",()=> {
        modalContainer.style.display = "none";
        confirmacionCompra();
    });

    modalFooter.append(modalbutton2);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () =>{
    const foundId = carrito.find((element)=> element.id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    contadorCarrito();
    guardarLocal();
    pintarCarrito();
};

const eliminarCarrito = () =>{
    carrito = [];
    contadorCarrito();
    guardarLocal();
    pintarCarrito();
};

const contadorCarrito =() =>{
    cantidadCarrito.style.display="block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

contadorCarrito();

