/* ===========================================
   iNova Store
   Script Principal
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("lista-productos");
    const buscador = document.getElementById("buscarProducto");
    const filtro = document.getElementById("filtroEstado");

    const modal = document.getElementById("modalProducto");
    const contenidoModal = document.getElementById("contenidoModal");
    const cerrarModal = document.querySelector(".cerrar-modal");

    // ==========================
    // MOSTRAR PRODUCTOS
    // ==========================

    function mostrarProductos(lista){

        contenedor.innerHTML = "";

        if(lista.length === 0){

            contenedor.innerHTML = `
                <h2 style="text-align:center;width:100%;">
                    No se encontraron productos.
                </h2>
            `;

            return;

        }

        lista.forEach(producto=>{

            contenedor.innerHTML += `

            <div class="producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">

                <div class="producto-info">

                    <span class="estado ${producto.estado=="Nuevo" ? "nuevo" : ""}">

                        ${producto.estado}

                    </span>

                    <h3>${producto.nombre}</h3>

                    <p><strong>Capacidad:</strong> ${producto.capacidad}</p>

                    <p><strong>Batería:</strong> ${producto.bateria}</p>

                    <p><strong>Color:</strong> ${producto.color}</p>

                    <div class="precio">

                        ${producto.precio}

                    </div>

                    <button
                        class="btn-dark ver-producto"
                        data-id="${producto.id}">

                        Ver detalles

                    </button>

                </div>

            </div>

            `;

        });

    }

    mostrarProductos(productos);

    // ==========================
    // BUSCADOR
    // ==========================

    buscador.addEventListener("input", filtrar);

    filtro.addEventListener("change", filtrar);

    function filtrar(){

        const texto = buscador.value.toLowerCase().trim();

        const estado = filtro.value;

        const resultado = productos.filter(producto=>{

            const coincideTexto =

                producto.nombre.toLowerCase().includes(texto) ||

                producto.capacidad.toLowerCase().includes(texto) ||

                producto.color.toLowerCase().includes(texto);

            const coincideEstado =

                estado==="Todos" ||

                producto.estado===estado;

            return coincideTexto && coincideEstado;

        });

        mostrarProductos(resultado);

    }

    // ==========================
    // MODAL
    // ==========================

    document.addEventListener("click",(e)=>{

        if(e.target.classList.contains("ver-producto")){

            const id = Number(e.target.dataset.id);

            const producto = productos.find(p=>p.id===id);

            contenidoModal.innerHTML = `

            <div class="modal-grid">

                <div class="modal-imagen">

                    <img src="${producto.imagen}">

                </div>

                <div class="modal-info">

                    <h2>${producto.nombre}</h2>

                    <p>${producto.descripcion}</p>

                    <p><strong>Estado:</strong> ${producto.estado}</p>

                    <p><strong>Capacidad:</strong> ${producto.capacidad}</p>

                    <p><strong>Batería:</strong> ${producto.bateria}</p>

                    <p><strong>Color:</strong> ${producto.color}</p>

                    <div class="modal-precio">

                        ${producto.precio}

                    </div>

                    <a
                    href="https://wa.me/573203945149?text=Hola,%20quiero%20comprar%20el%20${encodeURIComponent(producto.nombre)}"
                    target="_blank">

                    Comprar por WhatsApp

                    </a>

                </div>

            </div>

            `;

            modal.classList.add("activo");

        }

    });

    cerrarModal.onclick = ()=>{

        modal.classList.remove("activo");

    }

    window.onclick = (e)=>{

        if(e.target===modal){

            modal.classList.remove("activo");

        }

    }

    // ==========================
    // ANIMACIONES
    // ==========================

    const elementos = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("mostrar");

            }

        });

    },{

        threshold:.15

    });

    elementos.forEach(seccion=>{

        seccion.classList.add("oculto");

        observer.observe(seccion);

    });

});

window.addEventListener("load",()=>{

setTimeout(()=>{

document
.getElementById("loader")
.classList.add("ocultar");

},1200);

});

const numeros=document.querySelectorAll(".stat h3");

numeros.forEach(numero=>{

const texto=numero.innerText;

const valor=parseInt(texto);

if(isNaN(valor)) return;

let inicio=0;

const intervalo=setInterval(()=>{

inicio+=10;

if(inicio>=valor){

numero.innerText=texto;

clearInterval(intervalo);

}else{

numero.innerText=inicio+"+";

}

},15);

});

const fade=document.querySelectorAll(".fade-up");

const aparecer=new IntersectionObserver((entradas)=>{

entradas.forEach(e=>{

if(e.isIntersecting){

e.target.classList.add("visible");

}

});

});

fade.forEach(item=>{

aparecer.observe(item);

});