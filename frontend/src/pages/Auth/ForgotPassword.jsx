import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineMail, AiOutlineQuestionCircle } from "react-icons/ai"
import { PiPasswordBold } from "react-icons/pi"
import toast from "react-hot-toast"
import api from "../../config/axiosConfig"
import { useLocation } from "react-router-dom"
// import "../../styles/AuthStyles.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")

  const location = useLocation()
  const navigate = useNavigate()

  const data = {
    email,
    newPassword,
    answer,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/forgot-password", data)
      if (response.data.succsess) {
        toast.success(response.data.message)
        setEmail("")
        setNewPassword("")
        navigate("/login")
      }
    } catch (error) {
      toast.error("Please fill in all the required fields")
    }
  }

  return (
    <main className="w-full">
      <section className="w-[1200px] mx-auto h-[70vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[350px] h-[350px] p-4 flex flex-col items-center justify-around border border-black"
        >
          <h1 className="text-[25px] font-bold py-2 w-full text-black text-center">
            Reset Passoword
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
                <AiOutlineQuestionCircle />
              </div>
              <div className="relative w-full">
                <input
                  onChange={(e) => setAnswer(e.target.value)}
                  id="answer"
                  type="answer"
                  value={answer}
                  name="answer"
                  className="w-full outline-none border-none "
                  placeholder="Enter your favorite sport"
                />
              </div>
            </div>
            <div className="flex w-full gap-2 items-center border border-zinc-800 p-2">
              <div className="border-r border-r-gray-700 px-2 w-[40px] ">
                <PiPasswordBold />
              </div>
              <div className="relative w-full">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="password"
                  type="password"
                  value={newPassword}
                  name="password"
                  className="w-full outline-none border-none "
                  placeholder="Enter your new password"
                />
              </div>
            </div>
            <button className="mt-3 w-full bg-blue-600 px-2 py-1 text-white hover:scale-90 duration-200 transition-all">
              Reset password
            </button>
          </section>
        </form>
      </section>
    </main>
  )
}

export default ForgotPassword
