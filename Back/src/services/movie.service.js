import { movie as Movie } from '../model/movie.js'

export const findMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const findOneMovie = async (req, res) => {
    try {
        const moviefound = await Movie.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(moviefound);
    } catch (error) {
        console.error('Error al obtener la película:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};