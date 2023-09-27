import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../config/axiosConfig"
import LoaderSpinner from "../components/LoaderSpinner"
import ProductCard from "../components/ProductCard"

const CategoryList = () => {
  const params = useParams()
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProductCategory = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/product/product-category/${params.slug}`)
      console.log(data)
      setProduct(data?.product)
      setCategory(data?.category)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (params?.slug) getProductCategory()
  }, [params?.slug])

  return (
    <div className="relative">
      <h1 className="text-center font-bold text-4xl mt-10">Category - {category.name}</h1>
      <h1 className="text-center font-semibold text-sm mt-4">
        {product.length} results found
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-4 mt-12 mb-12">
        {product?.map((prod) => (
          <div className="w-[320px]">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>

      {isLoading && <LoaderSpinner color="red" secondaryColor="black" />}
    </div>
  )
}

export default CategoryList
