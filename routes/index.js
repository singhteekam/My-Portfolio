const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ContactForm = require('./../models/contactForm');

const router = express();


router.get('/', function (req, res) {
    res.render('./../index');
});

router.post('/contactform', (req, res) => {
    console.log("contact form")
    const contactFormData = {
        formName: req.body.formName,
        formEmail: req.body.formEmail,
        formNumber: req.body.formNumber,
        formText: req.body.formText
    }

    console.log("contact form")

    ContactForm.create(contactFormData).then(() => {
        console.log("Contact Form submitted");

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_MAIL, // generated ethereal user
                pass: process.env.USER_PASS // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let receivers = [process.env.USER_MAIL, req.body.formEmail]; // multiple receivers
        receivers.forEach((receiver) => {
            let mailOptions = {
                from: req.body.formEmail,
                to: receiver, // list of receivers
                subject: 'Contact form submitted successfully', // Subject line
                text: "Hello, \n\nContact Form Details: \n" + "Name: " + req.body.formName + "\nEmail: " + req.body.formEmail + "\nPhone: " + req.body.formNumber + "\nMessage: " + req.body.formText
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

        }); // End of forEach loop


        res.redirect('/');
    }).catch(err => {
        res.send("Error" + err);
    })
})

module.exports = router;