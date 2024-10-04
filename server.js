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
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
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

app.post('/', (req, res) => {
    const {name, email, message} = req.body;
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: `Message is sent from <strong>${email}</strong><br><br>${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent successfully');
    });
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
export const handler = serverless(app);