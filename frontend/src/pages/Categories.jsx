import React, { useState } from "react"
import useCategory from "../hooks/useCategory"
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"

const Categories = () => {
  const [category, setCategory] = useState({})
  const categories = useCategory()

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">All Categories</h1>
      <div className="grid grid-cols-3 place-items-center mt-8 gap-4">
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="relative p-4 w-[200px] flex items-center justify-center gap-4 text-center group hover:translate-x-6 duration-200 rounded-md bg-zinc-900 text-white"
          >
            {category.name}
            <span className="text-white absolute right-0 duration-200 hidden group-hover:block group-hover:right-4">
              <BsArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
