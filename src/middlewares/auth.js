import jwt from "jsonwebtoken"


const authorization = (req, res, next) => {
  try {
    const authorizationHeader = req.header('authorization');
    
    if (!authorizationHeader)
      return res.status(401).json({ msg: "No authentication token, authorization denied." })
        
    const splittedToken = authorizationHeader.split(' ')

    const token = splittedToken[1];
  
    if (!token)
      return res.status(401).json({ msg: "No authentication token, authorization denied." })

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (!verified)
      return res.status(401).json({ msg: "Token verification failed, authorization denied." })

    req.user = verified.id
    
    next()
  } catch (err) {
    res.status(500).json({ error: err })
  }
};

export default authorization