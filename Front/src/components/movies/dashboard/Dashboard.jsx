import { useState } from "react"


import Movies from "../movies/Movies"
import NavBar from "../navBar/NavBar"
import Footer from "../footer/Footer"


const Dashboard = () => {

  const [movieSearch, SetMovieSearch] = useState("");

  const handleSearchMovie = (value) => {

    SetMovieSearch(value);

  } 
  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movieSearch={movieSearch}/>
          <Movies movieSearch={movieSearch}/>
      <Footer />
    </>
  )
}

export default Dashboard
