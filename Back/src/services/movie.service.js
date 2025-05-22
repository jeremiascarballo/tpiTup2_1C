import { movie } from '../model/movie.js'

export const findMovies = async (req, res) => {
    try {
        const movies = await movie.findAll();
        res.json(movies);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};