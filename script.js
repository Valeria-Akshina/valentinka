// Получаем элементы
const heart = document.getElementById('heart');
const photoContainer = document.getElementById('photo-container');
const closeBtn = document.getElementById('close');

let isBeating = false;
let photoShown = false;

// Функция для анимации биения
function startBeating() {
    if (isBeating || photoShown) return;
    
    isBeating = true;
    heart.classList.add('beating');
    
    // Через 4 секунды показываем фото
    setTimeout(() => {
        if (!photoShown) {
            photoContainer.classList.remove('hidden');
            photoShown = true;
            heart.style.opacity = '0.3';
        }
        heart.classList.remove('beating');
        isBeating = false;
    }, 2000);
}

// Функция скрытия фото
function hidePhoto() {
    photoContainer.classList.add('hidden');
    photoShown = false;
    heart.style.opacity = '1';
}

// Клик на сердечко
heart.addEventListener('click', function(e) {
    e.preventDefault();
    startBeating();
    
    // Вибрация на iPhone (необязательно)
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
});

// Клик на кнопку закрытия
closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    hidePhoto();
});

// Клик на фон
photoContainer.addEventListener('click', function(e) {
    if (e.target === photoContainer) {
        hidePhoto();
    }
});

// Клик на само фото (не закрывать)
const photoContent = document.querySelector('.photo-content');
if (photoContent) {
    photoContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Клавиша ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !photoContainer.classList.contains('hidden')) {
        hidePhoto();
    }
});

// Свайп вниз для закрытия на iPhone
let touchStartY = 0;

photoContainer.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

photoContainer.addEventListener('touchmove', function(e) {
    if (!photoContainer.classList.contains('hidden')) {
        e.preventDefault();
    }
});

photoContainer.addEventListener('touchend', function(e) {
    if (!photoContainer.classList.contains('hidden')) {
        const touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchEndY - touchStartY;
        
        if (swipeDistance > 80) {
            hidePhoto();
        }
    }
});

// Фикс для 100vh на iPhone
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.body.style.minHeight = `${window.innerHeight}px`;
}

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', function() {
    setTimeout(setVh, 100);
});
setVh();

// Прелоад фото
window.addEventListener('load', function() {
    const img = document.querySelector('.photo');
    if (img) {
        const preload = new Image();
        preload.src = img.src;
    }
});