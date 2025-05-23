import { BrowserRouter, Routes, Route, Navigate } from "react-router";


import Dashboard from "./components/movies/dashboard/Dashboard"
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Contact from "./components/contact/Contact";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home"/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
