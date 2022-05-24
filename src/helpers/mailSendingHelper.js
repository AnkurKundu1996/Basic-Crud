const sgMail = require('@sendgrid/mail');
const env = require('../config/env');

sgMail.setApiKey(env.SENDGRID_API_KEY);

const forgetPasswordMail = (email,name,otp) => {
    sgMail.send({
        to: email,
        from: 'ankur@codelogicx.com',
        subject: 'Forgot your Password!',
        text: `Hey ${name}. You seemed to have forgot your password. Here is your OTP: ${otp}.`
    })
};

module.exports = {
    forgetPasswordMail
}