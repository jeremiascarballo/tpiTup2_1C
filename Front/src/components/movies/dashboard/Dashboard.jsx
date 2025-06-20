import { useState, useEffect, useContext } from "react"
import { useLocation, useParams } from "react-router";

import { AuthContext } from "../../../services/authContext/AuthContext";

import Movies from "../movies/Movies"
import NavBar from "../navBar/NavBar"
import Footer from "../footer/Footer"
import AddMovie from "../../admin/addMovie/AddMovie";
import { successToast,errorToast } from "../../../utils/notifications";

const Dashboard = () => {

  const [movies, setMovies] = useState([]);
  const [movieSearch, SetMovieSearch] = useState("");

  const {userRole} = useContext(AuthContext);

  const { id } = useParams();

  const location = useLocation();

  const fetchMovies = () => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies([...data]))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (location.pathname === "/home")
      fetchMovies();
  }, [location]);

  const handleSearchMovie = (value) => {

    SetMovieSearch(value);

  }

  const handleDeleteMovie = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al eliminar");
        return res.json();
      })
      .then(() => {
        successToast(`Se eliminó la película con ID ${id}`);
        setMovies(prevMovies =>
          prevMovies.filter(movie => movie.id !== id)
        );
      })
      .catch(err => {
        console.error("Error al eliminar película:", err);
      });
  };


  return (
    <>
      <NavBar onSearchMovie={handleSearchMovie} movieSearch={movieSearch} />
      {(userRole==='admin'|| userRole==='superadmin') && (<AddMovie fetchMovies={fetchMovies}/>)}
      <Movies movies={movies} movieSearch={movieSearch} onDeleteMovie={handleDeleteMovie} />
      <Footer />
    </>
  )
}

export default Dashboard
