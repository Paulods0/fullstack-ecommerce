import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  const nav_links = [
    {
      display: "About",
      path: "/about",
    },
    {
      display: "Contact",
      path: "/contact",
    },
    {
      display: "Privacy Policy",
      path: "/policy",
    },
  ]
  return (
    <footer className="w-full bg-black p-3">
      <section className="w-[1200px] mx-auto flex flex-col gap-4">
        <h1 className="text-center text-white text-xl ">
          All rights reserved &copy; Paulo Da Silva
        </h1>
        <ul className="flex gap-3 self-center">
          {nav_links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="text-white text-[15px] px-2 text-center"
              >
                {link.display}
              </Link>
              <span className="ml-2 text-white">|</span>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  )
}

export default Footer
