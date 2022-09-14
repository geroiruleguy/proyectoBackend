import { createTransport } from 'nodemailer'


export const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'coderhouseuser@gmail.com',
        pass: 'coderhouse'
    }
})

