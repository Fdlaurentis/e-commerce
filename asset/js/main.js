"use strict"
// document.getElementById("load").onload.style.display.block

const stok = [
    {
        id: 1,
        nombre: "Hoodies",
        categoria: "Hoodies",
        stock: 1,
        imgUrl: "./asset/imagenes/featured1.png",
        precio: 14
    },
    {
        id: 2,
        nombre: "Shirts",
        categoria: "Shirts",
        stock: 10,
        imgUrl: "./asset/imagenes/featured2.png",
        precio: 24
    },
    {
        id: 3,
        nombre: "Sweatshirts",
        categoria: "Sweatshirts",
        stock: 18,
        imgUrl: "./asset/imagenes/featured3.png",
        precio: 24
    },
    {
        id: 4,
        nombre: "Shirts",
        categoria: "Shirts",
        stock: 10,
        imgUrl: "./asset/imagenes/featured4.png",
        precio: 24
    }
]


let btnCompras = document.querySelector(".carrito")
let cerrarCarrito = document.querySelector(".cerrar-compra")
let cartCompras = document.querySelector(".car-compras")
let btnAddCarrito = document.querySelector(".add")
let contenedorCar = document.querySelector(".cart-compras")
let carrito = []

document.addEventListener("DOMContentLoaded", () => {
    cargarpagina()
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse( localStorage.getItem("carrito") )
    } else {
        localStorage.setItem("carrito", JSON.stringify([]))
    }
    mostrarProducCar()

})

function cargarpagina(){

}

let contenedor = document.querySelector(".card")
let fragmento = ""
stok.forEach((producto) => {
    fragmento += `
        <div class="produc-card">
            <img src=${producto.imgUrl} alt="">
            <div class="desc-prod">
                <div>
                    <h2 class="precio">$${producto.precio}.00</h2>
                    <small>Stock ${producto.stock}</small>
                </div>
                <h2 class="nombre">${producto.nombre}</h2>                     
                    <i class=" add fa-solid fa-plus" data-id="${producto.id}"></i>                                                     
            </div>
        </div>  
    `
})
mostrarProducCar()


contenedor.innerHTML = fragmento

let header = document.querySelector("header")
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("nav-scroll")
    } else {
        header.classList.remove("nav-scroll")
    }
})

let menuHamburguesa = document.querySelector(".menu-ico")
let cerrarVentana = document.querySelector(".cerrar-ico")
let menu = document.querySelector(".menu>ul")

menuHamburguesa.addEventListener("click", () => {
    menu.classList.add("open")
})

cerrarVentana.addEventListener("click", () => {
    menu.classList.remove("open")
})


/*****************CARRITO COMPRAS*********************/

btnCompras.addEventListener("click", () => {
    cartCompras.classList.add("open")
})

cerrarCarrito.addEventListener("click", () => {
    cartCompras.classList.remove("open")
})


let capturar = document.querySelectorAll(".add")
capturar.forEach((boton) => {
    boton.addEventListener("click", () => {
        let id = parseInt(boton.getAttribute("data-id"))
        let productoSeleccionado = stok.find(producto => {
            return producto.id === id
        })
        aggProCar(productoSeleccionado)
    })
})

function aggProCar(productSelect) {
    let resultBusqueda = carrito.find(item => item.id === productSelect.id)

    if (resultBusqueda) {
        let inv = carrito[resultBusqueda.index].stock
        let cantSelect = carrito[resultBusqueda.index].cantSelect
        if (inv > cantSelect) {
            carrito[resultBusqueda.index].cantSelect++
        } else {
            alert("Disculpe no tenemos mas en Stock")
        }
    } else {
        productSelect.cantSelect = 1
        productSelect.index = carrito.length
        carrito.push(productSelect)
    }
    console.log(productSelect)
    mostrarProducCar()
}

function mostrarProducCar() {
    let carroHTML = ``
    let carroVacio = ``
    console.log(carrito.length)
    let suma=0
    let totalItem=0
    if (carrito.length == 0) {
        carroVacio = `
            <div class="car-vacio">
                <img src="./asset/imagenes/empty-cart.png" alt="">
                <h4>No a seleccionado ningun producto aun</h4>
            </div>
        `
        contenedorCar.innerHTML = carroVacio
    } else {
        carrito.forEach(item => {
            let total=item.cantSelect*item.precio           
            suma+=total
            totalItem+=item.cantSelect
            carroHTML += `            
            <div class="carLleno">
                <img src="${item.imgUrl}" alt="">
                <h4>${item.nombre}</h4>
                <small>Cantidad: ${item.cantSelect}</small>    
                <small>Precio Unitario: $${item.precio}.00</small>               
            </div>
            `
        })
        carroHTML+=`
            <div class="caja">
                <small>Productos seleccionados: ${totalItem}</small>
                <small>Total de compra: $${suma}.00</small>
                <div id="pagar">
                    <h4>Pagar</h4>
                    <i class="fa-solid fa-pager"></i>            
                </div>
            </div>            
        `
        contenedorCar.innerHTML = carroHTML
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
} 

let borrarMem=document.getElementById("pagar")
console.log(borrarMem)
// borrarMem.addEventListener("click", () => {    
//     alert("Su compra se realizo con exito")
//     localStorage.clear()
// })

