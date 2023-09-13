import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Layout from "./components/Layout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/notfound" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
