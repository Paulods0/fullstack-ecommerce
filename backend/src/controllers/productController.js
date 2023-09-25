const { default: slugify } = require("slugify")
const ProductModel = require("../models/ProductModel")
const fs = require("fs")

const createProduct = async (req, res) => {
  try {
    const { name, description, slug, price, shipping, category, quantity } =
      req.fields
    const { photo } = req.files
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" })
      case !description:
        return res.status(500).send({ error: "Description is required" })
      case !price:
        return res.status(500).send({ error: "Price is required" })
      case !category:
        return res.status(500).send({ error: "Category is required" })
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" })
      case photo && photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" })
    }

    const product = await new ProductModel({
      ...req.fields,
      slug: slugify(name),
    })
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }
    await product.save()
    res.status(201).send({
      success: true,
      message: "Product created succesfuly",
      product,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while creating the product",
      error,
    })
  }
}

const getAllProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All products",
      products,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      messgae: "Not Found",
      error,
    })
  }
}

const getSingleProductController = async (req, res) => {
  const { slug } = req.params
  try {
    const product = await ProductModel.findOne({ slug })
      .populate("category")
      .select("-photo")
    if (!product) {
      return res.status(404).send({ message: "Couldn't find the product" })
    }
    res.status(200).send({
      success: true,
      message: "Successfuly",
      product,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting the product",
      error,
    })
  }
}

const getProuctPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo")
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting the photo",
      error,
    })
  }
}

const deleteProductController = async (req, res) => {
  const { id } = req.params
  try {
    if (!id) {
      return res.status(500).send({
        message: "Id was not provided",
      })
    }
    await ProductModel.findByIdAndDelete({ _id: id }).select("-photo")
    res.status(200).send({
      success: true,
      message: "Succefuly deleted",
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    })
  }
}

const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, price, shipping, category, quantity } =
      req.fields
    const { photo } = req.files
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" })
      case !description:
        return res.status(500).send({ error: "Description is required" })
      case !price:
        return res.status(500).send({ error: "Price is required" })
      case !category:
        return res.status(500).send({ error: "Category is required" })
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" })
      case photo && photo.size > 2000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" })
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    )
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path)
      product.photo.contentType = photo.type
    }
    await product.save()
    res.status(201).send({
      success: true,
      message: "Product updated succesfuly",
      product,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while updating the product",
      error,
    })
  }
}

const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }

    const products = await ProductModel.find(args)

    res.status(200).send({
      success: true,
      products,
    })
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Something went wrong", error })
  }
}

const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      total,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: "Error in product count",
      success: false,
      error,
    })
  }
}

const productListController = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page ? req.params.page : 1

    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })

    res.status(200).send({ success: true, products })
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .send({ success: false, message: "Something went wrong", error })
  }
}

module.exports = {
  createProduct,
  getAllProductController,
  getSingleProductController,
  getProuctPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
}
