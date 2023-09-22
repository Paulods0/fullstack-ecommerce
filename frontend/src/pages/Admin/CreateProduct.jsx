import React, { useEffect, useState } from "react"
import AdminMenu from "../../components/AdminMenu"
import toast from "react-hot-toast"
import api from "../../config/axiosConfig"
import { useNavigate } from "react-router-dom"
import LoaderSpinner from "../../components/LoaderSpinner"

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [photo, setPhoto] = useState("")
  const [shipping, setShipping] = useState(false)

  const createProduct = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const productFormData = new FormData()
      productFormData.append("name", name)
      productFormData.append("category", category)
      productFormData.append("description", description)
      productFormData.append("price", price)
      productFormData.append("shipping", shipping)
      productFormData.append("quantity", quantity)
      productFormData.append("photo", photo)

      const response = await api.post(
        "/product/create-product",
        productFormData
      )
      if (response.data?.success) {
        toast.success(response.data.message)
        setPhoto("")
        setDescription("")
        setQuantity("")
        setPrice("")
        setName("")
        navigate("/dashboard/admin/products")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
    setIsLoading(false)
  }

  const getAllCategories = async () => {
    try {
      const { data } = await api.get("/category/all-categories")
      if (data?.success) {
        setCategories(data?.categories)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <section className="flex items-start mt-4 gap-4 w-full mb-6">
      <AdminMenu />
      <div className="relative w-full flex flex-col items-start px-2">
        <h1 className="text-4xl mb-4 font-bold w-full">Create Product</h1>
        <div className="w-full flex flex-col mt-6 gap-4">
          <div className="w-full flex flex-col gap-2">
            <select
              className="w-full border-2 rounded-md border-zinc-900 p-2"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              placeholder="Select a category"
            >
              <option value="">All categories</option>
              {categories?.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="mt-3 w-full">
              <label className="w-full rounded-md border-2 border-zinc-900 p-2">
                {photo ? photo.name : "Upload photo"}
                <input
                  className="w-full"
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div>
              <div className="w-[200px] mx-auto mt-6">
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-center">
            <div className="w-full border-2 border-zinc-900 rounded-md">
              <input
                type="text"
                placeholder="Write a name"
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <textarea
              type="text"
              placeholder="Write the description"
              className="w-full h-[100px] p-2 rounded-md border-2 border-zinc-900 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="w-full border-2 border-zinc-900 rounded-md">
              <input
                type="number"
                placeholder="Write a price"
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-full border-2 border-zinc-900 rounded-md">
              <input
                type="number"
                placeholder="Write a quantity"
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="w-full">
              <select
                className="w-full rounded-md border-2 border-zinc-900 p-2 outline-none"
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <button
              onClick={createProduct}
              className="w-full p-2 bg-zinc-900 text-white rounded-md hover:scale-95 duration-200"
            >
              Create product
            </button>
          </div>
        </div>
      </div>
      {isLoading ? <LoaderSpinner color="red" secondaryColor="black" /> : ""}
    </section>
  )
}

export default CreateProduct
