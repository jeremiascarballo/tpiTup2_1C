import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../../services/authContext/AuthContext";
import Functions from "../functions/Functions";
import AddFunction from "../../admin/addFunction/AddFunction";
import { successToast } from "../../../utils/notifications";



const FunctionsShow = ({ id, movie }) => {

    const [functionsCinema, setFunctionsCinema] = useState([]);

    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/functions`)
            .then(res => res.json())
            .then(data => {
                setFunctionsCinema(data);
            })
            .catch(err => console.log(err))
    }, []);


    const handleDeleteMovie = (id) => {
        fetch(`${import.meta.env.VITE_API_URL}/function/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then(res => {
            if (!res.ok) throw new Error("Error al eliminar");
            return res.json();
          })
          .then(() => {
            successToast(`Se eliminó la funcion con ID ${id}`);
            setFunctionsCinema(prevFunctionsCinema =>
              prevFunctionsCinema.filter(funct => funct.id !== id)
            );
          })
          .catch(err => {
            console.error("Error al eliminar la funcion:", err);
          });
      };

    return (<>
        {(userRole=='admin'||userRole=='superadmin') && (<AddFunction idMovie={id}/>)}
        <Functions functionsCinema={functionsCinema} id={id} movie={movie} onDeleteFunction={handleDeleteMovie}/>
    </>)
};


export default FunctionsShow;