import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Layout from "./components/Layout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from "./components/Routes/Private"
import ForgotPassword from "./pages/Auth/ForgotPassword"

// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
