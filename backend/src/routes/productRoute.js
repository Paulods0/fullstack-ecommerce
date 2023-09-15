const { createProduct } = require("../controllers/productController")
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware")
const formidable = require("express-formidable")

const router = require("express").Router()

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
)

module.exports = router
