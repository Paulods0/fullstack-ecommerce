import React, { useState, useEffect } from "react"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import { Link, useNavigate } from "react-router-dom"
import { BsTrash } from "react-icons/bs"
import DropIn from "braintree-web-drop-in-react"
import api from "../config/axiosConfig"
import { toast } from "react-hot-toast"

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const [clientToken, setClientToken] = useState("")
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log(instance)

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

  //payment gateway token
  const getBraintreeToken = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/product/braintree/token")
      setClientToken(data?.clientToken)
      console.log(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBraintreeToken()
  }, [auth?.token])

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await api.post("/product/braintree/payment", {
        cart,
        nonce,
      })
      console.log(data, nonce)
      localStorage.removeItem("cart")
      setCart([])
      navigate("/dashboard/user/orders")
      toast.success("Payment Completed Successfuly")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
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
        {cart.length > 0 ? (
          <div className="w-full h-[480px] self-start overflow-y-auto p-3">
            {cart?.map((product) => (
              <div
                key={product._id}
                className="relative flex border border-zinc-300 mb-4 justify-around rounded-md p-2"
              >
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
        ) : (
          <h1 className=" text-center text-4xl font-bold">
            Nothing in your cart
          </h1>
        )}
        {/**Right */}
        <div className="w-[600px] h-[500px] overflow-y-auto flex flex-col justify-start items-center">
          <h1 className="text-2xl text-center mb-4 font-bold">Cart Summary</h1>
          <ul className="flex justify-center">
            <li className="px-2 border-r border-r-zinc-300 mb-4">Total</li>
            <li className="px-2 border-r border-r-zinc-300 mb-4">Checkout</li>
            <li className="px-2 border-r border-r-zinc-300 mb-4">Payment</li>
          </ul>
          <hr />

          <h1 className="text-bold text-3xl mt-4 text-center">
            Total: {totalPrice()}
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
            {loading && cart.length > 0 ? (
              <div className="mt-2">
                <h1>Loading...</h1>
              </div>
            ) : (
              <div className="p-4 w-full flex flex-col">
                <DropIn
                  options={{
                    authorization: clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="w-[170px] hover:bg-blue-800 self-center cursor-pointer hover:scale-95 duration-200 bg-blue-600 text-white rounded-md p-2"
                  onClick={
                    cart.length > 0 || auth?.token ? handlePayment : null
                  }
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

export default CartPage
