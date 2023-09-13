import React from "react"
import contact_photo from "../assets/contact.jpg"
import { CiMail } from "react-icons/ci"
import { PiPhoneCallThin } from "react-icons/pi"
import { BiSupport } from "react-icons/bi"

const Contact = () => {
  return (
    <main  className="w-full">
      <section className="w-[1200px] flex items-center justify-center mx-auto h-[70vh]">
        {/**Left */}
        <div className="w-full h-[400px]">
          <img
            loading="lazy"
            src={contact_photo}
            alt="contact-photo"
            className="w-full h-full object-cover"
          />
        </div>
        {/**Right */}
        <div className="w-full px-6 flex flex-col gap-4">
          <h1 className="bg-zinc-800 text-white p-2 text-center text-[25px]">
            Contact us
          </h1>
          <div className="flex flex-col gap-2 items-start">
            <p className="flex items-center gap-1">
              Any query and info about product, feel free to call anytime we're
              24/7 available
            </p>
            <p className="flex items-center gap-1">
              <span>
                <CiMail className="text-[18px] " />
              </span>
              www.help@ecommerceapp.columns-md
            </p>
            <p className="flex items-center gap-1">
              <span>
                <PiPhoneCallThin className="text-[18px] " />
              </span>
              012-234560
            </p>
            <p className="flex items-center gap-1">
              <span>
                <BiSupport className="text-[18px] " />
              </span>
              1900-0000-0000(toll free)
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
