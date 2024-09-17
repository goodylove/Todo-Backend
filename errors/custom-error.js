
class CustomError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}



const customErrorHandler = (msg,sta)=>{
    return new CustomError(msg,sta)

}


module.exports = {customErrorHandler, CustomError}