const brcypt = require("bcrypt")

const hashPassword = (password) => {
  try {
    const saltRounds = brcypt.genSaltSync(10)
    const hashedPassword = brcypt.hashSync(password, saltRounds)
    return hashedPassword
  } catch (error) {
    console.log(error)
  }
}

const comparePassword = (password, hashedPassword) => {
  try {
    return brcypt.compareSync(password, hashedPassword)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { hashPassword, comparePassword }
