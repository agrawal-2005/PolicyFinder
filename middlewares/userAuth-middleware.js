import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

var checkAuth = async (req, res, next) => {   
         var token="a";
          token = req.query.token; 
          if(typeof token === 'undefined'){
            token=req.body.token;
        }
    try {
      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)
      // Get User from Token
   

      req.user = await UserModel.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default checkAuth