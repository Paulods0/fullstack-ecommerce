import { useState, useEffect } from "react"
import AdminMenu from "../../components/AdminMenu"
import { toast } from "react-hot-toast"
import api from "../../config/axiosConfig"
import CategoryForm from "../../components/CategoryForm"
import Modal from "../../components/Modal"
import { useNavigate, useParams } from "react-router-dom"
import LoaderSpinner from "../../components/LoaderSpinner"
import DeleteModal from "../../components/DeleteModal"

const UpdateProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [photo, setPhoto] = useState("")
  const [shipping, setShipping] = useState(false)
  const [id, setId] = useState("")
  const [catName, setCatName] = useState("")

  const getSingleProduct = async () => {
    try {
      const { data } = await api.get(`/product/get-product/${params.slug}`)

      setName(data.product.name)
      setId(data.product._id)
      setPrice(data.product.price)
      setShipping(data.product.shipping)
      setQuantity(data.product.quantity)
      setDescription(data.product.description)
      setCategory(data.product.category._id)
      setCatName(data.product.category.name)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  const updateProduct = async (e) => {
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
      photo && productFormData.append("photo", photo)

      const { data } = await api.put(
        `/product/update-product/${id}`,
        productFormData
      )
      if (data?.success) {
        toast.success(data.message)
        setName(data.product.name)
        setId(data.product._id)
        setPrice(data.product.price)
        setShipping(data.product.shipping)
        setQuantity(data.product.quantity)
        setDescription(data.product.description)
        setCategory(data.product.category._id)
        setCatName(data.product.category.name)
        navigate("/dashboard/admin/products")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
    setIsLoading(false)
  }

  const deleteProduct = async () => {
    try {
      setIsLoading(true)
      await api.delete(`/product/delete-product/${id}`)
      toast.success("Successfuly deleted")
      navigate("/dashboard/admin/products")
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
    setIsOpen(false)
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
    getSingleProduct()
    getAllCategories()
  }, [])

  return (
    <section className=" flex items-start mt-4 gap-4 w-full mb-6">
      <AdminMenu />
      <div className="relative w-full flex flex-col items-start px-2">
        <h1 className="text-4xl mb-4 font-bold w-full">Update Product</h1>
        <div className="w-full flex flex-col mt-6 gap-4">
          <div className="w-full flex flex-col gap-2">
            <select
              className="w-full border-2 rounded-md border-zinc-900 p-2"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              placeholder="Select a category"
            >
              <option value={category}>{catName}</option>

              {categories
                ?.filter((cat) => cat.name !== category.name)
                .map((categ) => (
                  <option value={categ._id} key={categ._id}>
                    {categ.name}
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
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
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
                value={name}
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <textarea
              type="text"
              placeholder="Write the description"
              value={description}
              className="w-full h-[100px] p-2 rounded-md border-2 border-zinc-900 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="w-full border-2 border-zinc-900 rounded-md">
              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-full border-2 border-zinc-900 rounded-md">
              <input
                type="number"
                placeholder="Write a quantity"
                value={quantity}
                className="w-full rounded-md p-2 outline-none"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="w-full">
              <select
                className="w-full rounded-md border-2 border-zinc-900 p-2 outline-none"
                onChange={(e) => setShipping(e.target.value)}
                value={shipping}
              >
                <option value="0">{shipping ? "Yes" : "No"}</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
                {/* <option value="0">No</option>
                <option value="1">Yes</option> */}
              </select>
            </div>
            <div className="flex w-full gap-x-2">
              <button
                onClick={updateProduct}
                className="w-full p-2 bg-zinc-900 text-white rounded-md hover:scale-95 duration-200"
              >
                Update product
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full p-2 bg-red-700 text-white rounded-md hover:scale-95 duration-200"
              >
                Delete product
              </button>
            </div>
          </div>
        </div>
        {isLoading ? <LoaderSpinner color="red" secondaryColor="black" /> : ""}
        {isOpen && (
          <DeleteModal deleteProduct={deleteProduct} setIsOpen={setIsOpen} />
        )}
      </div>
    </section>
  )
}

export default UpdateProduct
