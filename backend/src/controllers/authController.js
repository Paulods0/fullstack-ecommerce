const { hashPassword, comparePassword } = require("../helpers/authHelper")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
  const { name, password, email, phone, address } = req.body
  //hash the password
  const hashedPassword = hashPassword(password)
  try {
    //validations
    if (!name) {
      return res.status(400).send({
        error: "Missing required field.",
        message: "The name field is required!",
      })
    }
    if (!email) {
      return res.status(400).send({
        error: "Missing required field.",
        message: "The email field is required!",
      })
    }
    if (!address) {
      return res.status(400).send({
        error: "Missing required field.",
        message: "The address field is required!",
      })
    }
    if (!phone) {
      return res.status(400).send({
        error: "Missing required field.",
        message: "The phone field is required!",
      })
    }
    //if the user's email is already registed
    const existingUserEmail = await User.findOne({ email })
    if (existingUserEmail) {
      return res.status(409).send({
        error: "Conflict!",
        message: "Already registed, please login!",
      })
    }
    //register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save()

    res.status(200).json({
      message: "Success!",
      failed: false,
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      failed: true,
    })
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(404).json({
        error: "User not found",
        messge: "Invalid email or password!",
      })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status()
        .send({ success: false, message: "Email is not registed" })
    }
    const isSamePassword = comparePassword(password, user.password)
    if (!isSamePassword) {
      return res.status(401).json({
        error: "Authentication failed!",
        message: "Invalid password!",
      })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    res.status(200).json({
      success: true,
      message: "succesfuly logged in",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    })
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error,
    })
  }
}

//test controller
const testController = async (req, res) => {
  console.log("Protected route")
  res.send("Protected route")
}
module.exports = { registerController, loginController, testController }
