const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 0);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();

        const target = document.querySelector(
            anchor.getAttribute('href')
        );

        if (target) {
            const navHeight = nav.offsetHeight;

            window.scrollTo({
                top: target.offsetTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});