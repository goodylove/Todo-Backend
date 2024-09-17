const express = require('express');
const connectDB = require('./db/connect');
const router = require("./Routes/todo")
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require("dotenv").config()
const app = express();


app.use(express.static("./public"))
app.use(express.json())

app.use("/api/v1/todo", router)


app.use(notFound)
app.use(errorHandlerMiddleware)




const PORT = process.env.PORT || 8000


const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
         
        })

    }catch(err){
        console.error("Error starting server", )
    }
}



start()



