import React from "react"
import { Link } from "react-router-dom"

const AdminMenu = () => {
  return (
    <div className="flex flex-col h-full gap-2 items-center">
      <h1 className="text-3xl">Admin Panel</h1>
      <section className="flex flex-col w-96 border border-zinc-800 rounded-md h-40">
        <ul className="w-full h-full text-center flex flex-col items-center justify-between">
          <Link
            to="/dashboard/admin/create-product"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-900 hover:text-white text-xl border-b border-b-zinc-800"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/create-category"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-900 hover:text-white text-xl border-b border-b-zinc-800"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/products"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-900 hover:text-white text-xl border-b border-b-zinc-800"
          >
            Products
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-900 hover:text-white text-xl "
          >
            Users
          </Link>
        </ul>
      </section>
    </div>
  )
}

export default AdminMenu
