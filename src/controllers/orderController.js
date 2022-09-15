import Order from '../models/orders.js'
import { transporter } from '../messageSender/emailSender/index.js'

export async function createOrder(req, res) {
  
  const body = req.body;
  
  if (!body) {
    return res.status(400).json({ success: false, error: "Ha ocurrido un error! No se ingresó una orden" });
  }
  console.log(JSON.stringify(body))
  const orderNumber = await Order.estimatedDocumentCount()

  const order = new Order({
    orderNumber: orderNumber === 0 ? 1 : orderNumber + 1,
    email: body.email,
    status: body.status,
    address: body.address,
    productItems: body.productItems,
  })

  console.log(JSON.stringify(order))
  if (!order) {
    return res.status(400).json({ success: false, error: "Ha ocurrido un error! Hay campos vacíos" });
  }
  order
    .save()
    .then(() => {
      try {
        res.status(201).json({ success: true, id: order._id });
        const orderMailOptions = {

          from: 'coderhouseuser@gmail.com',
          to: 'coderhouseuser@gmail.com',
          subject: 'Orden de compra',
          html: `
          <h1>Datos de la compra</h1>
          <span>Items: ${productItems}</span>
          <span>Email: ${email}</span>
          <span>Direccion de envío: ${address}</span>
          <span>Numero de orden: ${orderNumber === 0 ? 1 : orderNumber + 1}</span>
          `
      }
        transporter.sendEmail(orderMailOptions);

      } catch (err) {
        console.error("Could not send order email.");
        console.error(JSON.stringify(err))
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
}

export async function listOrders(req, res) {
  await Order.find({})
    .then((orders) => {
      if (!orders.length) {
        return res.status(404).json({ success: false, error: 'Ha ocurrido un error! No hay ordenes' })
      }
      return res.status(200).json(orders)
    })
    .catch((err) => {
      return res.status(400).json(err)
    });
}
