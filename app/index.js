const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    res.send("Email sent successfully!");
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log('Email sender running on http://localhost:3000'));
module.exports = app;
