module.exports = function sendEmail() {
    const nodemailer = require('nodemailer');
    require('dotenv').config()

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'doanthao1503@gmail.com',
            clientId: '565251832636-nblpn7hqppckrjrtfa3fmt406getkunb.apps.googleusercontent.com',
            clientSecret: 'olE-g2j2nW0DPkROPZoTUtsI',
            refreshToken: '1//04xJjZ7HGyiOUCgYIARAAGAQSNwF-L9IrrI806Dz0Fff-9_g1H30fR4goxHaYBjG5n0AHjsa4bimxVtfWJVhtY0Pehd0sbxeX7_4',
            accessToken: 'ya29.a0AfH6SMBbI592SzNaD1K1VnyA5XsgHKArAiLE7U_k4Z7UHIWLlnf9Psf2rN0NOq1ILY_arXeh13HgTO2TIyfH0MmXKpRomMM2dNMDRgYbYnxGHHF641803YeqHSFvHnsUqlrSHbEzC0MiH9rR9-um3UmXgvswZV84fd4'
        }
    });

    var mailOptions = {
        from: 'Semi',
        to: 'doanthao150399999@gmail.com',
        subject: 'Warning CPU',
        text: 'CPU is too high'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            console.log('Preview URL:', nodemailer.getTestMessageUrl(mailOptions));
        }
    });
}
