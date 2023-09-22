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
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Users from "./pages/Admin/Users"
import Profile from "./pages/user/Profile"
import Orders from "./pages/user/Orders"
import Products from "./pages/Admin/Products"
import UpdateProduct from "./pages/Admin/UpdateProduct"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/users" element={<Users />} />
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
