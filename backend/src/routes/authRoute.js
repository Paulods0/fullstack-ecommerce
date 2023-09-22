const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllUsers,
} = require("../controllers/authController")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/forgot-password", forgotPasswordController)
//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})
//protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})
router.get("/get-users", requireSignIn, isAdmin, getAllUsers)

router.get("/test", requireSignIn, isAdmin, testController)
module.exports = router
