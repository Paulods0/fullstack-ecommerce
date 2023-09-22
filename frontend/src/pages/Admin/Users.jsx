import React, { useEffect, useState } from "react"
import AdminMenu from "../../components/AdminMenu"
import toast from "react-hot-toast"
import api from "../../config/axiosConfig"
import LoaderSpinner from "../../components/LoaderSpinner"

const Users = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setIsLoading(true)
        const response = await api.get("auth/get-users")
        if (response.data.success) {
          setUsers(response.data.users)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong while fetching the users")
      }
    }

    getAllUsers()
  }, [])

  return (
    <section className="flex items-start h-[80vh] mt-4 gap-4 w-[1200px]">
      <AdminMenu />
      <div className="w-full h-[400px] overflow-y-scroll px-2">
        <h1 className="text-4xl font-bold mb-4">All Users</h1>
        <table className="w-full">
          <tr className="py-2 bg-black text-white border border-zinc-700">
            <th className="text-md mb-2 w-[250px] border border-zinc-400">
              Name
            </th>
            <th className="text-md mb-2 border border-zinc-400">Email</th>
            <th className="text-md mb-2 border border-zinc-400">Address</th>
            {/* <th className="text-lg mb-2">createdAt</th> */}
          </tr>

          <tbody>
            {users?.map((user, index) => (
              <tr className=" w-full border-b border-b-zinc-700 py-2">
                <td
                  className="text-black text-center border border-zinc-400"
                  key={index}
                >
                  {user.name}
                </td>
                <td
                  className="text-black text-center border border-zinc-400"
                  key={index}
                >
                  {user.email}
                </td>
                <td
                  className="text-black text-center border border-zinc-400"
                  key={index}
                >
                  {user.address}
                </td>
                {/* <td className="text-center" key={index}>
                  {user.createdAt}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading ? <LoaderSpinner color="red" secondaryColor="black" /> : ""}
    </section>
  )
}

export default Users
