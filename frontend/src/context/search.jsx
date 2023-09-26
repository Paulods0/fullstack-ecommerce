import { createContext, useContext, useState } from "react"

const SearchContext = createContext()
const SearchProvider = ({ children }) => {
  const [search, SetSearch] = useState({
    keyword: "",
    results: [],
  })
  return (
    <SearchContext.Provider value={[search, SetSearch]}>
      {children}
    </SearchContext.Provider>
  )
}

//custom hook
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }
