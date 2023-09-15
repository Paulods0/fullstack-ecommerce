const CategoryModel = require("../models/CategoryModel")
const slugify = require("slugify")

const createCategoryController = async (req, res) => {
  const { name } = req.body
  try {
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      })
    }
    const existingCategory = await CategoryModel.findOne({ name })
    if (existingCategory) {
      return res.status(409).send({ message: "Category already exists" })
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save()

    res.status(201).send({
      success: true,
      message: "Successfully created",
      data: category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong!",
    })
  }
}

const getAllCategoryController = async (req, res) => {
  try {
    const categories = await CategoryModel.find({})
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "There's no categories!",
      })
    }
    res.status(200).send({
      success: true,
      message: "success",
      data: categories,
    })
  } catch (error) {}
}

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    )
    res.status(200).send({
      success: true,
      message: "Category updated successfuly",
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Failed while updating!",
    })
  }
}

const getSingleCategoryController = async (req, res) => {
  const { id } = req.params
  try {
    const category = await CategoryModel.findById({ _id: id })
    if (!category) {
      return res.status(404).res.send({ message: "Not found" })
    }
    res
      .status(200)
      .send({ success: true, message: "Category found!", category })
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success: false,
      message: "Something went wrong",
    })
  }
}

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  getSingleCategoryController,
}
