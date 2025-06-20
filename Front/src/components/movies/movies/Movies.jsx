import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../../services/authContext/AuthContext";
import MoviesItem from "../moviesItem/MoviesItem"
import ModalDelete from "../../ui/modalDelete/ModalDelete";

const Movies = ({ movies, movieSearch, onDeleteMovie}) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

    const { userRole } = useContext(AuthContext);

    const handleOpenModal = (id, title) => {
        setSelectedMovieId(id);
        setSelectedMovieTitle(title);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovieId(null);
        setSelectedMovieTitle("");
    };

    const handleConfirmDelete = (id) => {
        onDeleteMovie(id);
        handleCloseModal();
    };

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`movie/${id}`);
    };

    const moviesMapped = movies
        .filter(movie =>
            movie.title?.toUpperCase().includes(movieSearch.toUpperCase()))
        .map((movie) => (<div key={movie.id} className="relative">
            <div
                onClick={() => handleClick(movie.id)}
                className="cursor-pointer"
            >
                <MoviesItem
                    id={movie.id}
                    title={movie.title}
                    duration={movie.duration}
                    img={movie.img}
                />
            </div>
            {(userRole === 'admin' || userRole === 'superadmin') && (<button
                onClick={() => handleOpenModal(movie.id, movie.title)}
                className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 z-10"
            >
                Eliminar
            </button>)}
        </div>
        ));

    return (<>
        {(userRole === 'admin' || userRole === 'superadmin') && (
            <ModalDelete
                show={showModal}
                id={selectedMovieId}
                movieTitle={selectedMovieTitle}
                onCancel={handleCloseModal}
                onDelete={handleConfirmDelete}
            />
        )}
        <div className="min-h-screen bg-black">
            <div className="flex flex-wrap justify-center gap-10 p-4 bg-black">
                {moviesMapped}
            </div>
        </div>
    </>
    );

}


export default Movies;