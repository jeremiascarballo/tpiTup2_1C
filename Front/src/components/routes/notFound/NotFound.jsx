import { useNavigate } from "react-router";

const NotFound = () => {

    const navigate = useNavigate();

    const hadleRedirectHome = () => {
        navigate("/home");
    }

    return (
        <div className="bg-black flex flex-col items-center justify-center h-screen text-center px-4">
          <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Página no encontrada</h1>
          <p className="text-white mb-6">Lo sentimos, esta página no existe.</p>
          <button
            onClick={hadleRedirectHome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition-colors duration-300"
          >
            Volver al inicio
          </button>
        </div>
      );      
}

export default NotFound;