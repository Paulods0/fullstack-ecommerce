import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsFillCartFill } from "react-icons/bs"
import { useCart } from "../context/cart"
import { toast } from "react-hot-toast"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  return (
    <div key={product._id} className="w-full rounded-md shadow-xl relative">
      <div
        className="w-[308x] h-[250px] cursor-pointer"
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        <img
          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
          alt="product-photo"
          className="w-full h-full object-contain rounded-t-md"
        />
      </div>
      <div className="rounded-b-md flex flex-col p-2 duration-200">
        <ul className="flex w-full items-center justify-around">
          <li className="font-bold text-[18px]">
            {product.name.substring(0, 20)}
            {product.name.length >= 17 && <span>...</span>}
          </li>
          <li className="text-[18px]">Price: ${product.price}</li>
        </ul>

        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={() => {
              setCart([...cart, product])
              localStorage.setItem("cart", JSON.stringify([...cart, product]))
              toast.success("Item added to cart")
            }}
            className="w-full p-2 flex gap-2 items-center justify-center bg-zinc-900 text-white rounded-md hover:scale-90 duration-200"
          >
            Add to cart
            <span>
              <BsFillCartFill />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
