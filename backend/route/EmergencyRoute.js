const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yvishnuvamsith@gmail.com',
    pass: 'mdpn lifx vbso swlp',
  },
});

router.post('/Location', async (req, res) => {
  
  const { latitude, longitude, emergencyType } = req.body;
  console.log(latitude)
  const mailOptions = {
    from: 'yvishnuvamsith@gmail.com',
    to: 'yvishnuvamsith@gmail.com',
    subject: 'Emergency Location',
    text: `Emergency Type: ${emergencyType}\nLatitude: ${latitude}\nLongitude: ${longitude}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Emergency location sent successfully' });
  } catch (error) {
    console.error('Error sending emergency location email:', error);
    res.status(500).json({ message: 'An error occurred while sending the emergency location' });
  }
});

module.exports = router;

