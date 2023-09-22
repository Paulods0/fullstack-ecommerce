import React, { useState } from "react"

const Modal = ({
  isOpen,
  setIsOpen,
  updateCategory,
  getCategoryId,
  updatedName,
  setUpdatedName,
}) => {
  const id = getCategoryId()

  return (
    <>
      {isOpen ? (
        <div className="absolute w-full bg-black/30 backdrop-blur-sm inset-0 flex items-center justify-center ">
          <div className="relative w-[500px] h-[350px] flex items-center bg-white rounded-md justify-center  shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-zinc-900 p-2 rounded-md text-white"
            >
              Close
            </button>
            <form
              onSubmit={(e) => updateCategory(e, id, updatedName)}
              className="flex flex-col gap-4 w-full px-4"
            >
              <h1 className="text-2xl text-zinc-900 font-bold text-center">
                Edit Model
              </h1>
              <div className="w-full">
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Edit category"
                  className="w-full outline-none h-full p-2 rounded-md border-2 focus:border-zinc-800"
                />
              </div>
              <button className="w-full bg-zinc-800 rounded-md text-white p-2 hover:scale-95 duration-300">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Modal
