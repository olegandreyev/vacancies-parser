/**
 * Created by Olejka on 21.03.2017.
 */

const nodemailer = require('nodemailer');
const emailService = "gmail";
const emailUser = 'olegdarkangel@gmail.com';
const emailPass = 'javascript12369874';


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

module.exports =  function (email, body) {
    let mailOptions = {
        from: `"Vacancy Helper" <${emailUser}>`, // sender address
        to: email, // list of receivers
        subject: 'Confirmation Email', // Subject line
        html: body, // plain text body
        // html: '<b>Hello world ?</b>' // html body
    };
    return new Promise((res, rej) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                rej(error)
            } else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                res()
            }
        });
    })
};