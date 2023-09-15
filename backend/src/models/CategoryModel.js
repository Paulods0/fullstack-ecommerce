const mongoose = require("mongoose")

const CategoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
})

module.exports = mongoose.model("categories", CategoryModel)
