import React from "react"
import { Link } from "react-router-dom"

const DropDownMenu = ({ categories }) => {
  return (
    <div className="relative inline-block w-[100px] group">
      <button className="w-full px-2">Categories</button>
      <ul className="group-hover:block w-[150px] rounded-md shadow-xl z-10 hidden top-6 absolute bg-white">
        <Link
          to={"/categories"}
          className="block px-4 py-2 rounded-sm hover:bg-slate-100 text-center"
        >
          All categories
        </Link>
        {categories?.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="block px-4 py-2 rounded-sm hover:bg-slate-100 text-center"
          >
            {category.name.length >= 14
              ? category.name.substring(0, 12) + "..."
              : category.name}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default DropDownMenu
