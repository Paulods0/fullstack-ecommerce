require("dotenv").config()
const { default: slugify } = require("slugify")
const ProductModel = require("../models/ProductModel")
const fs = require("fs")
const CategoryModel = require("../models/CategoryModel")
const braintree = require("braintree")
const OrderModel = require("../models/OrderModel")

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

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

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params
    if (!keyword) {
      return res.status(400).send({ message: "Error while searching" })
    }
    const product = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo")

    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while searching",
      error,
    })
  }
}

const getRelatedProductController = async (req, res) => {
  try {
    const { productId, categoryId } = req.params
    const products = await ProductModel.find({
      categoy: categoryId,
      _id: { $ne: productId },
    })
      .select("-photo")
      .limit(3)
      .populate("category")

    res.status(200).send(products)
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .send({ message: "Error while fetching the similar products" })
  }
}

const productCategoryController = async (req, res) => {
  const { slug } = req.params
  try {
    const category = await CategoryModel.findOne({ slug })
    const product = await ProductModel.find({ category }).populate("category")

    res.status(200).send({ success: true, product, category })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Something went wrong", error })
  }
}

//payment gateway api
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body
    let total = 0
    cart.map((item) => (total += item.price))
    const newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const orders = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save()
          res.json({ ok: true })
        } else {
          res.status(500).send(error)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
}

const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name")

    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while fetching the orders",
      error,
    })
  }
}

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" })
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "Error while fetching the orders",
      error,
    })
  }
}

const orderStatusController = async (req, res) => {
  try {
    const { orderID } = req.params
    const { status } = req.body
    const order = await OrderModel.findOneAndUpdate(
      { _id: orderID },
      { status },
      { new: true }
    )
    res.status(200).json(order)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error while updating the order's status",
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
}
