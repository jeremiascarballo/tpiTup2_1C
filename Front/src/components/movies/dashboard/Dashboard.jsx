import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router";

import Movies from "../movies/Movies"
import NavBar from "../navBar/NavBar"
import Footer from "../footer/Footer"


const Dashboard = () => {

  const [movies, SetMovies] = useState([]);
  const [movieSearch, SetMovieSearch] = useState("");

  const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/home")
            fetch(`${import.meta.env.VITE_API_URL}/movies`)
                .then(res => res.json())
                .then(data => SetMovies([...data]))
                .catch(err => console.log(err))
    }, [location]);

  const handleSearchMovie = (value) => {

    SetMovieSearch(value);

  } 

  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movieSearch={movieSearch}/>
          <Movies movies={movies} movieSearch={movieSearch}/>
      <Footer />
    </>
  )
}

export default Dashboard
