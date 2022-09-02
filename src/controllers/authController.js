import passport from 'passport' //no se debe usar aca ?
import { loginService } from '../servicio/authService'

export const registroController = passport.authenticate('registro', {
    failureRedirect: '/auth/failRegister',
    successRedirect: '/auth/successRegister'
})

// export const loginController = passport.authenticate('login', {
//     failureRedirect: '/auth/failLogin',
//     successRedirect: '/auth/successLogin',
// })
export const loginController = (req, res) =>  {
   
   try {
    const login = await loginService(req)
    res.status(200).json(login)
    
   } catch (error) {
    res.status(400).send('error en login')
   } 
}


export function successRegisterController(req, res) {
    res.json({ msg: 'ok' })
}

export function failRegisterController(req, res) {
    res.status(400).json({ err: 'fallo el registro' })
}

export function successLoginController(req, res) {
    res.json({ msg: 'ok' })
}

export function failLoginController(req, res) {
    res.status(400).json({ err: 'fallo el login' })
}


export function logoutController(req, res) {
    if (req.isAuthenticated()) {
        req.logout()
    }
    res.sendStatus(200)
} 