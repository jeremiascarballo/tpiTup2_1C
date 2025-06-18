import { useState, useEffect } from "react";

import Functions from "../functions/Functions";

const FunctionsShow = ({id, movie}) => {

const [functionsCinema, setFunctionsCinema] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/functions`)
            .then(res => res.json())
            .then(data => {
                setFunctionsCinema(data);
            })
            .catch(err => console.log(err))
    }, []);

    return (<>
        <Functions functionsCinema = {functionsCinema} id= {id} movie={movie}/>
    </>)
};


export default FunctionsShow;