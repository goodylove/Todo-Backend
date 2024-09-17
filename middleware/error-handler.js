const { CustomError } = require("../errors/custom-error")

const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err)

    if(err instanceof CustomError){
        res.status(err.statusCode).json({success:false, message:err.message})
    }

    return res.status(500).json({ msg: 'Something went wrong, please try again' })

}

module.exports = errorHandlerMiddleware;