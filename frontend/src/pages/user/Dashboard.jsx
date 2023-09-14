import React from "react"
import UserMenu from "../../components/UserMenu"
import { useAuth } from "../../context/auth"
const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <div>
      <section className="flex mt-8 gap-6 items-center">
        <UserMenu />
        <div className="w-full border border-zinc-500  h-[200px] rounded-md">
          <ul className="w-full h-full flex flex-col items-center justify-center">
            <li className="text-3xl text-center">
              User Name: {auth?.user?.name}
            </li>
            <li className="text-3xl text-center">
              User Email: {auth?.user?.email}
            </li>
            <li className="text-3xl text-center">
              User Contact: {auth?.user?.phone}
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
