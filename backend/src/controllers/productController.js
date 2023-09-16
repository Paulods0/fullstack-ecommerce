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
      case photo && photo.size > 2000000:
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

module.exports = {
  createProduct,
  getAllProductController,
  getSingleProductController,
  getProuctPhotoController,
  deleteProductController,
  updateProductController,
}
