import jwt from 'jsonwebtoken'


export const verifyToken = (req,res,next)=>{
      const token = req.cookies?.userJWT

      if (!token) {
        res.status(400).json({error:"Access denied please login first "})
        return
      }

      try {
        const data = jwt.verify(token,'secretkey')
        req.userId = data.id
        next()
        
      } catch (error) {
       res.status(400).json({error:error.message}) 
      }
}