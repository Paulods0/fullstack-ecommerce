const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/test", requireSignIn, isAdmin, testController)

module.exports = router
