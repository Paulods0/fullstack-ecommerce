import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CiShoppingCart, CiShop } from "react-icons/ci"
import { useAuth } from "../context/auth"
import UserModal from "./UserModal"
import SearchInput from "./SearchInput"
import useCategory from "../hooks/useCategory"

import DropDownMenu from "./DropDownMenu"
import { useCart } from "../context/cart"

const Navbar = () => {
  const [isActive, setIsActive] = useState(null)
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const categories = useCategory()
  const [cart, setCart] = useCart()

  const handleLogout = async () => {
    await setAuth({ ...auth, user: null, token: "" }),
      localStorage.removeItem("auth")
    navigate("/login")
  }

  const nav_links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: <DropDownMenu categories={categories} />,
      path: "/category",
    },
    {
      display: auth.user ? (
        <UserModal auth={auth} handleLogout={handleLogout} user={auth.user} />
      ) : (
        "Login"
      ),
      path: auth.user ? null : "/login",
    },
    {
      display: auth.user ? "" : "Register",
      path: "/register",
    },
  ]

  return (
    <header className="w-full shadow-xl p-3">
      <nav className="w-[1200px] mx-auto flex items-center justify-between">
        <Link
          to="/home"
          className="text-[20px] flex items-center font-bold gap-2"
        >
          <CiShop />
          <h1 className="font-bold ">ShopNest</h1>
        </Link>
        <div className="">
          <SearchInput />
        </div>
        <ul className="flex gap-3 relative">
          {nav_links.map((link, index) => (
            <li key={index}>
              <Link
                onClick={() => setIsActive(index)}
                className={`${
                  isActive === index
                    ? "border-b-2 border-b-gray-600 transition-all duration-150"
                    : ""
                } py-1 font-semibold`}
                to={link.path}
              >
                {link.display}
              </Link>
            </li>
          ))}
          <Link to="/cart" className="relative flex items-center">
            <CiShoppingCart className="text-[24px]" />
            <div className="absolute -top-2 -right-4 w-[22px] h-[22px] flex items-center justify-center rounded-full bg-red-600 text-white text-sm">
              {cart.length}
            </div>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
