import { useEffect, useState } from "react";
import { useParams } from "react-router";

import FunctionsShow from "../../functions/functionsShow/FunctionsShow";


const FindMovie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState([]);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="min-h-screen text-white bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-15 pt-5">
        <div className="lg:col-span-8 p-4">
            <div>
              <h1 className="text-[7rem]">{movie.title}</h1>
                <div className="flex text-[1.5rem]">
                  <h3 className="">{movie.duration}min</h3>
                  <h4 className="ml-4">{movie.qualification}</h4>
                  <h4 className="ml-4" >{movie.origin}</h4>
                </div>
            </div>
          <div className="">
            <h1 className="text-[3rem]">FUNCIONES</h1>
              <FunctionsShow movie={movie} id={id} />
          </div>
          <div  className="text-[1.5rem]">
            <p> {movie.description} </p>
          </div>
        </div>


        <div className="lg:col-span-4 p-4">
          <div className="justify-items-center">
            <img src={movie.img} alt="" className="w-full max-w-[400px] mx-auto"/>
          </div>
          <div className="justify-items-center text-[1.25rem]">
            <h4 className="mt-3"><b>TITULO:</b>   {movie.title}</h4>
            <h4 className="mt-3"><b>CALIFICACION:</b>   {movie.qualification}</h4>
            <h4 className="mt-3"><b>ORIGEN:</b>   {movie.origin}</h4>
            <h4 className="mt-3"><b>DIRECTOR:</b>   {movie.director}</h4>
            <h4 className="mt-3"><b>DURACION:</b>   {movie.duration}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindMovie;