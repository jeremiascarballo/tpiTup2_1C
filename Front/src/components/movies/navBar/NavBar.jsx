
const NavBar = ({onSearchMovie, movieSearch}) => {

    const HandleSearchChange = (e) => {
        onSearchMovie(e.target.value)
    }

   /* const HandleRedirectUser= () => {

    }*/

    return (
        <>
        <nav className="sticky top-0 z-50">
            <div className="bg-black w-full h-[10vh] grid grid-cols-3 items-center px-4">
                <div className="flex items-center">
                    <img src="src/assets/UTN_logo.jpg" alt="UTN Logo" className="h-[8vh] w-auto" />
                </div>
                <div className="text-center">
                    <input
                        type="text"
                        placeholder="Busqueda"
                        className="px-2 py-1 rounded text-white border border-white hover:bg-gray-800"
                        onChange={HandleSearchChange}
                        value={movieSearch}
                    />
                </div>
                <div className="text-white text-right">
                    <input
                        type="button"
                        value="Ingresar"
                        className="bg-white text-black px-4 py-1 rounded hover:bg-gray-300"
                        //onClick={HandleRedirectLoginUser}
                    />
                </div>
            </div>
        </nav>
        </>
    );
};

export default NavBar;