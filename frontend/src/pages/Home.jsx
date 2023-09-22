import React, { useEffect } from "react"
import { useAuth } from "../context/auth"
import api from "../config/axiosConfig"

const Home = () => {
  const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState( [])

  const getAllProducts = async ()=>{
    try {
      const {data} = await api.get("/product/get-product")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

  },[])

  return (
    <main className="py-4 flex justify-between gap-4">
      <section className="w-[300px] h-full  bg-red-500">
        <h1 className="font-semibold text-2xl">Filter By Category</h1>
      </section>
      <section className="w-full">
        <h1 className="font-bold text-center text-4xl">All Products</h1>
        <div className="w-full grid grid-cols-3 place-items-center">

        </div>
      </section>
    </main>
  )
}

export default Home
