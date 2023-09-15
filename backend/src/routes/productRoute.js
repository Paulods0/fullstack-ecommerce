const { createProduct } = require("../controllers/productController")
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/create-product", requireSignIn, isAdmin, createProduct)

module.exports = router
