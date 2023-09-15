const router = require("express").Router()

const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  getSingleCategoryController,
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
router.get("/sibgle-categories/:id", getSingleCategoryController)

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
)
module.exports = router
