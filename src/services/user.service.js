import * as userRepository from "../repositories/user.repository.js"

export const createUser = async ( userData) => {
    return await userRepository.createUser(userData);
}

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

