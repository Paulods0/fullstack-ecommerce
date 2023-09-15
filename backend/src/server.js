const express = require("express")
require("dotenv").config()
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const connectDB = require("./config/db")

const categoryRoute = require("./routes/categoryRoutes")
const authRoute = require("./routes/authRoute")
const PORT = process.env.PORT || 8000

//connect to db
connectDB()

//rest objec
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//rest api
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/category", categoryRoute)

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  )
  // console.log(colors)
})

//5O1Swg1Q0yTxJ4WU
