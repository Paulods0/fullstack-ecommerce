import React, { useEffect, useState } from "react"
import UserMenu from "../../components/UserMenu"
import api from "../../config/axiosConfig"
import moment from "moment"
import ProductCard from "../../components/ProductCard"

const Orders = () => {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const { data } = await api.get("/product/get-orders")
      setOrders(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <section className="flex mt-8 gap-6 items-start">
      <UserMenu />
      <div className="w-full h-[500px] overflow-y-scroll px-2">
        <h1 className="text-4xl font-bold mb-4">All Users</h1>
        <div>
          <table className="w-full">
            <thead>
              <tr className="py-2 bg-black text-white border border-zinc-700">
                <th className="text-md mb-2 w-[50px] border border-zinc-400">
                  #
                </th>
                <th className="text-md mb-2 border border-zinc-400">Status</th>
                <th className="text-md mb-2 border border-zinc-400">Buyer</th>
                <th className="text-md mb-2 border border-zinc-400">Date</th>
                <th className="text-md mb-2 border border-zinc-400">Payment</th>
                <th className="text-md mb-2 border border-zinc-400">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order, index) => (
                <tr
                  className=" w-full border-b border-b-zinc-700 py-2"
                  key={index}
                >
                  <td className="text-black text-center border border-zinc-400">
                    {index + 1}
                  </td>
                  <td className="text-black text-center border border-zinc-400">
                    {order?.status}
                  </td>
                  <td className="text-black text-center border border-zinc-400">
                    {order?.buyer.name}
                  </td>
                  <td className="text-black text-center border border-zinc-400">
                    {moment(order?.createdAt).fromNow()}
                  </td>
                  <td className="text-black text-center border border-zinc-400">
                    {order?.payment.success ? "Success" : "Failed"}
                  </td>
                  <td className="text-black text-center border border-zinc-400">
                    {order?.products.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-10 w-full grid grid-cols-2 gap-4">
            {orders[0]?.products?.map((product, index) => (
              <div className="flex h-[140px] w-[350px] rounded-md shadow-lg">
                <div className="w-[150px]">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt="product-image"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 w-full flex flex-col items-start justify-around">
                  <h1>{product.name}</h1>
                  <h2>{product.description}</h2>
                  <h2>${product.price}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orders
