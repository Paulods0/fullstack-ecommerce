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
            onClick={() => window.history.go(-1)}
            className="p-3 rounded-md border-2 border-zinc-900 hover:w-[120px] w-[110px] hover:bg-zinc-100 duration-300 justify-center flex items-center gap-2"
          >
            <span className=" items-center text-center duration-300">
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
