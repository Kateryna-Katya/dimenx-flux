/**
 * DIMENX-FLUX: COMPLETE FRONT-END LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ИНИЦИАЛИЗАЦИЯ LUCIDE ICONS
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. ПЛАВНЫЙ СКРОЛЛ (LENIS)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. МОБИЛЬНОЕ МЕНЮ
    const burger = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    if (burger && mobileMenu) {
        const toggleMenu = () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        burger.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 4. АНИМАЦИИ (GSAP + SPLITTYPE)
    gsap.registerPlugin(ScrollTrigger);

    const titleElement = document.querySelector('#hero-title');
    if (titleElement && typeof SplitType !== 'undefined') {
        const splitText = new SplitType(titleElement, { types: 'chars, words' });
        gsap.from(splitText.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.03,
            duration: 1,
            ease: "back.out(1.7)",
            delay: 0.2
        });
    }

    // Общая анимация появления секций
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            opacity: 0,
            y: 40,
            duration: 0.8
        });
    });

    // 5. КАПЧА И ФОРМА
    const form = document.getElementById('main-form');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    const phoneInput = document.getElementById('phone-input');
    const formMessage = document.getElementById('form-message');

    let num1, num2, answer;

    const generateCaptcha = () => {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        if (captchaLabel) captchaLabel.innerText = `${num1} + ${num2} = ?`;
        if (captchaInput) captchaInput.value = '';
    };

    generateCaptcha();

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (parseInt(captchaInput.value) !== answer) {
                alert('Ошибка в капче! Попробуйте снова.');
                generateCaptcha();
                return;
            }

            const btn = form.querySelector('button');
            btn.innerText = 'Отправка...';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                btn.innerText = 'Начать сейчас';
                btn.disabled = false;
                formMessage.innerText = 'Спасибо! Мы свяжемся с вами в течение 15 минут.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                generateCaptcha();
            }, 1500);
        });
    }

    // 6. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookies_ok')) {
        setTimeout(() => cookiePopup.classList.add('active'), 2500);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookies_ok', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // 7. HEADER SCROLL EFFECT
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
});