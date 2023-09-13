import React from "react"
import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import Layout from "../components/Layout"

const PageNotFound = () => {
  return (
    <main className="w-full">
      <section className="w-[1200px] h-[70vh] mx-auto flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[78px] font-bold text-center">404</h1>
          <h3 className="text-[38px] font-semibold text-center">
            Page not found!
          </h3>
          <Link
            to="/"
            className="p-3 rounded-md border border-zinc-400 w-[120px] hover:bg-zinc-100 duration-200 text-center flex items-center gap-2"
          >
            <span>
              <BsArrowLeft />
            </span>
            Go back
          </Link>
        </div>
      </section>
    </main>
  )
}

export default PageNotFound
