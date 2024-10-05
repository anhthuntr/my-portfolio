import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(bodyParser.json());

// nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', process.env.VITE_CLIENT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

app.post('/', async (req, res) => {
    const {name, email, message} = req.body;
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: `Message is sent from <strong>${email}</strong><br><br>${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');

        //send thankyou email
        await sendThankyou(name, email);
    } catch (error) {
        console.error("Error sending message", error);
        res.status(500).send(error.toString());
    }
});

async function sendThankyou(name, email) {
    const mailOptions = {
        from: `Thu A. Nguyen <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thanks for your message! ✨🤍`,
        html: `Hi ${name}, <br><br>Thank you so much for reaching out to me. If you have any queries, I will get back to you as soon as possible! <br><br> Sincerely,<br>Thu `
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Thank you email sent successfully!');
    } catch (error) {
        console.error("Error sending thank you email:", error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
//export const handler = serverless(app);