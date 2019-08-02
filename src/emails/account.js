const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from:"Olof.spango@gmail.com",
        to: email,
        subject:"Thanks for signing up.",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}


const cancellationEmail = (email, name) => {
    sgMail.send({
        from:"Olof.spango@gmail.com",
        to: email,
        subject:"Sorry to see you leave.",
        text: `Hi ${name}. We are sad to see you leave. Let us know if there is anything we can do to have you back with us again.`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancellationEmail
}