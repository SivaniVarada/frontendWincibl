const nodemailer = require('nodemailer');

// Create a transporter using your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yvishnuvamsith@gmail.com',
    pass: 'ftly gard wakp xwec',
  },
});

// Function to send an email notification
const sendEmailNotification = (to, subject, text) => {
  const mailOptions = {
    from: 'yvishnuvamsith@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmailNotification;
