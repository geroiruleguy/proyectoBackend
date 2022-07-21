import { createTransport } from 'nodemailer';

const TEST_MAIL = 'xxxxxxxxxxxxxx@ethereal.email'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'mimaildegmail@gmail.com',
        pass: 'mipassdegmail'
    }
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Usuario Registrado',
    html: 'Un nuevo usuario se ha registrado en tu ecommerce',
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
} catch (error) {
    console.log(error)
}