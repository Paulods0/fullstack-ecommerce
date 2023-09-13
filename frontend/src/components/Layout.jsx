import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Helmet } from "react-helmet"

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="flex flex-col justify-between">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main className="min-h-[80vh] w-full">
        <section className="w-[1200px] mx-auto">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
