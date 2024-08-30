const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: 'your-email@gmail.com', 
        pass: 'your-email-password' 
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@gmail.com', 
    subject: 'Contact Form Submission',
    text: '' 
};

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    mailOptions.text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.json({ success: true, message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
