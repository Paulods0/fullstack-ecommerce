import React from "react"
import { Link } from "react-router-dom"

const UserMenu = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Link to="/dashboard/user" className="text-3xl">Dashboard</Link>
      <section className="flex flex-col w-96 border border-zinc-800 rounded-md h-40">
        <ul className="w-full h-full text-center flex flex-col items-center justify-between">
          <Link
            to="/dashboard/user/profile"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-100 text-xl border-b border-b-zinc-800"
          >
            User profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="cursor-pointer text-semibold flex items-center justify-center h-full w-full hover:bg-zinc-100 text-xl "
          >
            Orders
          </Link>
        </ul>
      </section>
    </div>
  )
}

export default UserMenu
