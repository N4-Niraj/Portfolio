const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {

    nav.classList.toggle(
        'scrolled',
        window.scrollY > 0
    );

});


document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener('click', e => {

        e.preventDefault();

        const target = document.querySelector(

            anchor.getAttribute('href')

        );

        if (target) {

            const navHeight =
                nav.offsetHeight;

            window.scrollTo({

                top:

                target.offsetTop
                - navHeight,

                behavior: 'smooth'

            });

        }

    });

});



const form =
document.getElementById(
    "guestbook-form"
);

const status =
document.getElementById(
    "form-status"
);

const button =
form.querySelector(
    "button"
);



let lastSubmitTime = 0;

const SUBMIT_COOLDOWN =
15000;



form.addEventListener(

    "submit",

    async (e) => {

        e.preventDefault();

        const now =
        Date.now();



        if (

            now - lastSubmitTime

            <

            SUBMIT_COOLDOWN

        ) {

            status.textContent =

            "Please wait before sending another message.";

            status.className =

            "error show";

            setTimeout(() => {

                status.classList.remove(

                    "show"

                );

            }, 3000);

            return;

        }



        const formData = {

            name:

            form.name.value.trim(),

            email:

            form.email.value.trim(),

            message:

            form.message.value.trim()

        };



        if (

            !formData.name

        ) {

            status.textContent =

            "Please enter your name.";

            status.className =

            "error show";

            return;

        }



        if (

            !formData.message

        ) {

            status.textContent =

            "Please enter a message.";

            status.className =

            "error show";

            return;

        }



        if (

            formData.message.length

            >

            1000

        ) {

            status.textContent =

            "Message too long.";

            status.className =

            "error show";

            return;

        }



        button.disabled = true;

        button.textContent =

        "Sending...";



        try {

            const response =

            await fetch(

                "/.netlify/functions/send-email",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":

                        "application/json"

                    },

                    body:

                    JSON.stringify(

                        formData

                    )

                }

            );



            const data =

            await response.json();



            if (

                response.ok

            ) {

                lastSubmitTime =

                Date.now();



                status.textContent =

                "Message sent! Thanks for stopping by!";



                status.className =

                "success show";



                form.reset();

            }

            else {

                status.textContent =

                data.error ||

                "Failed to send message.";



                status.className =

                "error show";

            }

        }

        catch {

            status.textContent =

            "Network error.";



            status.className =

            "error show";

        }



        button.disabled = false;

        button.textContent =

        "Send";



        setTimeout(() => {

            status.classList.remove(

                "show"

            );

        }, 3000);

    }

);




document.querySelector(

    ".profile_image"

)

.addEventListener(

    "contextmenu",

    e => {

        e.preventDefault();

    }

);