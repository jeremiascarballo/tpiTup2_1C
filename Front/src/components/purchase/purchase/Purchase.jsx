import { useContext, useState } from "react";
import { useLocation } from "react-router";

import NavBar from "../../movies/navBar/NavBar";
import Footer from "../../movies/footer/Footer";
import { AuthContext } from "../../../services/authContext/AuthContext";
import { errorToast, successToast } from "../../../utils/notifications";

const Purchase = () => {
  const location = useLocation();
  const { movieTitle, totalSeats, availableSeats, dateFunction, functionId, movieId } = location.state || {};
  const [quantity, setQuantity] = useState(1);


  const { userId } = useContext(AuthContext);

  const handleSelectChange = (e) => {
    setQuantity(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.log('TU ID ES', {userId})
      errorToast("Debes iniciar sesión para reservar");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          functionId: functionId,
          amount: quantity,
          purchaseDate: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al reservar entradas");
      }
  
      successToast("Reserva exitosa!");
    } catch (error) {
      errorToast(error.message);
    }
  };


  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-md mx-4 mt-10 p-6 sm:p-8 bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold text-center uppercase tracking-wide">
            Estás por reservar entradas para la película
          </h2>
          <p className="text-center text-4xl font-bold">{movieTitle}</p>

          <div className="space-y-2 mt-4">
            <p className="text-sm">
              <span className="font-medium">Fecha de función:</span> {dateFunction}
            </p>
            <p className="text-sm">
              <span className="font-medium">Entradas disponibles:</span> {availableSeats}
            </p>
          </div>

          <div className="mt-6">

            <form onSubmit={handleClick}>
              <label className="block mb-2 font-medium">Cantidad de entradas a reservar</label>
              <select
                name="select"
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={quantity}
                onChange={handleSelectChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <button
                type="submit"
                className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                RESERVAR
              </button>

            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Purchase;
