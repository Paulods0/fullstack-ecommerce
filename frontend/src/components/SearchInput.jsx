import React from "react"
import { useSearch } from "../context/search"
import api from "../config/axiosConfig"
import { useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs"

const SearchInput = () => {
  const [search, setSearch] = useSearch()
  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.get(`/product/search/${search.keyword}`)
      setSearch({ ...search, result: data })
      navigate("/search")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[350px] flex gap-2">
      <form onSubmit={handleSumbit} className="w-full flex gap-1">
        <input
          className="w-full px-2 py-[3px] outline-none border-2 text-black border-zinc-600 rounded-md"
          type="search"
          value={search.keyword}
          aria-label="Search"
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          placeholder="Search"
        />
        <button
          className="px-2 rounded-md text-white bg-zinc-800 flex gap-2 items-center"
          type="submit"
        >
          <BsSearch />
        </button>
      </form>
    </div>
  )
}

export default SearchInput
