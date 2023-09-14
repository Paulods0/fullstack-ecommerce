import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/auth"

const UserModal = ({ auth, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  // const [auth, setAuth] = useAuth()

  function closeModal() {
    window.addEventListener("click", (event) => {
      if (event.target.id !== "userModal") {
        setIsOpen(false)
      }
    })
  }
  closeModal()

  return (
    <>
      <button
        id="userModal"
        onClick={() => setIsOpen((prev) => !prev)}
        className="active:scale-90 duration-150 rounded-full border border-zinc-800 flex items-center justify-center w-[30px] h-[30px]"
      >
        <h2 id="userModal" className="text-center font-bold">
          {auth.user.name.charAt(0).toUpperCase()}
        </h2>
      </button>
      {isOpen ? (
        <div
          id="userModal"
          className="absolute top-[50px] right-[80px] h-[190px] bg-white p-2 flex flex-col items-center border border-zinc-800 rounded-md w-[200px]"
        >
          <ul
            id="userModal"
            className="w-full h-full cursor-default flex flex-col justify-around"
          >
            <li
              id="userModal"
              className="text-center  border-b border-b-zinc-200"
            >
              Name: {auth.user.name}
            </li>
            <li
              id="userModal"
              className="text-center  border-b border-b-zinc-200"
            >
              {auth.user.email}
            </li>
            <li
              id="userModal"
              className="text-center  border-b border-b-zinc-200"
            >
              Address: {auth.user.address}
            </li>
            <Link
              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              id="userModal"
              className="text-center mt-2 text-white bg-zinc-800 hover:scale-90 duration-300"
            >
              Go to dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-center mt-2 text-white bg-zinc-800 hover:scale-90 duration-300"
            >
              Logout
            </button>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default UserModal
