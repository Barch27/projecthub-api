import * as userService from "../services/user.service.js"
import { asyncHandler } from "../middleware/asyncHandler.js";   

export const createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  res.status(200).json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(204).send("deleted");
});
