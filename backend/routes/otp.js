//routes/borrow.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const gmailpassword = process.env.gmail_password;
router.post('/send-otp/', (req, res) => {
    const randomOTP = Math.floor(10000 + Math.random() * 90000); // Generates OTP between 10000 and 99999
    const userEmailAddress = req.body.userEmail;
    console.log('email', userEmailAddress);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aman.music420@gmail.com',
          pass: gmailpassword
        }
    });

    const mailOptions = {
        from: 'aman.music420@gmail.com',
        to: userEmailAddress,
        subject: 'OTP Verification',
        text: `Your OTP is: ${randomOTP}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.json({ success: false });
        } else {
            console.log('Email sent:', info.response);
            // 
            res.json({ success: true });
        }
    });
});




  
module.exports = router;