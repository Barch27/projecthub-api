import bcrypt from "bcrypt"

import { ApiError } from "../utils/ApiError.js"
import { generateAccessToken } from "../utils/jwt.js"
import * as userRepository from "../repositories/user.repository.js"


export const loginUser = async ({ email, password}) => {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalide email and password");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        throw new ApiError(401, "Invalid email or password")
    }

    const accessToken = generateAccessToken(user);

    return{
        accessToken,
    
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }
}