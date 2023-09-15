const router = require("express").Router()

const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController")
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware")

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
)
//get all categories
router.get("/all-categories", getAllCategoryController)
router.get("/single-category/:slug", getSingleCategoryController)

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
)
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
)
module.exports = router
