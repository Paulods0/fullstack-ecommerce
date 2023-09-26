import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../config/axiosConfig"
import LoaderSpinner from "../components/LoaderSpinner"

import { BsFillCartFill } from "react-icons/bs"

const ProductDetail = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCategory = async (prodSlug) => {
    try {
      const { data } = await api.get(`/category/single-category/${prodSlug}`)
      console.log(data?.category)
    } catch (error) {
      console.log(error)
    }
  }

  const getProduct = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getRelatedProducts(data?.product._id, data?.product.category._id)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getRelatedProducts = async (pid, cid) => {
    try {
      setIsLoading(true)
      const { data } = await api.get(`/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(relatedProducts)
  useEffect(() => {
    getProduct()
    // getCategory()
  }, [params.slug])
  return (
    <main className="relative mt-8 flex flex-col">
      <section className="w-full place-items-start grid grid-cols-2 gap-8">
        {/**Left */}
        <section className="relative w-full h-[460px] shadow-md rounded-md">
          <img
            className="absolute inset-0 w-full h-full object-contain rounded-md"
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt="product-photo"
          />
        </section>
        {/**Right */}
        <section className="w-full h-1/4 flex flex-col gap-2 p-3 ">
          <ul className="w-full flex flex-col shadow-md rounded-md p-3">
            <li className="flex gap-2">
              <span className="font-semibold">Name:</span>
              {product.name}
            </li>

            <li className="flex gap-2">
              <span className="font-semibold">Description:</span>
              {product.description}
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">Price:</span>${product.price}
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">Shipping:</span>
              {product.shipping === false ? "No" : "Yes"}
            </li>
          </ul>

          <button className="w-full flex items-center justify-center  gap-3 p-2 rounded-md bg-black text-white hover:scale-95 duration-200">
            Add To Cart{" "}
            <span>
              <BsFillCartFill />
            </span>
          </button>
          {/**Related products */}
          <section className="w-full border-t p-2 mt-4 border-t-zinc-400">
            <h1 className="font-bold text-xl">Related Products</h1>
            <section className="relative w-full grid grid-cols-3 gap-3 mt-6">
              {relatedProducts?.map((product) => (
                <Link
                  to={`/product/${product.slug}`}
                  className="rounded-md hover:rotate-2 duration-200 shadow-md"
                  key={product._id}
                >
                  <div className="h-[120px] rounded-md">
                    <img
                      className="h-full w-full object-contain rounded-t-md"
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      alt=""
                    />
                  </div>
                  <h1 className="text-left px-2">
                    <span className="font-semibold">Name:</span>
                    {product.name}
                  </h1>
                  <ul className="text-left px-2">
                    <li>
                      <span className="font-semibold">Desc:</span>
                      {product.description.substring(0, 13)}...
                    </li>
                    <li>
                      <span className="font-semibold">Price:</span>$
                      {product.price}
                    </li>
                  </ul>
                </Link>
              ))}
              {isLoading && (
                <LoaderSpinner color="red" secondaryColor="black" />
              )}
            </section>
          </section>
        </section>
      </section>
      {/**Related products */}
      {isLoading && <LoaderSpinner color="red" secondaryColor="black" />}
    </main>
  )
}

export default ProductDetail
