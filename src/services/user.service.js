import bcrypt from "bcrypt"
import { ApiError } from "../utils/Apierror.js"
import * as userRepository from "../repositories/user.repository.js"
import { create } from "node:domain";

const SALT_ROUNDS = 10;

export const createUser = async ( userData) => {
    const existingUser = await userRepository.findUserByEmail(
        userData.email
    )

    if(existingUser) {
        throw new ApiError(409, "Email already exists.")
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    ) 

    const newUser = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
    });

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
    };
};

export const getUsers = async () => {
    return await userRepository.getUsers();
}

export const getUserById = async (id) => {
    return await userRepository.getUserById(id);
}

export const updateUser = async (id, userData) => {
    return await userRepository.updateUser(id, userData);
}

export const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

