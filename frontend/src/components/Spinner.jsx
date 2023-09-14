import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Spinner = () => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev)
    }, 1000)
    count === 0 && navigate("/")
    return () => clearInterval(interval)
  }, [count, navigate])
  return (
    <section className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-[1200px] h-[200px] mx-auto">
        <h1 className="text-center text-2xl font-bold leading-6">Redirecting you in {count} seconds</h1>
      </div>
    </section>
  )
}

export default Spinner
