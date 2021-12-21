
// Light and Dark
const toggle = document.querySelector('input[name="theme"]');
const htmlElement = document.documentElement;
const logoImg = document.querySelector('.logo-img img');
const logoModal = document.querySelector('.logo-modal')

toggle.addEventListener('click', function(){
    if(toggle.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
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

// Shortcut Hover 
const shortcuts = document.querySelectorAll('.shortcut-container div');

shortcuts.forEach( entry => {
    entry.addEventListener('mouseover', function() {
        entry.classList.add('hover');
    })
    entry.addEventListener('mouseout', function() {
        entry.classList.remove('hover');
    })
})

// Nav Effect Observer
const sections = document.querySelectorAll('section');
const trans = document.querySelector('.trans');
const header = document.querySelector('header');
const gradients = ['transparent']

let observer = new IntersectionObserver(callback, {
    threshold: 0.5
})

sections.forEach(section => {
    observer.observe(section);
})

function callback(entries) {
    entries.forEach(entry => {
        const callName = entry.target.className;
        const activeLink = document.querySelector(`[data-page="${callName}"]`);
        const elementItem = entry.target.getAttribute('data-index');
        const coordinates = activeLink.getBoundingClientRect();
        const direction = {
            height: coordinates.height,
            width: coordinates.width,
            top: coordinates.top,
            left: coordinates.left
        }

        if(entry.isIntersecting) {
            trans.style.setProperty('height', `${direction.height}px`);
            trans.style.setProperty('width', `${direction.width}px`);
            trans.style.setProperty('top', `${direction.top - 10}px`);
            trans.style.setProperty('left', `${direction.left}px`);
            if(elementItem == 0) {
                trans.style.backgroundColor = 'transparent';
            } else {
                trans.style.backgroundColor = 'var(--color-trans)';
            }
            console.log(activeLink.getAttribute('data-page'))

            if(activeLink.getAttribute('data-page') !== 'gallery-container') {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        }
    })
}

// Modal Section
// Logo Click;
logoImg.addEventListener('click', function(){
    logoModal.classList.add('open');
})
logoModal.addEventListener('click', function(e) {
    if(e.target.classList[0] === 'logo-modal') {
        logoModal.classList.remove('open');
    }
})

//Search Open 
const searchModal = document.querySelector('.search-modal');
const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('click', function() {
    searchModal.classList.add('open');
})
searchModal.addEventListener('click', function(e) {
    if(e.target.classList.contains('open')) {
        searchModal.classList.remove('open');
    }
})