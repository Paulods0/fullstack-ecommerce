const {
  createProduct,
  getAllProductController,
  getSingleProductController,
  getProuctPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
} = require("../controllers/productController")
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
router.get("/get-product", getAllProductController)
router.get("/get-product/:slug", getSingleProductController)
router.get("/product-photo/:pid", getProuctPhotoController)
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
)
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
)

router.post("/product-filters", productFiltersController)

module.exports = router
