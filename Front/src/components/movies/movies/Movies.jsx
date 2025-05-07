import { movies } from "../../../data/Movies"
import MoviesItem from "../moviesItem/MoviesItem"


const Movies = () => {

    const moviesMapped = movies
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
            <div className="flex flex-wrap justify-center gap-10 p-4 bg-black min-h-auto">
              {moviesMapped}
            </div>
          );

}


export default Movies;