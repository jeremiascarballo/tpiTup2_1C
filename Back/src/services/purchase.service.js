import { Purchase } from "../model/pucharse.js";
import { FunctionCinema } from "../model/function.js";

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