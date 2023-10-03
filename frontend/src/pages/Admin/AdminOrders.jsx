import React, { useEffect, useState } from "react"
import api from "../../config/axiosConfig"
import AdminMenu from "../../components/AdminMenu"
import moment from "moment"
import { useAuth } from "../../context/auth"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState([
    "Not process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ])
  const [changeStatus, setChangeStatus] = useState("")
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await api.get("/product/all-orders")
      setOrders(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeStatus = async (orderID, value) => {
    try {
      const { data } = await api.put(`/product/order-status/${orderID}`, {
        status: value,
      })
      setChangeStatus(data?.status)
      getOrders()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])
  return (
    <section className="flex items-start h-[80vh] mt-4 gap-4 w-[1200px]">
      <AdminMenu />
      <div className="w-full h-[500px] overflow-y-scroll px-2">
        <h1 className="text-4xl font-bold mb-4">All Orders</h1>
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
                    <select
                      onChange={(e) =>
                        handleChangeStatus(order._id, e.target.value)
                      }
                      defaultValue={orders?.status}
                    >
                      {status.map((stat, index) => (
                        <option key={index} value={stat}>
                          {stat}
                        </option>
                      ))}
                    </select>
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

export default AdminOrders
