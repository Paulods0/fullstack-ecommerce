import React from "react"
import AdminMenu from "../../components/AdminMenu"
import { useAuth } from "../../context/auth"

const AdminDashboard = () => {
  const [auth, _] = useAuth()
  return (
    <section className="flex mt-8 gap-6 items-center">
      <AdminMenu />
      <div className="w-full border border-zinc-500  h-[200px] rounded-md">
        <ul className="w-full h-full flex flex-col items-center justify-center">
          <li className="text-3xl text-center">
            Admin Name: {auth?.user?.name}
          </li>
          <li className="text-3xl text-center">
            Admin Email: {auth?.user?.email}
          </li>
          <li className="text-3xl text-center">
            Admin Contact: {auth?.user?.phone}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AdminDashboard
