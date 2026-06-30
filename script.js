const form = document.getElementById("guestbook-form");
const status = document.getElementById("form-status");
const button = form.querySelector("button");

let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 3000;

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const now = Date.now();

    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {

        status.textContent =
            "Please wait before sending another message.";

        status.className = "error show";

        return;

    }

    lastSubmitTime = now;

    button.disabled = true;
    button.textContent = "Sending...";

    const formData = {

        name: form.name.value,
        email: form.email.value,
        message: form.message.value

    };

    try {

        const response = await fetch(

            "/.netlify/functions/send-email",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify(formData)

            }

        );

        if (response.ok) {

            status.textContent =
                "Message sent! Thanks for stopping by!";

            status.className =
                "success show";

            form.reset();

        }

        else {

            status.textContent =
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

    button.textContent = "Send";

    setTimeout(() => {

        status.classList.remove("show");

    }, 3000);

});