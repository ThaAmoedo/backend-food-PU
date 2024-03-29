require('express-async-errors')
require("dotenv/config")

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/uploads")
const cors = require('cors')
const express = require('express')
const routes = require("./routes")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
app.use((err, req, res, next) => {

   
   if(err instanceof AppError) {
      return res.status(err.statusCode).json({
         status: 'error',
         message: err.message
      })
   }


   return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
   })
})

const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))
