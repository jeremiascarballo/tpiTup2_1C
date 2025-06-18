import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { ToastContainer } from "react-toastify"

import Dashboard from "./components/movies/dashboard/Dashboard"
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Contact from "./components/contact/Contact";
import Movie from "./components/moviePage/Movie/Movie";
import Purchase from "./components/purchase/purchase/Purchase";
import UsersData from "./components/admin/users/userData/UsersData";

function App() {

  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home"/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/home/movie/:id" element={<Movie/>}/>
          <Route path="/purchase" element={<Purchase/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/users" element={<UsersData/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
