// تأثير كتابة العنوان الرئيسى بشكل تدريجي
window.addEventListener('DOMContentLoaded', (event) => {
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');

    heroTitle.classList.add('fade-in');
    heroDescription.classList.add('fade-in');
});
