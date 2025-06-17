const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');


// Handle contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: 'New Contact Form Inquiry',
      text: `You have received a new contact form inquiry:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `<p>You have received a new contact form inquiry:</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Contact message received and email sent' });
  } catch (err) {
    console.error('Error handling contact form submission:', err);
    if (err.response) {
      console.error('Nodemailer response:', err.response);
    }
    res.status(500).json({ message: 'Contact message received and email sent' });
  }
});

module.exports = router;
