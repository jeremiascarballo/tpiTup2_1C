import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../services/authContext/AuthContext";

import UserReserveItem from "../userReserveItem/UserReserveItem";

const UserReserve = () => {

    const [reserve, setReserve] = useState([]);

    const { userId } = useContext(AuthContext)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reserve`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                setReserve(data);
            })
            .catch(err => console.error(err))
    
        }, [])
    return (<div className="bg-black min-h-screen">
   <div className="mb-4">
      <h2 className="text-8xl font-bold border-b-2 border-white p-5 text-center text-white">
        MIS ENTRADAS
      </h2>
    </div>
            <div>
        {reserve.length > 0?( reserve.map((reserve) => (
            <UserReserveItem
                key={reserve.id}
                purchaseDate={reserve.purchase_date}
                amount={reserve.amount}
                functionDay={reserve.FunctionCinema.date}
                movieTitle={reserve.FunctionCinema.movie.title}
                movieImg={reserve.FunctionCinema.movie.img}
            />
        )) ): (<p className="text-center text-lg text-white mt-10">
        NO SE ENCONTRARON ENTRADAS
      </p>)}
        </div>
    </div>)
};



export default UserReserve