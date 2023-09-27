import { useState, useEffect } from "react"
import api from "../config/axiosConfig"

export default function useCategory() {
  const [categories, setCategories] = useState([])

  //get category
  const getCategory = async () => {
    try {
      const { data } = await api.get("/category/all-categories")
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return categories
}
