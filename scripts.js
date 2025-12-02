document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Time & Date
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        const el = document.getElementById('time-display');
        if (el) {
            el.innerHTML = `${dateStr} <span style="opacity:0.6">|</span> ${timeStr}`;
        }
    }

    updateTime();
    setInterval(updateTime, 1000);

    // 2. Navbar Scroll Effect
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 450);
        });
    }
    // 3. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');

            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});
