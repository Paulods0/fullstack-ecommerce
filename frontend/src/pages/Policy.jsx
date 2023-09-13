import React from "react"
import policyPhoto from "../assets/policy.jpg"
import Layout from "../components/Layout"

const Policy = () => {
  return (
    <main className="w-full">
      <section className="w-[1200px] mx-auto h-[80vh] flex items-center justify-center">
        <div className="w-full">
          <img
            src={policyPhoto}
            alt="policy-photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full px-3 flex flex-col justify-around h-[50vh]">
          <h1 className="bg-zinc-800 text-white p-2 text-[25px]">
            Privacy Policy
          </h1>
          <div>
            <p>policy</p>
            <p>policy</p>
            <p>policy</p>
            <p>policy</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Policy
