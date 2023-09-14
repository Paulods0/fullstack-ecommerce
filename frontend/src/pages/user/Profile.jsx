import React from "react"
import UserMenu from "../../components/UserMenu"

const Profile = () => {
  return (
    <section className="flex mt-8 gap-6 items-center">
      <UserMenu />
      <div className="w-full border border-zinc-500  h-[200px] rounded-md">
        <h1>Profile</h1>
      </div>
    </section>
  )
}

export default Profile
