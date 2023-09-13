const mongoose = require("mongoose")
const colors = require("colors")

module.exports = connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log(
      `DB connected successfuly! ${connection.connection.host}`.bgMagenta.white
    )
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white)
  }
}
// module.exports = { connectDB }
