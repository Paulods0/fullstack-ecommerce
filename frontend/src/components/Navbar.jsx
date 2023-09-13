import React, { useState } from "react"
import { Link } from "react-router-dom"
import { CiShoppingCart, CiShop } from "react-icons/ci"

const Navbar = () => {
  const [isActive, setIsActive] = useState(null)

  const nav_links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "Category",
      path: "/register",
    },
    {
      display: "Login",
      path: "/login",
    },
    {
      display: "Register",
      path: "/register",
    },
  ]

  return (
    <header className="w-full shadow-xl p-3">
      <nav className="w-[1200px] mx-auto flex items-center justify-between">
        <Link to="/home" className="text-[20px] flex items-center font-bold gap-2">
          <CiShop />
          <h1 className="font-bold ">ShopNest</h1>
        </Link>
        <ul className="flex gap-4">
          {nav_links.map((link, index) => (
            <li key={index}>
              <Link
                onClick={() => setIsActive(index)}
                className={`${
                  isActive === index ? "border-b-2 border-b-gray-600 transition-all duration-150" : ""
                } py-1 font-semibold`}
                to={link.path}
              >
                {link.display}
              </Link>
            </li>
          ))}
          <div className="flex items-center">
            <CiShoppingCart className="text-[24px]" />
            (0)
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
