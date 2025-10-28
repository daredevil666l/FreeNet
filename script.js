// ===== Device Detection =====
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;

    return {
        isIOS,
        isAndroid,
        isMobile,
        isDesktop: !isMobile,
        isStandalone
    };
}

// ===== PWA Install Handler =====
let deferredPrompt = null;

// Слушаем событие beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем автоматический показ промпта
    e.preventDefault();
    // Сохраняем событие для использования позже
    deferredPrompt = e;
    console.log('PWA installable');
});

// Слушаем событие успешной установки
window.addEventListener('appinstalled', (e) => {
    console.log('PWA installed successfully');
    deferredPrompt = null;

    // Показываем уведомление об успешной установке
    showSuccessMessage();
});

// ===== DOM Elements =====
const installButton = document.getElementById('installButton');
const modal = document.getElementById('installModal');
const closeModalBtn = document.getElementById('closeModal');
const skipButton = document.getElementById('skipButton');
const iosGuide = document.getElementById('iosGuide');
const androidGuide = document.getElementById('androidGuide');
const desktopGuide = document.getElementById('desktopGuide');

// ===== Show Installation Guide =====
function showInstallGuide() {
    const device = detectDevice();

    // Скрываем все руководства
    iosGuide.style.display = 'none';
    androidGuide.style.display = 'none';
    desktopGuide.style.display = 'none';

    // Показываем нужное руководство
    if (device.isIOS) {
        iosGuide.style.display = 'block';
    } else if (device.isAndroid) {
        androidGuide.style.display = 'block';
    } else {
        desktopGuide.style.display = 'block';
    }

    // Показываем модальное окно
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// ===== Hide Installation Guide =====
function hideInstallGuide() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ===== Install PWA =====
async function installPWA() {
    const device = detectDevice();

    // Если приложение уже установлено
    // if (device.isStandalone) {
    //     alert('Приложение уже установлено! 🎉');
    //     return;
    // }
if (device.isStandalone) {
    window.location.href = 'map.html';
}

    // Для Chrome/Edge на Android и Desktop
    if (deferredPrompt) {
        try {
            // Показываем нативный промпт установки
            deferredPrompt.prompt();

            // Ждем выбора пользователя
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            // Очищаем промпт
            deferredPrompt = null;
        } catch (error) {
            console.error('Error during PWA installation:', error);
            showInstallGuide();
        }
    } else {
        // Для Safari на iOS и других браузеров
        showInstallGuide();
    }
}

// ===== Success Message =====
function showSuccessMessage() {
    // Создаем элемент уведомления
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: white;
        padding: 32px;
        border-radius: 18px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        text-align: center;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    successDiv.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Успешно установлено!</h3>
        <p style="font-size: 15px; color: rgba(60, 60, 67, 0.6);">FreeNet готов к использованию</p>
    `;

    document.body.appendChild(successDiv);

    // Анимация появления
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);

    // Удаление через 3 секунды
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// ===== Event Listeners =====
installButton.addEventListener('click', installPWA);

closeModalBtn.addEventListener('click', hideInstallGuide);

skipButton.addEventListener('click', hideInstallGuide);

// Закрытие модального окна при клике на фон
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideInstallGuide();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        hideInstallGuide();
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    const device = detectDevice();

    console.log('Device info:', device);

    // Если приложение запущено из standalone режима (с рабочего стола), сразу перенаправляем на карту
    if (device.isStandalone) {
        console.log('App launched from home screen, redirecting to map...');
        window.location.href = 'map.html';
        return; // Останавливаем дальнейшее выполнение
    }

    // Изменяем текст кнопки в зависимости от устройства
    if (device.isIOS) {
        installButton.innerHTML = '<span class="button-icon">📥</span> Инструкция по установке';
    } else if (deferredPrompt) {
        installButton.innerHTML = '<span class="button-icon">📥</span> Установить приложение';
    }
});

// ===== Utility: Add animations on scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за элементами с классом .fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});
