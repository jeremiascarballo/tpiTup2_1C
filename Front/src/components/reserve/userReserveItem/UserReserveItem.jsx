import { useFormatDate } from "../../../hooks/useFormatDate/useFormatDate";

const UserReserveItem = ({ purchaseDate, amount, movieTitle, functionDay, movieImg }) => {

    const purchaseFormatDate = useFormatDate(purchaseDate);
    const functionFormatDate = useFormatDate(functionDay);

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 border border-gray-200 rounded-2xl shadow p-4 bg-white mb-4 m-8">

            <div className="md:w-32 h-48 flex-shrink-0">
                <img
                    src={movieImg}
                    alt={movieTitle}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            <div className="flex-1 text-left space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{movieTitle}</h2>

                <p className="text-base font-medium text-gray-700">
                    Fecha de función: <span className="text-blue-700">{functionFormatDate}</span>
                </p>

                <p className="text-base font-medium text-gray-700">
                    Entradas: <span className="text-blue-700">{amount}</span>
                </p>

                <p className="text-xs text-gray-400 mt-2">
                    Fecha de reserva: {purchaseFormatDate}
                </p>
            </div>


        </div>
    );
};


export default UserReserveItem