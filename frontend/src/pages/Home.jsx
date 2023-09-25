import React, { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import api from "../config/axiosConfig"
import LoaderSpinner from "../components/LoaderSpinner"
import { Link } from "react-router-dom"

import { Prices } from "../utils/Prices"

const Home = () => {
  // const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {
      const { data } = await api.get("/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProducts = async () => {
    try {
      setIsLoading(true)
      setLoading(true)
      const { data } = await api.get(`/product/product-list/${page}`)
      if (data?.success) {
        setProducts(data?.products)
        setIsLoading(false)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await api.get("/category/all-categories")
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories()
    getTotal()
  }, [])

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (page == 1) return
    loadMore()
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await api.get(`/product/product-list/${page}`)
      setProducts([...products, ...data?.products])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleFilterByPrice = (value) => {
    let all = []
    if (value) {
      all.push(value)
      setRadio(all)
    }
  }

  const filterProducts = async () => {
    try {
      const { data } = await api.post("/product/product-filters", {
        checked,
        radio,
      })
      if (data.success) {
        setProducts(data?.products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts()
    }
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts()
    }
  }, [checked, radio])

  return (
    <main className="py-4 flex justify-between gap-4">
      <section className="w-[300px] bg-zinc-200 p-2 rounded-md mb-10">
        <h1 className="font-bold mb-4 text-2xl">Filter By Category</h1>
        <div className="w-full flex flex-col">
          {categories?.map((category) => (
            <div className="flex gap-2 items-center" key={category._id}>
              <input
                type="checkbox"
                id={category.name}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>

        <div>
          <h1 className="font-bold mt-6 mb-4 text-2xl">Filter By Price</h1>
          <div className="flex flex-col items-start">
            <div>
              {Prices.map((price) => (
                <div key={price._id}>
                  <input
                    className="mr-2"
                    type="radio"
                    name="price"
                    value={JSON.stringify(price.array)}
                    onChange={(e) => {
                      const numericValues = JSON.parse(e.target.value)
                      setRadio(numericValues), console.log(e.target)
                    }}
                  />
                  {price.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="w-full mt-6 rounded-md p-2 bg-red-600 text-white font-semibold"
          onClick={() => {
            window.location.reload()
          }}
        >
          Reset Filters
        </button>
      </section>
      <section className="w-full h-full">
        <h1 className=" font-bold text-center text-4xl mb-6">All Products</h1>
        <div className="w-full grid grid-cols-3 gap-4">
          {products?.map((product) => (
            <div key={product._id} className="w-full relative">
              <div className="w-[308x] h-[250px]">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt="product-photo"
                  className="w-full h-full object-cover rounded-t-md"
                />
              </div>
              <div className="border border-zinc-500 rounded-b-md flex flex-col p-2 duration-200">
                <div className="flex gap-2">
                  <h2 className="font-bold">Name:</h2>
                  <span>{product.name}</span>
                </div>
                <div className="flex gap-2 w-full overflow-x-auto">
                  <h2 className="font-bold">Desc:</h2>
                  <span className="w-full h-[23px] overflow-hidden">
                    {product.description.substring(0, 30)}...
                  </span>
                </div>
                <div className="flex gap-2 w-full overflow-x-auto">
                  <h2 className="font-bold">Price:</h2>
                  <span className="w-full h-[23px] overflow-hidden">
                    ${product.price}
                  </span>
                </div>
                <div className="flex gap-3 w-full mt-2">
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    className="w-full text-center p-2 bg-zinc-900 text-white rounded-md hover:scale-90 duration-200"
                  >
                    More Info
                  </Link>
                  <button className="w-full p-2 bg-zinc-900 text-white rounded-md hover:scale-90 duration-200">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {products && products.length < total && (
          <div className="mt-10  w-full flex justify-start items-center">
            <button
              className="p-2 bg-yellow-500  text-black rounded-md"
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
        {isLoading && <LoaderSpinner color="red" secondaryColor="black" />}
      </section>
    </main>
  )
}

export default Home
