import { Router } from 'express'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { transporter } from '../messageSender/emailSender/index.js'

const router = Router();

export async function register(req, res) {
  try {
    let {
      username,
      email,
      password,
      passwordCheck,
      name,
      lastName,
      phone,
      image,
      role,
    } = req.body
    if (!username || !email  || !passwordCheck)
    { return res.status(400).json("Falta username, email o passwordcheck") }
    
    if (password !== passwordCheck)
      { return res.status(400).json() }
      
    const existingUser = await User.findOne({ email: email });
    
    if (existingUser)
    { 
      return res.status(400).json("El usuario ya existe")
    }
   
    const salt = await bcrypt.genSalt();
    
    const hash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      username,
      email,
      password: hash,
      passwordCheck,
      name,
      lastName,
      phone,
      image,
      role,
    });
    
    const newUserSaved = await newUser.save();
       
    res.json(newUserSaved);
    
    try {
      const userMailOptions = {
        from: 'coderhouseuser@gmail.com',
        to: 'coderhouseuser@gmail.com',
        subject: 'Nuevo registro de usuario',
        html: `
            <h1>Datos del usuario registrado</h1>
            <span>Username: ${username}</span>
            <span>Email: ${email}</span>
            <span>First Name: ${firstName}</span>
            <span>Last Name: ${lastName}</span>
            <span>Phone: ${phone}</span>
            <span>Rol: ${role}</span>
            `,
    }
      const sendEmail = await transporter.sendMail(userMailOptions);
      return sendEmail
    } catch (error) {
      res.status(500).json({error})
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;

    
    if (!email || !password)
      return res.status(400).json()
    console.log("1");
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({error: 'No existe este usuario'})
    console.log("2");	
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword)
      return res.status(400).json({ error: 'Password incorrecta'});
    	console.log("3");
      console.log('user.id')
      console.log(user.id)
      
      console.log('JWT_SECRET')
      console.log(process.env.JWT_SECRET)
      
      console.log('TOKEN_EXPIRES_IN')
      console.log(process.env.TOKEN_EXPIRES_IN)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    console.log("3.1");
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        apellido: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
    console.log("3.2");
  } catch (err) {
    console.log("errir")
    console.log(JSON.stringify(err))
    res.status(500).json({error: JSON.stringify(err)})
  }
  console.log("4");
}

