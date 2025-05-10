import { BrowserRouter, Routes, Route, Navigate } from "react-router";


import Dashboard from "./components/movies/dashboard/Dashboard"
import Login from "./components/login/Login";
import Contact from "./components/contact/Contact";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home"/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
