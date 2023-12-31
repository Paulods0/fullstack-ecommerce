const {
  createProduct,
  getAllProductController,
  getSingleProductController,
  getProuctPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  getRelatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
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

router.get("/product-count", productCountController)

router.get("/product-list/:page", productListController)

router.get("/search/:keyword", searchProductController)

router.get("/related-product/:pid/:cid", getRelatedProductController)

router.get("/product-category/:slug", productCategoryController)

router.get("/braintree/token", braintreeTokenController)

router.post("/braintree/payment", requireSignIn, braintreePaymentController)

router.get("/orders", requireSignIn, getOrdersController)

router.get("/get-orders", requireSignIn, getOrdersController)

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)

router.put("/order-status/:orderID", requireSignIn, isAdmin, orderStatusController)


module.exports = router
