import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { BsFillCartFill } from "react-icons/bs"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
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
        <ul className="flex flex-col w-full items-start justify-center">
          <li className="font-bold text-[18px]">
            <span className="font-semibold">Name:</span>
            {product.name}
          </li>
          <li className="text-[18px] flex ">
            <span className="font-semibold">Desc:</span>
            {product.description.substring(0, 30)}...
          </li>
          <li className="text-[18px]">
            <span className="font-semibold">Price:</span>${product.price}
          </li>
        </ul>

        <div className="flex gap-3 w-full mt-2">
          <button className="w-full p-2 flex gap-2 items-center justify-center bg-zinc-900 text-white rounded-md hover:scale-90 duration-200">
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
