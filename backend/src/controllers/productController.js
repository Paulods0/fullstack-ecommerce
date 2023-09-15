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

module.exports = { createProduct }
