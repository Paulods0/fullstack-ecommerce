import React from "react"
import { useAuth } from "../context/auth"

const Home = () => {
  const [auth, setAuth] = useAuth()

  return (
    <main>
      <div className="w-[200px]">
        <h1>Home </h1>
        <p className="w-full">{JSON.stringify(auth, null, 4)}</p>
      </div>
    </main>
  )
}

export default Home
