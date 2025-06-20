import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../services/authContext/AuthContext";
import Functions from "../functions/Functions";
import AddFunction from "../../admin/addFunction/AddFunction";

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

    return (<>
        {userRole=='admin'||userRole=='superadmin'&&  <AddFunction idMovie={id}/>}
        <Functions functionsCinema={functionsCinema} id={id} movie={movie}/>
    </>)
};


export default FunctionsShow;