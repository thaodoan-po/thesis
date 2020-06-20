module.exports = function sendEmail (){
    const nodemailer = require('nodemailer');
    require('dotenv').config()

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Email_Pass
        }
    });

    var mailOptions = {
        from: 'Semi',
        to: 'doanthao150399999@gmail.com',
        subject: 'Warning CPU',
        text: 'CPU is too high'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        // if (error) {
        //   console.log(error);
        // } else {
        //   console.log('Email sent: ' + info.response);
        // }
    });
}