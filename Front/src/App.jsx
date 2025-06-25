import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { ToastContainer } from "react-toastify"

import Dashboard from "./components/movies/dashboard/Dashboard"
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Contact from "./components/contact/Contact";
import Movie from "./components/moviePage/Movie/Movie";
import Purchase from "./components/purchase/purchase/Purchase";
import UsersData from "./components/admin/users/userData/UsersData";
import ShowReserve from "./components/reserve/showReserve/ShowReserve";

function App() {

  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          {/* movies */}
          <Route path="/" element={<Navigate to="home"/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/home/movie/:id" element={<Movie/>}/>
          <Route path="/purchase" element={<Purchase/>}/>
          {/*auth*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          {/* data */}
          <Route path="/users" element={<UsersData/>}/>
          <Route path="/reserve" element={<ShowReserve/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
