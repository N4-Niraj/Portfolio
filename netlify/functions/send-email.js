const nodemailer =
    require("nodemailer");
exports.handler = async (event) => {

    if (
        event.httpMethod !==
        "POST"
    ) {
        return {
            statusCode: 405,
            body:
                JSON.stringify({
                    error:
                        "Method not allowed"

                })
        };
    }
    try {

        const {
            name,
            email,
            message
        }
            = JSON.parse(
                event.body
            );

        if (
            !name ||
            !message
        ) {

            return {
                statusCode: 400,
                body:
                    JSON.stringify({
                        error:
                            "Missing required fields"
                    })
            };
        }
        
        const transporter =
            nodemailer.createTransport({
                service:
                    "gmail",
                auth: {
                    user:
                        process.env.GMAIL_USER,
                    pass:
                        process.env.GMAIL_PASSWORD
                }
            });

        await transporter.sendMail({
            from:
                process.env.GMAIL_USER,

            to:
                process.env.GMAIL_USER,
            subject:
                `Portfolio Message from ${name}`,

            html:

                `
            <h2>New Message</h2>
            <p>
            <strong>Name:</strong>
            ${name}
            </p>

            <p>

            <strong>Email:</strong>
            ${email || "Not provided"}
            </p>

            <p>
            <strong>Message:</strong>
            </p>

            <p>
            ${message}
            </p>
            `
        });

        return {
            statusCode: 200,
            body:
                JSON.stringify({
                    success: true
                })
        };
    }
    catch (err) {
    console.error("EMAIL ERROR:", err);

    return {
        statusCode: 500,
        body: JSON.stringify({
            error: "Failed to send email"
        })
    };
}
}