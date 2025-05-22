import MoviesItem from "../moviesItem/MoviesItem"


const Movies = ({ movies, movieSearch }) => {

    const moviesMapped = movies
        .filter(movie =>
            movie.title?.toUpperCase().includes(movieSearch.toUpperCase()))
        .map((movie) =>
            <MoviesItem
                key={movie.id}
                id={movie.id}
                title={movie.title}
                duration={movie.duration}
                img={movie.img}
            />
        );

    return (
            <div className="min-h-screen bg-black">
                <div className="flex flex-wrap justify-center gap-10 p-4 bg-black">
                    {moviesMapped}
                </div>
            </div>
    );

}


export default Movies;