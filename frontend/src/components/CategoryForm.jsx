import React from "react"

const CategoryForm = ({ handleSubmit, setName, name }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[600px] flex flex-col gap-4 items-start mb-4 justify-center"
    >
      <div className="m-0 p-0 w-full border rounded-md border-zinc-600 ">
        <input
          type="text"
          className="w-full border-none h-full p-2 focus:border focus:border-zinc-800 rounded-md"
          placeholder="Enter a new category"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <button className="bg-zinc-900 px-2 text-white rounded-md py-1">
        Submit
      </button>
    </form>
  )
}
export default CategoryForm
