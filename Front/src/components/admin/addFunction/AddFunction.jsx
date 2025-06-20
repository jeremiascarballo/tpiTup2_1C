import { useState } from "react"
import { errorToast, successToast } from "../../../utils/notifications";

const AddFunction = ({ idMovie }) => {
    
    const [date, setDate] = useState('');
    const [totalSeats, setTotalSeats] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const handleChangeDate = (e) => {
        const inputDate= new Date(e.target.value)
        const dateNow= new Date();

        if (inputDate > dateNow){
        setDate(e.target.value)}
        else {
            errorToast('La fecha no puede ser pasada')
        }
    };

    const handleChangeTotalSeats = (e) => {
        const inputNumber = parseInt(e.target.value)
        if (inputNumber >= 1){
            setTotalSeats(e.target.value)
        }
        else{
            errorToast('los valores no puede ser menores a 1')
            setTotalSeats('')
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    } 


    const onSubmit = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/addfunction`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ date, totalSeats, idMovie })
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
                setDate('')
                setTotalSeats('')
              })
              .catch((err) => {
                errorToast(err.message);
              });
    }


    return (<div className="bg-black text-white">
        <div> {isOpen && <form onSubmit={onSubmit} className="p-4 border rounded max-w-md mx-auto mb-5">
            <p className="mb-4 font-semibold text-center">Rellene los datos para ingresar la pelicula</p>
            <input
                type="datetime-local"
                placeholder="Fecha '2025-06-20'"
                onChange={handleChangeDate}
                value={date}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="number"
                placeholder="Asientos Totales"
                onChange={handleChangeTotalSeats}
                value={totalSeats}
                className="block w-full mb-3 px-3 py-2 border rounded border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="block mx-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                ENVIAR LA FUNCION
            </button>
        </form>
        }
        </div>
        <div className="text-center">
            <button
                onClick={handleClick}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                {isOpen ? "Cerrar Formulario" : "Agregar funcion"} </button>
        </div>
    </div>)
}

export default AddFunction;