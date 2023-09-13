import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineMail } from "react-icons/ai"
import { PiPasswordDuotone } from "react-icons/pi"

import api from "../../config/axiosConfig.js"
import { toast } from "react-toastify"

import { useAuth } from "../../context/auth.jsx"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  // const [] = useCookie()

  const data = {
    email,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/login", data)
      console.log(response)
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      })

      window.localStorage.setItem("auth", JSON.stringify(response.data))
      navigate("/home")
    } catch (error) {
      toast.error(response.data.message)
      console.log(error)
    }
    setEmail("")
    setPassword("")
  }

  return (
    <main className="w-full">
      <section className="w-[1200px] mx-auto h-[70vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[350px] h-[350px] p-4 flex flex-col items-center justify-around border border-black"
        >
          <h1 className="text-[25px] font-bold py-2 w-full text-black text-center">
            Login
          </h1>
          <section className="w-full flex flex-col gap-2">
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <AiOutlineMail />
              </div>
              <div className="relative w-full">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  value={email}
                  name="email"
                  className="w-full outline-none border-none "
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <PiPasswordDuotone />
              </div>
              <div className="relative w-full">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={password}
                  name="password"
                  className="w-full outline-none border-none "
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button className="mt-3 w-full bg-blue-600 px-2 py-1 text-white hover:scale-90 duration-200 transition-all">
              Login
            </button>
            <div className="flex w-full justify-center ">
              <p>Don't have an account?</p>{" "}
              <Link to="/register" className="ml-1 underline text-blue-600">
                Register now
              </Link>
            </div>
          </section>
        </form>
      </section>
    </main>
  )
}

export default Login
