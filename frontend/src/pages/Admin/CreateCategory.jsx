import { useState, useEffect } from "react"
import AdminMenu from "../../components/AdminMenu"
import { toast } from "react-hot-toast"
import api from "../../config/axiosConfig"
import CategoryForm from "../../components/CategoryForm"
import Modal from "../../components/Modal"
import LoaderSpinner from "../../components/LoaderSpinner"
import DeleteModal from "../../components/DeleteModal"

const CreateCategory = () => {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [updatedName, setUpdatedName] = useState("")
  const [id, setId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await api.post("/category/create-category", { name })
      if (data?.success) {
        toast.success(`${data?.category.name} was created`)
        setName("")
        setIsLoading(false)
        getAllCategories()
      } else {
        return toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in the input form")
    }
  }
  const getAllCategories = async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/category/all-categories")
      if (response.data.success) {
        setData(response.data.categories)
        setIsLoading(false)
        return
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  const handleDelete = async (id) => {
    setIsLoading(true)
    const response = await api.delete(`/category/delete-category/${id}`)
    try {
      if (response.data.success) {
        toast.success(response.data.message)
        setIsLoading(false)
        getAllCategories()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  const getCategoryId = () => {
    return id
  }
  const updateCategory = async (e, id, updatedName) => {
    e.preventDefault()
    setIsLoading(true)
    const response = await api.put(`/category/update-category/${id}`, {
      name: updatedName,
    })
    try {
      if (response.data.success) {
        toast.success(response.data.message)
        setIsOpen(false)
        setUpdatedName("")
      }
      setIsLoading(false)
      getAllCategories()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <section className="flex items-start h-[80vh] mt-4 gap-4 w-full">
      <AdminMenu />
      <section className="relative w-[60vw] h-[400px] overflow-y-scroll px-3">
        <h1 className="text-4xl mb-4 font-bold w-full">Manage Category</h1>
        <table className="w-full">
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              setName={setName}
              name={name}
            />
          </div>
          <tr className="flex items-start py-2 border-b border-b-zinc-700 justify-around">
            <th className="text-xlmb-2">Name</th>
            <th className="text-xlmb-2">Action</th>
          </tr>
          <tbody>
            {data?.map((category, index) => (
              <tr className="flex items-center justify-between w-full border-b border-b-zinc-700 py-2">
                <td key={index}>{category.name}</td>
                <td>
                  <button
                    onClick={() => {
                      {
                        setIsOpen(true),
                          setId(category._id),
                          setId(category._id)
                        setUpdatedName(category.name)
                      }
                    }}
                    className="p-1 px-3 mr-2 bg-zinc-900 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(category._id)
                    }}
                    className="p-1 px-3 bg-red-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          updateCategory={updateCategory}
          getCategoryId={getCategoryId}
          updatedName={updatedName}
          setUpdatedName={setUpdatedName}
        />
        {isLoading ? <LoaderSpinner color="red" secondaryColor="black" /> : ""}
      </section>
    </section>
  )
}

export default CreateCategory
