import { useState } from "react"

import {errorToast, successToast} from '../../../utils/notifications'

const AddMovie = ({ fetchMovies }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [origin, setOrigin] = useState('');
    const [director, setDirector] = useState('');
    const [qualification, setQualification] = useState('');
    const [duration, setDuration] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeOrigin = (e) => {
        setOrigin(e.target.value)
    }
    const handleChangeDirector = (e) => {
        setDirector(e.target.value)
    }
    const handleChangeQualification = (e) => {
        setQualification(e.target.value)
    }
    const handleChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    const handleChangeImg = (e) => {
        setImg(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/movies`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ title, origin, director, qualification, duration, img, description })
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Algo ha salido mal");
                }

                return res.json();
            })
            .then(() => {
                successToast("Película agregada correctamente");
                setTitle('');
                setOrigin('');
                setDirector('');
                setQualification('');
                setDuration('');
                setImg('');
                setDescription('');
                fetchMovies();
              })
              .catch((err) => {
                errorToast(err.message);
              });
    }


    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (<div className="bg-black text-white">
        <div> {isOpen && <form onSubmit={onSubmit} className="p-4 border rounded max-w-md mx-auto mb-5">
            <p className="mb-4 font-semibold text-center">Rellene los datos para ingresar la pelicula</p>
            <input
                type="text"
                placeholder="TITULO"
                onChange={handleChangeTitle}
                value={title}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="ORIGEN"
                onChange={handleChangeOrigin}
                value={origin}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="DIRECTOR"
                onChange={handleChangeDirector}
                value={director}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="CALIFICACION"
                onChange={handleChangeQualification}
                value={qualification}
                className="block w-full mb-3 px-3 py-2 border rounded border-gra focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="DURACION"
                onChange={handleChangeDuration}
                value={duration}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="IMAGEN URL"
                onChange={handleChangeImg}
                value={img}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="text"
                placeholder="DESCRIPCION"
                onChange={handleChangeDescription}
                value={description}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                ENVIAR LA PELÍCULA
            </button>
        </form>
        }
        </div>
        <div className="text-center">
            <button
                onClick={handleClick}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition my-5">
                {isOpen ? "Cerrar Formulario" : "Agregar pelicula"} </button>
        </div>
    </div>)
}

export default AddMovie;