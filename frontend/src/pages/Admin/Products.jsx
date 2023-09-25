import React, { useEffect, useState } from "react"
import AdminMenu from "../../components/AdminMenu"
import toast from "react-hot-toast"
import api from "../../config/axiosConfig"
import { Link } from "react-router-dom"

import { BsTrash } from "react-icons/bs"
import LoaderSpinner from "../../components/LoaderSpinner"

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllProducts = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get("/product/get-product")
      if (data?.success) {
        setProducts(data.products)
        setIsLoading(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <section className="flex items-start h-[80vh] mt-4 gap-4 w-[1200px]">
      <AdminMenu />
      <div className="relative w-[800px]  h-[400px] overflow-y-auto px-2">
        <h1 className="text-4xl mb-4 font-bold w-full">All Products list</h1>
        <div className="w-full grid grid-cols-3 gap-4">
          {products?.map((product) => (
            <Link
              to={`/dashboard/admin/product/${product.slug}`}
              key={product._id}
              className="w-full hover:scale-95 duration-200"
            >
              <div className="w-full h-[150px]">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt="product-photo"
                  className="w-full h-full object-cover object-center rounded-t-md"
                />
              </div>
              <div className="shadow-md rounded-b-md flex flex-col w-full px-2 duration-200">
                <div className="flex gap-2">
                  <h2 className="font-bold">Name:</h2>
                  <span>{product.name}</span>
                </div>
                <div className="flex gap-2 ">
                  <h2 className="font-bold">Desc:</h2>
                  <span className="w-[140px] h-[23px] overflow-hidden">
                    {product.description}...
                  </span>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Price:</h2>
                  <span>{product.price}</span>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Quant:</h2>
                  <span>{product.quantity}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {isLoading ? <LoaderSpinner color="red" secondaryColor="black" /> : ""}
      </div>
    </section>
  )
}

export default Products
