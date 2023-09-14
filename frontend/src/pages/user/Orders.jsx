import React from "react"
import UserMenu from "../../components/UserMenu"

const Orders = () => {
  return (
    <section className="flex mt-8 gap-6 items-center">
      <UserMenu />
      <div className="w-full border border-zinc-500  h-[200px] rounded-md">
        <h1>All Orders</h1>
      </div>
    </section>
  )
}

export default Orders
