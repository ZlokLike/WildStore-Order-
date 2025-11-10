let currentLang = 'ru';

const startPage = document.getElementById('start-page');
const mainPage = document.getElementById('main-page');
const startLink = document.getElementById('start-link');
const quoteText = document.getElementById('quote-text');
const servicesContainerAvatars = document.getElementById('services-container-avatars');
const servicesContainerDesign = document.getElementById('services-container-design');
const servicesContainerMultimedia = document.getElementById('services-container-multimedia');
const servicesContainerProgramming = document.getElementById('services-container-programming');
const servicesContainerAccounts = document.getElementById('services-container-accounts');
const servicesContainerNumbers = document.getElementById('services-container-numbers');
const servicesContainerOther = document.getElementById('services-container-other');
const orderBtn = document.getElementById('order-btn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close');
const langButtons = document.querySelectorAll('.lang-btn');
const categoryAvatars = document.getElementById('category-avatars');
const categoryDesign = document.getElementById('category-design');
const categoryMultimedia = document.getElementById('category-multimedia');
const categoryProgramming = document.getElementById('category-programming');
const categoryAccounts = document.getElementById('category-accounts');
const categoryNumbers = document.getElementById('category-numbers');
const categoryOther = document.getElementById('category-other');

function initEventListeners() {
    startLink.addEventListener('click', handleStartClick);
    orderBtn.addEventListener('click', handleOrderClick);
    modalClose.addEventListener('click', handleModalClose);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            handleModalClose();
        }
    });
    
    langButtons.forEach(button => {
        button.addEventListener('click', handleLanguageSwitch);
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
    modal.style.display = 'flex';
}

function handleModalClose() {
    modal.style.display = 'none';
}

function handleLanguageSwitch(event) {
    const lang = event.target.getAttribute('data-lang');
    if (lang !== currentLang) {
        currentLang = lang;
        updateLanguage();
        
        langButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
}

function updateLanguage() {
    quoteText.textContent = uiTexts[currentLang].quote;
    startLink.querySelector('span').textContent = uiTexts[currentLang].startLink;
    orderBtn.querySelector('span').textContent = uiTexts[currentLang].orderBtn;
    modalTitle.textContent = uiTexts[currentLang].modalTitle;
    modalText.textContent = uiTexts[currentLang].modalText;
    modalClose.textContent = uiTexts[currentLang].modalClose;
    
    categoryAvatars.querySelector('span').textContent = uiTexts[currentLang].categoryAvatars;
    categoryDesign.querySelector('span').textContent = uiTexts[currentLang].categoryDesign;
    categoryMultimedia.querySelector('span').textContent = uiTexts[currentLang].categoryMultimedia;
    categoryProgramming.querySelector('span').textContent = uiTexts[currentLang].categoryProgramming;
    categoryAccounts.querySelector('span').textContent = uiTexts[currentLang].categoryAccounts;
    categoryNumbers.querySelector('span').textContent = uiTexts[currentLang].categoryNumbers;
    categoryOther.querySelector('span').textContent = uiTexts[currentLang].categoryOther;
    
    renderServices();
}

function renderServices() {
    renderCategory(servicesContainerAvatars, servicesData[currentLang].avatars);
    renderCategory(servicesContainerDesign, servicesData[currentLang].design);
    renderCategory(servicesContainerMultimedia, servicesData[currentLang].multimedia);
    renderCategory(servicesContainerProgramming, servicesData[currentLang].programming);
    renderCategory(servicesContainerAccounts, servicesData[currentLang].accounts);
    renderCategory(servicesContainerNumbers, servicesData[currentLang].numbers);
    renderCategory(servicesContainerOther, servicesData[currentLang].other);
}

function renderCategory(container, services) {
    container.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card stagger-item';
        
        serviceCard.innerHTML = `
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-price">${service.price}</div>
        `;
        
        container.appendChild(serviceCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    renderServices();
});