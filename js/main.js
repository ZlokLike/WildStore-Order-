const startPage = document.getElementById('start-page');
const mainPage = document.getElementById('main-page');
const startLink = document.getElementById('start-link');
const orderBtn = document.getElementById('order-btn');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const langButtons = document.querySelectorAll('.lang-btn');
const quoteText = document.getElementById('quote-text');

let currentLang = 'ru';

class AnimationManager {
    animateElements(elements, delay = 0, stagger = 100) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                this.fadeInUp(el, index * stagger);
            }, delay);
        });
    }
    
    fadeInUp(element, delay = 0) {
        setTimeout(() => {
            element.style.animation = `fadeInUp 0.6s ease forwards`;
        }, delay);
    }
    
    staggerAnimation(elements, baseDelay = 0) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInUp 0.6s ease forwards`;
            }, baseDelay + index * 80);
        });
    }
}

const animationManager = new AnimationManager();

function animatePageTransition() {
    const categories = document.querySelectorAll('.category-title');
    const containers = document.querySelectorAll('.services-container');
    const cards = document.querySelectorAll('.service-card');
    
    animationManager.animateElements(categories, 100);
    setTimeout(() => {
        animationManager.animateElements(containers, 0);
        setTimeout(() => {
            animationManager.staggerAnimation(cards, 0);
            setTimeout(() => {
                if (orderBtn) {
                    animationManager.fadeInUp(orderBtn, 200);
                }
            }, 300);
        }, 200);
    }, 200);
}

function updateLanguage(lang) {
    currentLang = lang;
    
    const textsToUpdate = document.querySelectorAll('[data-ru], [data-en]');
    textsToUpdate.forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            const text = element.getAttribute(`data-${lang}`);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    if (quoteText) {
        quoteText.textContent = lang === 'ru' ? 'цифровые товары тут' : 'digital goods here';
    }
    
    if (startLink) {
        const startLinkText = startLink.querySelector('span');
        if (startLinkText) {
            startLinkText.textContent = lang === 'ru' ? 'начать листать' : 'start browsing';
        }
    }
}

function initEventListeners() {
    if (startLink) {
        startLink.addEventListener('click', handleStartClick);
    }
    
    if (orderBtn) {
        orderBtn.addEventListener('click', handleOrderClick);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', handleModalClose);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            langButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            updateLanguage(lang);
        });
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            handleModalClose();
        }
    });
    
    setTimeout(() => {
        const logoUnderline = document.querySelector('.logo-underline');
        if (logoUnderline) {
            logoUnderline.style.width = '100%';
        }
    }, 1500);
}

function handleStartClick() {
    startPage.style.opacity = '0';
    setTimeout(() => {
        startPage.style.display = 'none';
        mainPage.style.display = 'flex';
        setTimeout(() => {
            mainPage.style.opacity = '1';
            animatePageTransition();
        }, 50);
    }, 800);
}

function handleOrderClick() {
    if (modal) {
        modal.style.display = 'flex';
    }
}

function handleModalClose() {
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
});