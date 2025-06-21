import { Purchase } from "../model/purchase.js";
import { FunctionCinema } from "../model/function.js";
import { Movie } from "../model/movie.js";
import { where } from "sequelize";

export const createPurchase = async (req, res) => {

    try {
        const { userId, functionId, amount, purchaseDate } = req.body;

        const functionCinema = await FunctionCinema.findByPk(functionId);

        console.log({ userId, functionId, amount, purchaseDate });

        const newPurchase = await Purchase.create({
            user_id: userId,
            function_id: functionId,
            amount: amount,
            purchase_date: purchaseDate,
        });


        functionCinema.available_seats -= amount;
        await functionCinema.save();

        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(500).json({ message: "Error interno al crear la compra" });
    }
}


export const userReserve = async (req, res) => {

    console.log(Purchase.associations);

    const authHeader = req.headers.authorization;

    const userId = authHeader.split(" ")[1];

    try {
        const userReserve = await Purchase.findAll({
            where: {
                user_id: userId,                
            },
            order: [["purchase_date", "DESC"]],
            include: [{
                model: FunctionCinema,
                attributes: ['date'],
                include: [{
                    model: Movie,
                    attributes: ['title','img'],
                }]
            }]
        });
        console.log(userReserve);
        res.status(200).json(userReserve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener reservas del usuario" });
    }
};