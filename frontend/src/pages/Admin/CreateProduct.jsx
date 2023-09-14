import React from "react"
import AdminMenu from "../../components/AdminMenu"

const CreateProduct = () => {
  return (
    <section className="flex mt-8 gap-6 items-center">
      <AdminMenu />
      <div className="w-full border border-zinc-500  h-[200px] rounded-md">
        <h1>Create Product</h1>
      </div>
    </section>
  )
}

export default CreateProduct
