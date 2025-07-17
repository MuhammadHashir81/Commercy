import jwt from 'jsonwebtoken'


export const verifySellerToken = (req,res,next)=>{
      const token = req.cookies?.sellerJWT
      console.log(token)

      if (!token) {
        res.status(400).json({error:"Access denied please login first "})
        return
      }

      try {
        const data = jwt.verify(token,'secretkey')
        req.sellerUserId = data.id
        next()
        
      } catch (error) {
       res.status(400).json({error:error.message}) 
      }
}