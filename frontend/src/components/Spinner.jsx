import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Spinner = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev)
    }, 1000)
    count === 0 && navigate("/login")
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <div className="w-[200px] h-[200px] ">
      <h1 className="text-center">Redirecting to you in {count} seconds</h1>
    </div>
  )
}

export default Spinner
