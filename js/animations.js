class AnimationManager {
    constructor() {
        this.animations = new Map();
    }
    
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
    
    scaleIn(element, delay = 0) {
        setTimeout(() => {
            element.style.animation = `scaleIn 0.5s ease forwards`;
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
                const orderBtn = document.querySelector('.order-btn');
                if (orderBtn) {
                    animationManager.fadeInUp(orderBtn, 200);
                }
            }, 300);
        }, 200);
    }, 200);
}