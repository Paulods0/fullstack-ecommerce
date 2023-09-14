import React from "react"
import AdminMenu from "../../components/AdminMenu"

const CreateCategory = () => {
  return (
    <section className="flex mt-8 gap-6 items-center">
      <AdminMenu />
      <div className="w-full border border-zinc-500  h-[200px] rounded-md">
      <h1>Create Category</h1>
      </div>
    </section>
  )
}

export default CreateCategory
