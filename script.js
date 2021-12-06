
// Light and Dark
const toggle = document.querySelector('input[name="theme"]');
const htmlElement = document.documentElement;
const logoImg = document.querySelector('.logo-img img');
const logoModal = document.querySelector('.logo-modal')

toggle.addEventListener('click', function(){
    if(toggle.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
        logoImg.src = 'image/logo2.png';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        logoImg.src = 'image/logo.png';
    }
})

// Logo Click;
logoImg.addEventListener('click', function(){
    logoModal.classList.add('open');
})
logoModal.addEventListener('click', function(e) {
    if(e.target.classList[0] === 'logo-modal') {
        logoModal.classList.remove('open');
    }
})



// Gallery Courosel
const list = document.querySelector('.list');
const items = Array.from(list.children);
const nextButton = document.querySelector('.btn-right');
const prevButton = document.querySelector('.btn-left');

const itemWidth = items[0].getBoundingClientRect().width;

items.forEach(setLeftWidth);

function setLeftWidth(img, index) {
    img.style.left = itemWidth * index + 'px';
}

const hideShowArrow = function(img, prevBtn, nextBtn, targetIndex) {
    if(targetIndex === 0) {
        prevBtn.classList.add('hidden')
        nextBtn.classList.remove('hidden')
    } else if(targetIndex === img.length - 1) {
        prevBtn.classList.remove('hidden')
        nextBtn.classList.add('hidden')
    } else {
        prevBtn.classList.remove('hidden')
        nextBtn.classList.remove('hidden')
    }
}

nextButton.addEventListener('click', function() {
    const current = list.querySelector('.current');
    const nextItem = current.nextElementSibling;
    const nextIndex = items.findIndex(function(img) {
        return img === nextItem;
    })
    setActionImages(list, current, nextItem);
    hideShowArrow(items, prevButton, nextButton, nextIndex);
})
prevButton.addEventListener('click', function() {
    const current = list.querySelector('.current');
    const prevItem = current.previousElementSibling;
    const prevIndex = items.findIndex(function(img) {
        return img === prevItem;
    })
    setActionImages(list, current, prevItem);
    hideShowArrow(items, prevButton, nextButton, prevIndex);
})

function setActionImages(list, current, next) {
    list.style.transform = "translate(-" + next.style.left +")";
    current.classList.remove('current');
    next.classList.add('current');
}

// Toggle Sidebar for smaller screen
const toggleSidebar = document.querySelector('.toggle');
const nav = document.querySelector('nav');

toggleSidebar.addEventListener('click', function() {
    toggleSidebar.classList.toggle('open');
    nav.classList.toggle('open');
})

document.addEventListener('click', function(e) {
    if(e.target.classList[0] !== 'toggle' && e.target.classList[0] !== 'nav') {
        toggleSidebar.classList.remove('open');
        nav.classList.remove('open');
    }
})
