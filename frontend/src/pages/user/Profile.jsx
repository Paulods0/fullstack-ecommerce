import React, { useEffect, useState } from "react"
import UserMenu from "../../components/UserMenu"
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineQuestionCircle,
} from "react-icons/ai"
import { PiPasswordBold } from "react-icons/pi"
import { ImLocation2 } from "react-icons/im"
import { BiSolidContact } from "react-icons/bi"

import api from "../../config/axiosConfig"

import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth.jsx"

const Profile = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [answer, setAnswer] = useState("")

  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    const { email, name, address, answer, phone } = auth?.user
    setName(name)
    setEmail(email)
    setAddress(address)
    setPhone(phone)
    setAnswer(answer)
  }, [auth?.user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put("/auth/profile", {
        email,
        name,
        phone,
        address,
        password,
        answer,
      })
      if (data?.error) {
        console.log(data)
        toast.error(data?.error)
      } else {
        setAuth({ ...auth, user: data?.updatedUser })
        let localS = localStorage.getItem("auth")
        localS = JSON.parse(localS)
        localS.user = data.updatedUser
        localStorage.setItem("auth", JSON.stringify(localS))
        toast.success("Profile successfuly updated")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!!")
    }
  }
  return (
    <section className="flex p-4 mt-4 gap-6 h-full items-center">
      <UserMenu />
      <div className="w-full flex flex-col items-center h-[300px] rounded-md">
        <form
          onSubmit={handleUpdate}
          className="w-[400px] p-4 flex flex-col items-center justify-around shadow-xl rounded-md"
        >
          <h1 className="text-[25px] font-bold py-2 w-full text-black text-center">
            Update User Profile
          </h1>
          <section className="w-full flex flex-col gap-3">
            <div className="flex w-full  gap-2 items-center border border-zinc-800 p-2">
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
                  placeholder="Edit your name"
                />
              </div>
            </div>

            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <AiOutlineQuestionCircle />
              </div>
              <div className="relative w-full">
                <input
                  id="answer"
                  type="answer"
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
                  name="answer"
                  className="w-full outline-none border-none "
                  placeholder="Edit your answer for what is your favorite sport?"
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
                  placeholder="Edit your phone number"
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
                  className="w-full bg-gray-300 outline-none  border-none "
                  placeholder="Enter your email"
                  disabled
                />
              </div>
            </div>
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <PiPasswordBold />
              </div>
              <div className="w-full ">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  name="password"
                  className="w-full outline-none border-none"
                  placeholder="Edit your password"
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
                  placeholder="Edit  your address"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-blue-600 px-2 py-1 text-white hover:scale-90 duration-200 transition-all"
            >
              Update
            </button>
          </section>
        </form>
      </div>
    </section>
  )
}

export default Profile
