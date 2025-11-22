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
});
