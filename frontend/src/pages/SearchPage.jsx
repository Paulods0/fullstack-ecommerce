import React from "react"
import { useSearch } from "../context/search"
import ProductCard from "../components/ProductCard"

const SearchPage = () => {
  const [search, setSearch] = useSearch()
  return (
    <section>
      <h1 className="text-center font-bold">Search Results</h1>
      <div className="text-center font-semibold text-2xl">
        {search?.result.length < 1
          ? "No Products Found"
          : `Found ${search?.result.length}`}
        {console.log(search.result)}
        <div className="w-full grid grid-cols-3 gap-3">
          {search?.result.map((product) => (
            <div className="w-[320px] h-[200px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchPage
