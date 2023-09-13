const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
  }
}

//admin middleware
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.role !== 1) {
      return res.status(401).send({ success: false, message: "UnAuthorized!" })
    }
    next()
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ success: false, message: "Error in admin middleware", error })
  }
}
module.exports = { requireSignIn, isAdmin }
