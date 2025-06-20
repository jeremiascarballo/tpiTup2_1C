import { useState, useEffect, useContext } from "react"
import { useLocation, useParams } from "react-router";

import { AuthContext } from "../../../services/authContext/AuthContext";

import Movies from "../movies/Movies"
import NavBar from "../navBar/NavBar"
import Footer from "../footer/Footer"
import AddMovie from "../../admin/addMovie/AddMovie";

const Dashboard = () => {

  const [movies, SetMovies] = useState([]);
  const [movieSearch, SetMovieSearch] = useState("");

  const {userRole} = useContext(AuthContext);

  const { id } = useParams();

  const location = useLocation();

  const fetchMovies = () => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => res.json())
      .then(data => SetMovies([...data]))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (location.pathname === "/home")
      fetchMovies();
  }, [location]);

  const handleSearchMovie = (value) => {

    SetMovieSearch(value);

  }

  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movieSearch={movieSearch} />
      {userRole=='admin' && <AddMovie fetchMovies={fetchMovies}/>}
      {userRole=='superadmin' && <AddMovie fetchMovies={fetchMovies}/>}
      <Movies movies={movies} movieSearch={movieSearch} />
      <Footer />
    </>
  )
}

export default Dashboard
