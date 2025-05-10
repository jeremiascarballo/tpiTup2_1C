
const Login = () =>{



    return (
        <div className="relative w-screen h-screen overflow-hidden">
          <img
            src="src/assets/bgLogin.jpg"
            alt="Fondo"
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div className="flex items-center justify-center h-full relative z-10">
          <div className="mt-5 mx-3 p-6 sm:px-10 bg-black bg-opacity-20 shadow-lg rounded-2xl w-full max-w-md text-white">

              <div className="mb-4">

              </div>
    
              <h5 className="text-xl font-semibold mb-4 text-center">
                ¡Bienvenidos a UTN Cinema!
              </h5>
    
              <form >
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Ingresar email"
                    className="w-full p-2 rounded border"
                  />
                </div>
    
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Ingresar contraseña"
                    className="w-full p-2 rounded border border-gray-300"
                  />
                </div>
    
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
export default Login