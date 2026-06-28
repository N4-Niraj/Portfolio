

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

emailjs.init("BH1twCRQnrjL0wcXV");

const form = document.getElementById("guestbook-form");
const status = document.getElementById("form-status");
const button = form.querySelector("button");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";

    emailjs.sendForm(
        "service_72u2ys3",
        "template_yzge7vi",
        this
    )

    .then(() => {

        status.textContent =
            "Message sent, Thanks for stopping by!";

        status.className = "success show";

        form.reset();

        button.disabled = false;
        button.textContent = "Send";

        setTimeout(() => {

            status.classList.remove("show");

        }, 3000);

    })

    .catch(() => {

        status.textContent =
            "Failed to send message.";

        status.className = "error show";

        button.disabled = false;
        button.textContent = "Send";

        setTimeout(() => {

            status.classList.remove("show");

        }, 3000);

    });

});

document.querySelector(".profile_image")
.addEventListener("contextmenu", e => {
    e.preventDefault();
});