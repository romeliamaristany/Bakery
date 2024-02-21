const menu  = document.querySelector('.nav-menu')
const breads = [
    {
        id: "bread-1",
        name: "Whole Grain",
        imagen: "../img/favorite-bread-1.png",
        category: "Bread",
        price: 6.00,
    },
    {
        id: "bread-2",
        name: "Rye",
        imagen: "../img/favorite-bread-2.png",
        category: "Bread",
        price: 8.00,
    },
    {
        id: "bread-3",
        name: "Wheat",
        imagen: "./img/favorite-bread-3.png",
        category: "Bread",
        price: 3.00,
    },
    {
        id: "bread-4",
        name: "Multigrain",
        imagen: "./img/favorite-bread-4.png",
        category: "Bread",
        price: 5.00,
    },
    {
        id: "bread-5",
        name: "Sourdough",
        imagen: "assets/img/favorite-bread-5.png",
        category: "Bread",
        price: 7.00,
    },
    {
        id: "bread-6",
        name: "French",
        imagen: "img/favorite-bread-6.png",
        category: "Bread",
        price: 3.00,
    }
]
const favoriteContainer = document.querySelector('.favorite-container')
let buttonAdd = document.querySelectorAll(".favorite-button")
const number = document.querySelector('.car-span')

//                  SHOW MENU
document.getElementById('nav-toogle').addEventListener('click', ()=>{
    menu.classList.add('show-menu')
})

//                 HIDDEN MENU
document.getElementById('nav-close').addEventListener('click', ()=>{
    menu.classList.remove('show-menu')
})

const navlink = document.querySelectorAll('.nav-link')
navlink.forEach(link => {
    link.addEventListener('click', ()=>{
       menu.classList.remove('show-menu')
    })
})

//             HIDDEN MENU WHEN YOU CLICK UN THE CLOSE ICON
window.onscroll = () => {
    menu.classList.remove('show-menu')
}

//             ADD BLUR HEADER
const blurHeader = () => {
    const header = document.getElementById('header')

    window.scrollY >= 50 ? header.classList.add('blur-header')
                         : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

//            SHOW SCROLL-UP
const scrollUp = () => {
    const scrollup = document.getElementById('scroll-up')

    window.scrollY >= 350 ? scrollup.classList.add('show-scroll-up')
                          : scrollup.classList.remove('show-scroll-up')
}
window.addEventListener('scroll', scrollUp)


//            SHOW THE CURRENT SECTION IN THE NAVBAR
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionClass = document.querySelector('.nav-menu a[href *=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionClass.classList.add('active-link')
        }else{
            sectionClass.classList.remove('active-link')
        }

    })
}
window.addEventListener('scroll', scrollActive)


//                  SCROLL REVEAL ANIMATION
const srAnimation = ScrollReveal({
    origin: 'top',
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 2500,
    delay: 300,
  //  reset: true //Animation repeat
})

srAnimation.reveal('.home-data, .about-img, .about-data, .visit-data')

srAnimation.reveal('.home-image, .footer-img-1, .footer-img-2', {rotate: {z: -15}})
srAnimation.reveal('.home-bread, .about-bread', {rotate: {z: 15}})
srAnimation.reveal('.home-footer', {origin: 'bottom', scale:1})


srAnimation.reveal('.new-card:nth-child(1) img', {rotate: {z: -30, distance: 0}})
srAnimation.reveal('.new-card:nth-child(2) img', {rotate: {z: 15, distance: 0, delay:600}})
srAnimation.reveal('.new-card:nth-child(3) img', {rotate: {z: -30, distance: 0, delay:900}})

srAnimation.reveal('.favorite-card img', { rotate: {z: -15, distance: 0}})

srAnimation.reveal('.footer-container', {scale: 1})



//      CHARGE THE PRODUCTS IN THE HTML
function chargeBreads (someBreds) {
   if(document.querySelector('.favorite-container')){
    favoriteContainer.innerHTML = ""

    someBreds.forEach(bread => {
        const div = document.createElement('div')
        div.classList.add('favorite-card')
        div.innerHTML = `
                <img src="${bread.imagen}" alt="${bread.name}" class="favorite-img">

                <div class="favorite-data">
                    <h2 class="favorite-title">${bread.name}</h2>
                    <span class="favorite-subtitle">${bread.category}</span>
                    <h3 class="favorite-price">$${bread.price}</h3>
                    
                </div>

                <button class="favorite-button button" id="${bread.id}">
                    <i class="ri-add-line"></i>
                </button>
        `;
        favoriteContainer.append(div)
    })
    updateButtonAdd();

   }
}

chargeBreads(breads)

function updateButtonAdd() {
    buttonAdd = document.querySelectorAll(".favorite-button")

    buttonAdd.forEach(button => {
        button.addEventListener("click", addCar)
    })
}

let breadCar = []

let bredCarLS = localStorage.getItem('cart')
if(bredCarLS){
    breadCar = JSON.parse(bredCarLS)
    updateCarNumber()
}

function addCar(e) {
    const idButton = e.currentTarget.id
    const breadAdd = breads.find(bread => bread.id === idButton)


    if(breadCar.some(bread=> bread.id === idButton)){
        number.classList.add('car-span-style')
        const index = breadCar.findIndex(bread => bread.id === idButton)
        breadCar[index].cantidad++
    }else{
        number.classList.add('car-span-style')
        number.classList.remove('disabled')
        breadAdd.cantidad = 1
        breadCar.push(breadAdd)
    }
    updateCarNumber()

    localStorage.setItem('cart',JSON.stringify(breadCar))
    console.log(breadCar)
}

function updateCarNumber(){
    let newNumber = breadCar.reduce((acc, product)=> acc + product.cantidad, 0)

    number.innerText = newNumber
}


//      CHARGE PRODUCTS CART
const carProducts = document.querySelector('.car-content')
const emptyCar = document.querySelector('#empty-car')
const carActions = document.querySelector('#car-actions')
const buyCar = document.querySelector('#buy-car')
const buttonEmpty = document.querySelector('#car-actions-empty')
const total = document.querySelector('#total')
const buyButton = document.querySelector("#car-actions-buy")


function chargeProductsCar(){
    if(breadCar && breadCar.length > 0){

        if (carProducts){
        emptyCar.classList.add('disabled')
        carProducts.classList.remove('disabled')
        carActions.classList.remove('disabled')
        buyCar.classList.add('disabled')

        carProducts.innerHTML = ""

        breadCar.forEach(bread => {

            const div = document.createElement('div')
            div.classList.add('car-products')
            div.innerHTML =

            `<div class="car-product-image">
            <img src="${bread.imagen}" alt="${bread.name}" class="favorite-img">
            </div>
            <div class="car-product-name">
                <small>Product</small>
                <h3>${bread.name}</h3>
            </div>
            <div class="car-product-cant">
                <small>Quentity</small>
                <div class="cant-bread">
                    <button class="more-bread" id="${bread.id}" ><i class="ri-add-line"></i></button>
                    <p>${bread.cantidad}</p>
                    <button class="less-bread" id="${bread.id}"><i class="ri-subtract-fill"></i></button>
                </div>
            </div>
            <div class="car-product-price">
                <small>Price</small>
                <p>${bread.price}</p>
            </div>
            <div class="car-product-subtotal">
                <small>Subtotal</small>
                <p>$${bread.price * bread.cantidad}</p>
            </div>
       `
            carProducts.append(div)
        });
        }
    }else{
        emptyCar.classList.remove('disabled')
        carProducts.classList.add('disabled')
        carActions.classList.add('disabled')
        buyCar.classList.add('disabled')
    }

   // updateButtonDelete()
    updateButtonMore()
    updateButtonLess()
    updateTotalCost()
}

chargeProductsCar()

function updateButtonMore(){
    const buttonMore = document.querySelectorAll('.more-bread')

    buttonMore.forEach(btn => {
        btn.addEventListener('click', moreBread)
    })
}
function moreBread(e){
    let idButtonMore = e.currentTarget.id
    const index = breadCar.findIndex(bread => bread.id === idButtonMore)

    if(breadCar[index].cantidad >= 1){
        breadCar[index].cantidad++
    }
    chargeProductsCar()
    localStorage.setItem('cart',JSON.stringify(breadCar))

}

function updateButtonLess(){
    const buttonLess = document.querySelectorAll('.less-bread')

    buttonLess.forEach(btn => {
        btn.addEventListener('click', lessBread)
    })
}
function lessBread(e){
    let idButtonLess = e.currentTarget.id
    const index = breadCar.findIndex(bread => bread.id === idButtonLess)

    if(breadCar[index].cantidad > 1){
        breadCar[index].cantidad--
    }else{
        breadCar.splice(index,1)
    }

    chargeProductsCar()
    localStorage.setItem('cart',JSON.stringify(breadCar))

    if(breadCar.length == 0){
        emptyCar.classList.remove("disabled")
        carProducts.classList.add("disabled")
        carActions.classList.add("disabled")
        buyCar.classList.add("disabled")
    }
}


function updateButtonDelete(){
    const buttonDelete = document.querySelectorAll('.car-product-delete')

    buttonDelete.forEach(btn => {
        btn.addEventListener('click', deleteOrder)
    })
}

function deleteOrder(e){
    let idButton = e.currentTarget.id
    const index = breadCar.findIndex(bread => bread.id === idButton)

    if(breadCar[index].cantidad > 1){
        breadCar[index].cantidad--
    }else{
        breadCar.splice(index,1)
    }
    

    chargeProductsCar()

    localStorage.setItem('cart',JSON.stringify(breadCar))

    if(breadCar.length == 0){
        emptyCar.classList.remove("disabled")
        carProducts.classList.add("disabled")
        carActions.classList.add("disabled")
        buyCar.classList.add("disabled")
    }
}

console.log(localStorage.getItem('cart'))

buttonEmpty.addEventListener("click", nullCar)

function nullCar(){
    breadCar.length = 0
    localStorage.setItem('cart', JSON.stringify(breadCar))
    chargeProductsCar()
    
}

function updateTotalCost(){
    const totalCost = breadCar.reduce((acc, bread) => acc + (bread.price * bread.cantidad), 0)
    total.innerText = `$ ${totalCost}`
}

buyButton.addEventListener("click", cartBuy)

function cartBuy(){
    breadCar.length = 0
    localStorage.setItem('cart', JSON.stringify(breadCar))

    emptyCar.classList.add("disabled")
    carProducts.classList.add("disabled")
    carActions.classList.add("disabled")
    buyCar.classList.remove("disabled")
}