import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mg from "mailgun-js";
import dotenv from 'dotenv';


const port = process.env.PORT || 3030;

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mailgun = mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

app.post('/portfolio/send-email', (req, res) => {
    const { nama, email, pesan } = req.body;
    mailgun.messages().send({
        from: email,
        to: 'projectdevelopment098@gmail.com',
        subject: `email from ${nama} send by portfolio website`,
        html: `<p>${pesan}</p>`
    },
        (error, body) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    status: 'error',
                    message: 'terjadi kesalahan saat pengiriman pesan'
                });
            } else {
                res.status(200).json({
                    status: 'ok',
                    message: 'berhasil dikirim'
                });
            }
        })
});

app.listen(port, () => console.log(`server running on port :    ${port}`))