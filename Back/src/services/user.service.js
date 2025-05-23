import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { validateEmail, validatePassword, validateString } from "../utils/validations.js";

export const loginUser = async (req, res) => {
    const result = validateLoginUser(req.body);

    if (result.error)
        return res.status(400).send({ message: result.message })

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user)
        return res.status(401).send({ message: "Usuario no existente" });

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).send({ message: "Contraseña incorrecto" });

    // Generate token
    const secretKey = process.env.SECRET_STRING;
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    return res.json(token);
}

export const registerUser = async (req, res) => {

    const result = validateRegisterUser(req.body);

    if (result.error)
        return res.status(400).send({ message: result.message });

    const {
        name,
        email,
        password
    } = req.body;

    const existingUser = await User.findOne({
        where: {
            email,
        }
    });

    if (existingUser)
        return res.status(400).send({ message: "Email ya registrado" })

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json(user.id);

}

// Validations
const validateLoginUser = (req) => {
    const result = {
        error: false,
        message: ''
    }
    const { email, password } = req;

    if (!email || !validateEmail(email))
        return {
            error: true,
            message: 'Mail inválido'
        }

    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}

const validateRegisterUser = (req) => {
    const result = {
        error: false,
        message: ''
    }

    const { name, email, password } = req;

    if (!name || !validateString(name, null, 13))
        return {
            error: true,
            message: 'Nombre de usuario inválido'
        }

    if (!email || !validateEmail(email))
        return {
            error: true,
            message: 'Mail inválido'
        }

    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}