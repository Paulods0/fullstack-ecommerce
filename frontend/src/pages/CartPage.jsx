import React from "react"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import { Link, useNavigate } from "react-router-dom"
import { BsTrash } from "react-icons/bs"

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const totalPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = (productID) => {
    try {
      const cartCopy = [...cart]
      const cartAtIndex = cartCopy.findIndex((item) => item._id === productID)
      cartCopy.splice(cartAtIndex, 1)
      setCart(cartCopy)
      localStorage.setItem("cart", JSON.stringify(cartCopy))
    } catch (error) {
      console.log(error)
    }
  }

  console.log(cart)

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mt-4 mb-2">{`Hello, ${
        auth?.token && auth?.user.name
      }!`}</h1>
      <h4 className="text-center text-sm font-semibold mb-4">
        {cart.length > 0
          ? `You have ${cart.length} items in your cart${
              auth?.token ? "" : ", please Login to checkout"
            }`
          : "Your cart is empty"}
      </h4>

      {/* {auth.token && ( */}
      <div className="flex justify-between items-center">
        {/**Left */}
        <div className="w-full h-[450px] overflow-y-auto p-3">
          {cart?.map((product) => (
            <div className="relative flex border border-zinc-300 mb-4 justify-around rounded-md p-2">
              <div className="h-[200px] w-[200px]">
                <img
                  className="rounded-md w-full h-full object-contain"
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt=""
                />
              </div>

              <button
                onClick={() => removeItem(product._id)}
                className="hover:scale-90 duration-200 absolute top-4 text-red-700 text-2xl right-3"
              >
                <BsTrash />
              </button>
              <ul className="flex flex-col items-center justify-center gap-4">
                <li className="p-2 shadow-md rounded-md w-full text-center bg-zinc-900 text-white">
                  {product.name}
                </li>
                <li className="p-2 shadow-md rounded-md w-full text-center bg-zinc-900 text-white">
                  Desc: {product.description.substring(0, 14)}
                </li>
                <li className="p-2 shadow-md rounded-md w-full text-center bg-zinc-900 text-white">
                  Price: ${product.price}
                </li>
              </ul>
            </div>
          ))}
        </div>
        {/**Right */}
        <div className="w-[600px] h-[450px] flex flex-col justify-start">
          <h1 className="text-2xl text-center mb-4 font-bold">Cart Summary</h1>
          <ul className="flex justify-center">
            <li className="px-2 border-r border-r-zinc-300 mb-4">Total</li>
            <li className="px-2 border-r border-r-zinc-300 mb-4">Checkout</li>
            <li className="px-2 border-r border-r-zinc-300 mb-4">Payment</li>
          </ul>
          <hr />

          <h1 className="text-bold text-3xl mt-4 text-center">
            Total:{totalPrice()}
          </h1>

          <div className="w-full flex flex-col mt-4 items-center">
            <h1 className="text-2xl">Current Address:</h1>
            {auth?.user && (
              <h2 className="text-2xl mb-4">{auth.user.address}</h2>
            )}
            {auth?.token ? (
              <Link
                className="p-2 rounded-md outline-black outline bg-yellow-400 hover:bg-yellow-500 duration-200"
                to={"/dashboard/user/profile"}
              >
                Update Your Address
              </Link>
            ) : (
              <button
                className="p-2 mt-4 outline-black outline rounded-md bg-yellow-400 hover:bg-yellow-500 duration-200"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login To Check Out
              </button>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

export default CartPage
