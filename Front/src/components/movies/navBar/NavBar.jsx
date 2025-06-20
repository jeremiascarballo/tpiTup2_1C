import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../services/authContext/AuthContext";

const NavBar = ({ onSearchMovie, movieSearch }) => {

    const { token, handleUserLogout } = useContext(AuthContext);

    const location = useLocation();

    const home = location.pathname === '/home' || location.pathname === '/';

    const navigate = useNavigate();

    const HandleSearchChange = (e) => {
        onSearchMovie(e.target.value)
    }

    const HandleRedirectLoginUser = () => {
        navigate("/login")
    }

    const handleRedirectUserReserve = () => {
        navigate('/reserve')
    }
    
    const handleRedirectHome = () => {
        navigate('/home')
    }

    return (
        <>
            <nav className="sticky top-0 z-50">
                <div className="bg-black w-full h-[10vh] grid grid-cols-3 items-center px-4">
                    <div className="flex items-center">
                       <a href=""
                       onClick={handleRedirectHome}
                       className="cursor-pointer"> 
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/UTN_logo.jpg" alt="UTN Logo" className="h-[8vh] w-auto" />
                        </a>
                    </div>
                    <div className="text-center">
                        {home && <input
                            type="text"
                            placeholder="Busqueda"
                            className="px-2 py-1 rounded text-white border border-white hover:bg-gray-800"
                            onChange={HandleSearchChange}
                            value={movieSearch}
                        />}
                    </div>
                    <div className="text-white text-right flex gap-2 justify-end">
                        {token && <button
                            className=" text-white px-4 py-1 rounded hover:bg-gray-600 border border-gray-600"
                            onClick={handleRedirectUserReserve}>
                            MIS ENTRADAS
                        </button>}
                        {token ?
                            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300"
                                onClick={handleUserLogout}>
                                Cerrar Sesion
                            </button>
                            :
                            <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300"
                                onClick={HandleRedirectLoginUser}>
                                Ingresar
                            </button>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;