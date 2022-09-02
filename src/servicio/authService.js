//import authDaos (crear este archivo)
//al daos no le paso el req, sino solo lo que necesita req.body.email o req.body.password
// el daos en el cath hace un trhow y en el try hace un return
export const loginService = async (reqexport const loginController = (req, res) =>  {
   
   try {
    const login = await loginService.login(req)
    res.status(200).json(login)
    
   } catch (error) {
    res.status(400).send('error en login')
   } 
}) =>  {
   
    try {
     const login = await authDaos.login(req)
     return login
     
    } catch (error) {
     throw error
    } 
 }