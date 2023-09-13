import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import { PiPasswordDuotone } from "react-icons/pi"
import { ImLocation2 } from "react-icons/im"
import { BiSolidContact } from "react-icons/bi"

import api from "../../config/axiosConfig"

const Register = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")

  const data = {
    email,
    name,
    phone,
    address,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/auth/register", data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

    setEmail("")
    setName("")
    setPhone("")
    setAddress("")
    setPassword("")
  }

  return (
    <main className="w-full">
      <section className="w-[1200px] mx-auto h-[80vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] p-4 flex flex-col items-center justify-around border border-black"
        >
          <h1 className="text-[25px] font-bold py-2 w-full text-black text-center">
            Register
          </h1>
          <section className="w-full flex flex-col gap-3">
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <AiOutlineUser />
              </div>
              <div className="relative w-full">
                <input
                  id="name"
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  className="w-full outline-none border-none "
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <ImLocation2 />
              </div>
              <div className="relative w-full">
                <input
                  id="address"
                  type="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  name="address"
                  className="w-full outline-none border-none "
                  placeholder="Enter your address"
                />
              </div>
            </div>
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <BiSolidContact />
              </div>
              <div className="relative w-full">
                <input
                  id="phone"
                  type="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  name="phone"
                  className="w-full outline-none border-none "
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2 ">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <AiOutlineMail />
              </div>
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  className="w-full outline-none  border-none "
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <PiPasswordDuotone />
              </div>
              <div className="w-full ">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  name="password"
                  className="w-full outline-none border-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button className="w-full mt-3 bg-blue-600 px-2 py-1 text-white hover:scale-90 duration-200 transition-all">
              Save
            </button>
            <div className="flex w-full justify-center">
              <p>Already have an account?</p>{" "}
              <Link to="/login" className="ml-1 underline text-blue-600">
                Login
              </Link>
            </div>
          </section>
        </form>
      </section>
    </main>
  )
}

export default Register
