import React from "react"
import contact_photo from "../assets/about.jpg"
import Layout from "../components/Layout"

const About = () => {
  return (
    <main title={"About us - ShopNest"} className="w-full">
      <section className="w-[1200px] h-[80vh] mx-auto flex items-center justify-center">
        {/**LEFT */}
        <div className="w-full h-[60vh]">
          <img
            loading="lazy"
            src={contact_photo}
            alt="about-photo"
            className="w-full h-full object-cover"
          />
        </div>
        {/**RIGHT */}
        <div className="w-full h-[60vh] px-6 flex flex-col">
          <div>
            <h1 className="bg-zinc-800 text-white p-2 text-center mb- text-[25px]">
              About ShopNest
            </h1>
            <p className="mb-2">
              Welcome to ShopNest, your trusted destination for all things . We
              are more than just an online store; we are a community of
              passionate individuals dedicated to bringing you the finest
              products and creating a shopping experience like no other.
            </p>
            <div className="mb-2">
              <h2 className="font-bold">Our Story</h2>
              <p>
                At ShopNest, our story begins with a shared love for products .
                We are a team of enthusiasts who turned our passion into a
                business. Our journey started in Year of Establishment with a
                simple goal: to provide our customers with top-quality Product
                Category products while delivering exceptional customer service.
              </p>
            </div>
            <div className="mb-2">
              <h2 className="font-bold">Our Mission</h2>
              <p>
                Our mission is to make products accessible to all, from seasoned
                enthusiasts to newcomers. We believe that products has the power
                to bring joy and satisfaction to people's lives, and we want to
                share that passion with you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
