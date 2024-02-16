const menu  = document.querySelector('.nav-menu')

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

