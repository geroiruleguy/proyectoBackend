import twilio from 'twilio'

const accountSid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const authToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

const client = twilio(accountSid, authToken)

const mensaje = {
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+59899316621',
    body: 'Hola!',
}


try {
    const message = await client.messages.create(mensaje)
    console.log(message)
} catch (error) {
    console.log(error)
}