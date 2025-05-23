export const validateString = (str, minLength, maxLength) => {
    if (!str)
        return false;
    if (minLength && str.length < minLength)
        return false;
    else if (maxLength && str.length > maxLength)
        return false;

    return true;
}

export const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
}

export const validatePassword = (password, minLength, maxLength, needsUpperCase, needsNumber) => {
    if (!password)
        return false;
    if (minLength && password.length < minLength)
        return false;
    else if (maxLength && password.length > maxLength)
        return false;
    else if (needsUpperCase && !/[A-Z]/.test(password))
        return false;
    else if (needsNumber && !/\d/.test(password))
        return false;

    return true;
}