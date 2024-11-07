const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura el transporte SMTP con los datos de Ferozo
const transporter = nodemailer.createTransport({
    host: "c1331888.ferozo.com",
    port: 465,
    secure: true, // Usar SSL
    auth: {
        user: "nspereztitz@arboltecno.com", // Cambia a tu usuario SMTP (correo completo)
        pass: "BBb/3qx9hF" // Cambia a tu contraseña SMTP
    }
});

app.post("/send-email", async (req, res) => {
    const { name, email } = req.body;

    const mailOptions = {
        from: "nspereztitz@arboltecno.com", // Correo del remitente (tu dirección en Ferozo)
        to: "soporte@arbol.ar", // Correo destinatario
        subject: "Nuevo contacto desde el formulario",
        text: `Nombre: ${name}\nCorreo: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Correo enviado correctamente");
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).send("Hubo un error al enviar el correo");
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
