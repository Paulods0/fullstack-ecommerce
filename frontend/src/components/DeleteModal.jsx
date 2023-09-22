import React from "react"

const DeleteModal = ({ deleteProduct, setIsOpen }) => {
  return (
    <div className="absolute inset-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[350px] p-2 rounded-md shadow-md h-[150px] flex flex-col justify-around">
        <h1 className="font-bold text-lg text-center">
          Are you sure you want to delete?
        </h1>
        <div className="w-full flex gap-2">
          <button onClick={deleteProduct} className="w-full p-2 rounded-md bg-red-700 text-white">
            Delete
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full p-2 rounded-md bg-zinc-900 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
