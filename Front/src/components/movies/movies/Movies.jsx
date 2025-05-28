import { useNavigate } from "react-router";
import MoviesItem from "../moviesItem/MoviesItem"


const Movies = ({ movies, movieSearch }) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`movie/${id}`);
    };

    const moviesMapped = movies
        .filter(movie =>
            movie.title?.toUpperCase().includes(movieSearch.toUpperCase()))
        .map((movie) => (
            <div
                key={movie.id}
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
        ));

    return (
            <div className="min-h-screen bg-black">
                <div className="flex flex-wrap justify-center gap-10 p-4 bg-black">
                    {moviesMapped}
                </div>
            </div>
    );

}


export default Movies;